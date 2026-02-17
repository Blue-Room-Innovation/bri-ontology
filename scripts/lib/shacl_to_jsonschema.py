#!/usr/bin/env python3
"""
SHACL to JSON Schema Converter
==============================

Custom SHACL -> JSON Schema converter with full control over constraints.
The SHACL shapes are the source of truth.

Usage:
    python shacl-to-jsonschema.py --input shapes/v0.1/digital-waste-passport.shacl.ttl --output build/v0.1/digitalWastePassport.schema.json

Author: Blue Room Innovation
Date: 2026-02-11
"""

from __future__ import annotations

import argparse
import json
import logging
import math
import sys
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Union

from rdflib import BNode, Graph, RDF, SH, URIRef
from rdflib.collection import Collection

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)

JsonSchema = Dict[str, object]


def main() -> None:
    parser = argparse.ArgumentParser(description="SHACL to JSON Schema (custom converter)")
    parser.add_argument("-i", "--input", required=True, help="Input SHACL file")
    parser.add_argument("-o", "--output", required=True, help="Output JSON Schema file")
    parser.add_argument("--naming", default="local", help="Ignored (reserved for compatibility)")
    parser.add_argument("--context", help="Ignored (reserved for compatibility)")
    parser.add_argument(
        "--full-iris",
        action="store_true",
        help="Use full IRIs for property names (default: local names)",
    )
    parser.add_argument("-v", "--verbose", action="store_true")

    args = parser.parse_args()
    if args.verbose:
        logger.setLevel(logging.DEBUG)

    input_path = Path(args.input)
    output_path = Path(args.output)

    if not input_path.exists():
        logger.error(f"Input file not found: {input_path}")
        sys.exit(1)

    output_path.parent.mkdir(parents=True, exist_ok=True)

    try:
        converter = ShaclToJsonSchema(input_path, use_local_names=not args.full_iris)
        schema = converter.build_schema()
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(schema, f, indent=2)
        logger.info(f"✅ Schema written to {output_path}")
        converter.report_diffs(schema)
    except Exception as exc:
        logger.error(f"Failed: {exc}")
        sys.exit(1)


class ShaclToJsonSchema:
    def __init__(self, shacl_path: Path, use_local_names: bool = True) -> None:
        self.graph = Graph()
        self.graph.parse(shacl_path, format="turtle")
        self.shapes = list(self.graph.subjects(RDF.type, SH.NodeShape))
        self.def_name_map: Dict[Union[URIRef, BNode], str] = {}
        self.def_to_shape: Dict[str, Union[URIRef, BNode]] = {}
        self.use_local_names = use_local_names

    def build_schema(self) -> JsonSchema:
        defs: Dict[str, JsonSchema] = {}
        shape_refs: List[JsonSchema] = []

        for shape in self.shapes:
            def_name = self._def_name(shape)
            defs[def_name] = self._build_shape_schema(shape)

        root_shapes = self._root_shapes()
        for shape in root_shapes:
            shape_refs.append({"$ref": f"#/$defs/{self._def_name(shape)}"})

        schema: JsonSchema = {
            "$schema": "https://json-schema.org/draft/2020-12/schema",
            "type": "object",
            "$defs": defs,
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "@graph": {
                            "type": "array",
                            "items": {"anyOf": shape_refs},
                        }
                    },
                    "required": ["@graph"],
                },
                {
                    "allOf": [
                        {"not": {"required": ["@graph"]}},
                        {"anyOf": shape_refs},
                    ]
                },
            ],
        }

        return schema

    def _root_shapes(self) -> List[Union[URIRef, BNode]]:
        roots: List[Union[URIRef, BNode]] = []
        for shape in self.shapes:
            if (
                self.graph.value(shape, SH.targetClass) is not None
                or self.graph.value(shape, SH.targetNode) is not None
                or self.graph.value(shape, SH.targetSubjectsOf) is not None
                or self.graph.value(shape, SH.targetObjectsOf) is not None
            ):
                roots.append(shape)

        return roots if roots else self.shapes

    def report_diffs(self, schema: JsonSchema) -> None:
        defs = schema.get("$defs", {})
        for shape in self.shapes:
            def_name = self._def_name(shape)
            def_schema = defs.get(def_name)
            if not def_schema:
                logger.warning(f"Missing definition for shape: {shape}")
                continue

            properties = self._shape_properties(shape)
            expected_props = [p for p in properties if p[0] is not None and p[2] != 0]
            required_props = [p[0] for p in expected_props if p[1] is not None and p[1] >= 1]

            obj_schema = self._shape_object_section(def_schema)
            schema_props = set((obj_schema.get("properties") or {}).keys())
            missing = [p[0] for p in expected_props if p[0] not in schema_props]
            if missing:
                logger.warning(f"Shape {shape} missing properties: {missing}")

            schema_required = set(obj_schema.get("required") or [])
            for req in required_props:
                if req not in schema_required:
                    logger.warning(f"Shape {shape} missing required property: {req}")

    def _shape_properties(self, shape: Union[URIRef, BNode]) -> List[Tuple[Optional[str], Optional[int], Optional[int]]]:
        props: List[Tuple[Optional[str], Optional[int], Optional[int]]] = []
        for prop in self.graph.objects(shape, SH.property):
            path = self.graph.value(prop, SH.path)
            min_count = self._int_value(self.graph.value(prop, SH.minCount))
            max_count = self._int_value(self.graph.value(prop, SH.maxCount))
            if path is None:
                continue
            if isinstance(path, URIRef):
                props.append((self._prop_name(prop, path), min_count, max_count))
        return props

    def _shape_object_section(self, def_schema: JsonSchema) -> JsonSchema:
        for entry in def_schema.get("allOf", []):
            if isinstance(entry, dict) and entry.get("type") == "object":
                return entry
        return {}

    def _def_name(self, node: Union[URIRef, BNode]) -> str:
        if node in self.def_name_map:
            return self.def_name_map[node]

        if isinstance(node, BNode):
            base = f"bnode_{str(node)}"
        else:
            base = self._qname(node)

        safe = "".join(ch if ch.isalnum() or ch == "_" else "_" for ch in base)
        name = safe
        counter = 1
        while name in self.def_to_shape and self.def_to_shape[name] != node:
            counter += 1
            name = f"{safe}_{counter}"

        self.def_name_map[node] = name
        self.def_to_shape[name] = node
        return name

    def _qname(self, uri: URIRef) -> str:
        try:
            prefix, _, name = self.graph.namespace_manager.compute_qname(uri)
            return f"{prefix}_{name}"
        except Exception:
            return str(uri)

    def _build_shape_schema(self, shape: Union[URIRef, BNode]) -> JsonSchema:
        properties: Dict[str, JsonSchema] = {}
        required: List[str] = []
        constraints: List[JsonSchema] = []

        for prop in self.graph.objects(shape, SH.property):
            path = self.graph.value(prop, SH.path)
            if path is None:
                node_constraint = self._build_node_constraint(prop)
                if node_constraint:
                    constraints.append(node_constraint)
                continue
            if not isinstance(path, URIRef):
                continue
            prop_name = self._prop_name(prop, path)
            prop_schema, prop_required, prop_forbidden = self._build_property_schema(prop)
            if prop_schema is not None:
                properties[prop_name] = prop_schema
            if prop_required:
                required.append(prop_name)

        for node_ref in self.graph.objects(shape, SH.node):
            node_constraint = self._build_node_constraint(node_ref)
            if node_constraint:
                constraints.append(node_constraint)

        target_classes = list(self.graph.objects(shape, SH.targetClass))
        if target_classes:
            constraints.append(self._build_type_constraint(target_classes))

        or_list = self.graph.value(shape, SH["or"])
        if or_list:
            or_constraints = self._build_list_constraints(or_list)
            if or_constraints:
                constraints.append({"anyOf": or_constraints})

        and_list = self.graph.value(shape, SH["and"])
        if and_list:
            and_constraints = self._build_list_constraints(and_list)
            if and_constraints:
                constraints.append({"allOf": and_constraints})

        xone_list = self.graph.value(shape, SH.xone)
        if xone_list:
            xone_constraints = self._build_list_constraints(xone_list)
            if xone_constraints:
                constraints.append({"oneOf": xone_constraints})

        closed = self._bool_value(self.graph.value(shape, SH.closed))
        ignored = []
        for ignored_list in self.graph.objects(shape, SH.ignoredProperties):
            try:
                ignored.extend([str(p) for p in Collection(self.graph, ignored_list)])
            except Exception:
                ignored.append(str(ignored_list))

        for ignored_prop in ignored:
            if str(ignored_prop) == str(RDF.type):
                continue
            key = ignored_prop
            if self.use_local_names:
                try:
                    key = self._prop_key(URIRef(ignored_prop))
                except Exception:
                    key = ignored_prop
            if key not in properties:
                properties[key] = {}

        if closed:
            for prop_name in self._collect_constraint_paths(shape):
                if prop_name not in properties:
                    properties[prop_name] = {}

        # Always allow JSON-LD core properties
        properties.setdefault("@id", {"type": "string"})
        properties.setdefault("@type", {"type": ["string", "array"]})

        obj_schema: JsonSchema = {
            "type": "object",
            "properties": properties,
        }
        if required:
            obj_schema["required"] = sorted(set(required))
        if closed:
            obj_schema["unevaluatedProperties"] = False

        shape_schema: JsonSchema = {"allOf": [obj_schema]}
        if constraints:
            shape_schema["allOf"].extend(constraints)
        return shape_schema

    def _build_property_schema(self, prop: Union[URIRef, BNode]) -> Tuple[Optional[JsonSchema], bool, bool]:
        max_count = self._int_value(self.graph.value(prop, SH.maxCount))
        min_count = self._int_value(self.graph.value(prop, SH.minCount))

        if max_count == 0:
            return None, False, True

        value_schema = self._build_value_schema(prop)
        wrapped = self._wrap_value_schema(value_schema, min_count, max_count)
        is_required = min_count is not None and min_count >= 1
        return wrapped, is_required, False

    def _build_value_schema(self, prop: Union[URIRef, BNode]) -> JsonSchema:
        or_list = self.graph.value(prop, SH["or"])
        if or_list:
            base_schema: JsonSchema = {"anyOf": self._build_list_value_constraints(or_list)}
        else:
            and_list = self.graph.value(prop, SH["and"])
            if and_list:
                base_schema = {"allOf": self._build_list_value_constraints(and_list)}
            else:
                xone_list = self.graph.value(prop, SH.xone)
                if xone_list:
                    base_schema = {"oneOf": self._build_list_value_constraints(xone_list)}
                else:
                    base_schema = self._build_value_schema_from_node(prop)

        not_node = self.graph.value(prop, SH["not"])
        if not_node is not None:
            not_schema = self._build_value_schema_from_node(not_node)
            if not_schema:
                if base_schema:
                    return {"allOf": [base_schema, {"not": not_schema}]}
                return {"not": not_schema}

        return base_schema

    def _build_value_schema_from_node(self, node: Union[URIRef, BNode]) -> JsonSchema:
        if self._is_node_shape(node) and self._has_structural_constraints(node):
            # Use the node shape itself as the value schema when it defines structure
            return self._ref_schema(node)

        schemas: List[JsonSchema] = []

        datatype = self.graph.value(node, SH.datatype)
        if datatype:
            schemas.append(self._datatype_schema(datatype))

        node_kind = self.graph.value(node, SH.nodeKind)
        if node_kind:
            schemas.append(self._node_kind_schema(node_kind))

        pattern = self.graph.value(node, SH.pattern)
        if pattern:
            schemas.append({"type": "string", "pattern": str(pattern)})

        min_length = self._int_value(self.graph.value(node, SH.minLength))
        max_length = self._int_value(self.graph.value(node, SH.maxLength))
        if min_length is not None or max_length is not None:
            schema: JsonSchema = {"type": "string"}
            if min_length is not None:
                schema["minLength"] = min_length
            if max_length is not None:
                schema["maxLength"] = max_length
            schemas.append(schema)

        in_list = self.graph.value(node, SH["in"])
        if in_list:
            values = [v.toPython() for v in Collection(self.graph, in_list)]
            schemas.append({"enum": values})

        has_value = self.graph.value(node, SH.hasValue)
        if has_value is not None:
            schemas.append({"const": self._normalize_has_value(has_value.toPython())})

        class_ref = self.graph.value(node, SH["class"])
        if class_ref:
            class_shape = self._shape_for_class(class_ref)
            if class_shape is not None:
                schemas.append(self._ref_schema(class_shape))
            else:
                schemas.append(self._class_value_schema(class_ref))

        node_ref = self.graph.value(node, SH.node)
        if node_ref:
            if self._is_node_shape(node_ref):
                schemas.append(self._ref_schema(node_ref))

        if not schemas:
            return {}
        if len(schemas) == 1:
            return schemas[0]
        return {"allOf": schemas}

    def _wrap_value_schema(self, schema: JsonSchema, min_count: Optional[int], max_count: Optional[int]) -> JsonSchema:
        array_schema: JsonSchema = {"type": "array", "items": schema}
        if min_count is not None:
            array_schema["minItems"] = min_count
        if max_count is not None:
            array_schema["maxItems"] = max_count

        if max_count == 1:
            return {"anyOf": [schema, array_schema]}
        if min_count is not None and min_count > 1:
            return array_schema
        return {"anyOf": [schema, array_schema]}

    def _build_node_constraint(self, node: Union[URIRef, BNode]) -> Optional[JsonSchema]:
        or_list = self.graph.value(node, SH["or"])
        if or_list:
            or_constraints = self._build_list_constraints(or_list)
            return {"anyOf": or_constraints} if or_constraints else None
        and_list = self.graph.value(node, SH["and"])
        if and_list:
            and_constraints = self._build_list_constraints(and_list)
            return {"allOf": and_constraints} if and_constraints else None
        xone_list = self.graph.value(node, SH.xone)
        if xone_list:
            xone_constraints = self._build_list_constraints(xone_list)
            return {"oneOf": xone_constraints} if xone_constraints else None

        if self.graph.value(node, SH.path):
            prop_schema, is_required, forbidden = self._build_property_schema(node)
            path = self.graph.value(node, SH.path)
            if path is None or not isinstance(path, URIRef):
                return None
            prop_name = self._prop_name(node, path)
            # if forbidden:
            #     return {"not": {"required": [prop_name]}}
            if prop_schema is None:
                return None
            obj_schema: JsonSchema = {"type": "object", "properties": {prop_name: prop_schema}}
            if is_required:
                obj_schema["required"] = [prop_name]
            return obj_schema

        focus_constraint = self._build_focus_node_constraint(node)
        if focus_constraint:
            return focus_constraint

        inline_constraint = self._build_inline_shape_constraint(node)
        if inline_constraint:
            return inline_constraint

        return None

    def _build_focus_node_constraint(self, node: Union[URIRef, BNode]) -> Optional[JsonSchema]:
        has_value_constraint = any(
            self.graph.value(node, predicate) is not None
            for predicate in (SH.nodeKind, SH.pattern, SH.datatype, SH["in"], SH.hasValue)
        )
        if not has_value_constraint:
            return None
        if self._is_node_shape(node) and self._has_structural_constraints(node):
            return None

        node_kind = self.graph.value(node, SH.nodeKind)
        value_schema = self._build_value_schema_from_node(node)
        if not value_schema:
            return None
        id_required_schema: JsonSchema = {
            "type": "object",
            "properties": {"@id": value_schema},
            "required": ["@id"],
        }
        if node_kind in (SH.BlankNode, SH.BlankNodeOrIRI):
            return {
                "anyOf": [
                    id_required_schema,
                    {"type": "object", "not": {"required": ["@id"]}},
                ]
            }
        return id_required_schema

    def _build_inline_shape_constraint(self, node: Union[URIRef, BNode]) -> Optional[JsonSchema]:
        properties: Dict[str, JsonSchema] = {}
        required: List[str] = []
        constraints: List[JsonSchema] = []

        has_any = False
        for prop in self.graph.objects(node, SH.property):
            has_any = True
            path = self.graph.value(prop, SH.path)
            if path is None:
                node_constraint = self._build_node_constraint(prop)
                if node_constraint:
                    constraints.append(node_constraint)
                continue
            if not isinstance(path, URIRef):
                continue
            prop_name = self._prop_name(prop, path)
            prop_schema, prop_required, prop_forbidden = self._build_property_schema(prop)
            if prop_schema is not None:
                properties[prop_name] = prop_schema
            if prop_required:
                required.append(prop_name)
            # if prop_forbidden:
            #     constraints.append({"not": {"required": [prop_name]}})

        for node_ref in self.graph.objects(node, SH.node):
            has_any = True
            node_constraint = self._build_node_constraint(node_ref)
            if node_constraint:
                constraints.append(node_constraint)

        closed = self._bool_value(self.graph.value(node, SH.closed))
        ignored: List[str] = []
        for ignored_list in self.graph.objects(node, SH.ignoredProperties):
            try:
                ignored.extend([str(p) for p in Collection(self.graph, ignored_list)])
            except Exception:
                ignored.append(str(ignored_list))

        for ignored_prop in ignored:
            has_any = True
            if ignored_prop not in properties:
                properties[ignored_prop] = {}

        if not has_any:
            return None

        obj_schema: JsonSchema = {
            "type": "object",
            "properties": properties,
        }
        if required:
            obj_schema["required"] = sorted(set(required))
        if closed:
            obj_schema["unevaluatedProperties"] = False

        if constraints:
            return {"allOf": [obj_schema] + constraints}
        return obj_schema

    def _build_list_constraints(self, list_node: Union[URIRef, BNode]) -> List[JsonSchema]:
        constraints: List[JsonSchema] = []
        for entry in Collection(self.graph, list_node):
            constraint = self._build_node_constraint(entry)
            if constraint:
                constraints.append(constraint)
        return constraints

    def _build_list_value_constraints(self, list_node: Union[URIRef, BNode]) -> List[JsonSchema]:
        constraints: List[JsonSchema] = []
        for entry in Collection(self.graph, list_node):
            constraints.append(self._build_value_schema_from_node(entry))
        return constraints

    def _collect_constraint_paths(self, node: Union[URIRef, BNode]) -> List[str]:
        names: List[str] = []
        path = self.graph.value(node, SH.path)
        if path is not None and isinstance(path, URIRef):
            max_count = self._int_value(self.graph.value(node, SH.maxCount))
            if max_count != 0:
                names.append(self._prop_name(node, path))

        for prop in self.graph.objects(node, SH.property):
            path = self.graph.value(prop, SH.path)
            if path is None or not isinstance(path, URIRef):
                continue

            # Check if this property is forbidden (maxCount=0), if so, skip it
            max_count = self._int_value(self.graph.value(prop, SH.maxCount))
            if max_count == 0:
                continue

            names.append(self._prop_name(prop, path))

        for list_pred in (SH["or"], SH["and"], SH.xone):
            list_node = self.graph.value(node, list_pred)
            if list_node:
                for entry in Collection(self.graph, list_node):
                    names.extend(self._collect_constraint_paths(entry))

        not_node = self.graph.value(node, SH["not"])
        if not_node:
            names.extend(self._collect_constraint_paths(not_node))

        for node_ref in self.graph.objects(node, SH.node):
            names.extend(self._collect_constraint_paths(node_ref))

        return names

    def _prop_name(self, prop_shape: Union[URIRef, BNode], path: URIRef) -> str:
        name = self.graph.value(prop_shape, SH.name)
        if name:
            return str(name)
        return self._prop_key(path)

    def _prop_key(self, uri: URIRef) -> str:
        if not self.use_local_names:
            return str(uri)
        try:
            _, _, name = self.graph.namespace_manager.compute_qname(uri)
            return name
        except Exception:
            uri_str = str(uri)
            if "#" in uri_str:
                return uri_str.rsplit("#", 1)[-1]
            if "/" in uri_str:
                return uri_str.rsplit("/", 1)[-1]
            return uri_str

    def _ref_schema(self, node: Union[URIRef, BNode]) -> JsonSchema:
        return {"$ref": f"#/$defs/{self._def_name(node)}"}

    def _datatype_schema(self, datatype: URIRef) -> JsonSchema:
        datatype_str = str(datatype)
        mapping = {
            "http://www.w3.org/2001/XMLSchema#string": {"type": "string"},
            "http://www.w3.org/2001/XMLSchema#boolean": {"type": "boolean"},
            "http://www.w3.org/2001/XMLSchema#integer": {"type": "integer"},
            "http://www.w3.org/2001/XMLSchema#decimal": {"type": "number"},
            "http://www.w3.org/2001/XMLSchema#double": {"type": "number"},
            "http://www.w3.org/2001/XMLSchema#float": {"type": "number"},
            "http://www.w3.org/2001/XMLSchema#dateTime": {"type": "string", "format": "date-time"},
            "http://www.w3.org/2001/XMLSchema#dateTimeStamp": {"type": "string", "format": "date-time"},
            "http://www.w3.org/2001/XMLSchema#anyURI": {"type": "string"},
        }
        return mapping.get(datatype_str, {"type": "string"})

    def _node_kind_schema(self, node_kind: URIRef) -> JsonSchema:
        if node_kind == SH.IRI:
            return {"type": "string", "pattern": "^(?!_:).+:.+"}
        if node_kind == SH.BlankNode:
            return {"type": "string", "pattern": "^_:.+"}
        if node_kind == SH.BlankNodeOrIRI:
            return {"anyOf": [
                {"type": "string", "pattern": "^(?!_:).+:.+"},
                {"type": "string", "pattern": "^_:.+"},
            ]}
        return {"type": "string"}

    def _build_type_constraint(self, target_classes: List[URIRef]) -> JsonSchema:
        if not target_classes:
            return {}
        if len(target_classes) == 1:
            const_values = self._type_aliases(target_classes[0])
            return {
                "anyOf": [
                    {"type": "object", "properties": {"@type": self._type_const_schema(const_values)}, "required": ["@type"]},
                    {"type": "object", "properties": {"@type": {"type": "array", "contains": self._type_const_schema(const_values)}}, "required": ["@type"]},
                ]
            }

        options = []
        for cls in target_classes:
            const_values = self._type_aliases(cls)
            options.append({"type": "object", "properties": {"@type": self._type_const_schema(const_values)}, "required": ["@type"]})
            options.append({"type": "object", "properties": {"@type": {"type": "array", "contains": self._type_const_schema(const_values)}}, "required": ["@type"]})

        return {"anyOf": options}

    def _type_aliases(self, class_ref: URIRef) -> List[str]:
        values = [str(class_ref)]
        if self.use_local_names:
            try:
                _, _, name = self.graph.namespace_manager.compute_qname(class_ref)
                if name and name not in values:
                    values.append(name)
            except Exception:
                pass
        return values

    def _type_const_schema(self, values: List[str]) -> JsonSchema:
        if len(values) == 1:
            return {"const": values[0]}
        return {"anyOf": [{"const": value} for value in values]}

    def _shape_for_class(self, class_ref: URIRef) -> Optional[Union[URIRef, BNode]]:
        for shape in self.graph.subjects(SH.targetClass, class_ref):
            return shape
        return None

    def _class_value_schema(self, class_ref: URIRef) -> JsonSchema:
        return self._build_type_constraint([class_ref])

    @staticmethod
    def _int_value(value: Optional[object]) -> Optional[int]:
        if value is None:
            return None
        try:
            return int(value)
        except Exception:
            return None

    @staticmethod
    def _bool_value(value: Optional[object]) -> bool:
        if value is None:
            return False
        return str(value).lower() in ("true", "1")

    def _is_node_shape(self, node: Union[URIRef, BNode]) -> bool:
        return (node, RDF.type, SH.NodeShape) in self.graph

    @staticmethod
    def _normalize_has_value(value: object) -> object:
        if isinstance(value, float) and math.isnan(value):
            return "NaN"
        return value

    def _has_structural_constraints(self, node: Union[URIRef, BNode]) -> bool:
        return (
            self.graph.value(node, SH.property) is not None
            or self.graph.value(node, SH.closed) is not None
            or self.graph.value(node, SH.node) is not None
        )


if __name__ == "__main__":
    main()
