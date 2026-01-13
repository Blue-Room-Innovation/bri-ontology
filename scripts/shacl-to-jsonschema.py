#!/usr/bin/env python3
"""
SHACL to JSON Schema Converter
================================

Generates a structural JSON Schema projection from SHACL shapes.

This is NOT a semantic conversion - it only captures structural validation
constraints that can be expressed in JSON Schema. SHACL remains the source
of truth for semantic validation.

Usage:
    python shacl-to-jsonschema.py --input shapes/digitalWastePassportShapes.ttl --output build/digitalWastePassport.schema.json
    python shacl-to-jsonschema.py --input shapes/digitalMarpolWastePassportShapes.ttl --output build/digitalMarpolWastePassport.schema.json

Author: Blue Room Innovation
Date: 2026-01-08
Related: ADR-005
"""

import argparse
import json
import sys
import logging
from typing import Dict, List, Any, Optional, Set
from rdflib import Graph, Namespace, URIRef, Literal, RDF, RDFS, XSD
from rdflib.namespace import SH
from pathlib import Path

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger(__name__)

# Define namespaces
SHACL = Namespace("http://www.w3.org/ns/shacl#")
DCT = Namespace("http://purl.org/dc/terms/")
SCHEMA = Namespace("http://schema.org/")
DWP = Namespace("https://raw.githubusercontent.com/Blue-Room-Innovation/bri-ontology/0.1/ontology/digitalWastePassport.ttl#")
UNECE = Namespace("https://test.uncefact.org/vocabulary/untp/core/0/")
UNECE_DPP = Namespace("https://test.uncefact.org/vocabulary/untp/dpp/0/")


class SHACLToJSONSchemaConverter:
    """Converts SHACL shapes to JSON Schema."""
    
    def __init__(self, graph: Graph):
        self.graph = graph
        self.definitions: Dict[str, Any] = {}
        self.warnings: List[str] = []
        self.class_to_shape_map: Dict[str, str] = {}  # Maps class URIs to shape names
        
        # XSD to JSON Schema type mapping
        self.xsd_to_json_type = {
            XSD.string: "string",
            XSD.integer: "integer",
            XSD.int: "integer",
            XSD.long: "integer",
            XSD.short: "integer",
            XSD.byte: "integer",
            XSD.decimal: "number",
            XSD.float: "number",
            XSD.double: "number",
            XSD.boolean: "boolean",
            XSD.date: "string",
            XSD.dateTime: "string",
            XSD.time: "string",
            XSD.anyURI: "string",
        }
        
        # XSD to JSON Schema format mapping
        self.xsd_to_json_format = {
            XSD.dateTime: "date-time",
            XSD.date: "date",
            XSD.time: "time",
            XSD.anyURI: "uri",
        }
    
    def convert(self) -> Dict[str, Any]:
        """Main conversion method."""
        logger.info("Starting SHACL to JSON Schema conversion...")
        
        # Find all NodeShapes
        node_shapes = list(self.graph.subjects(RDF.type, SH.NodeShape))
        logger.info(f"Found {len(node_shapes)} NodeShapes")
        
        if not node_shapes:
            logger.warning("No SHACL NodeShapes found in input file")
            return self._create_empty_schema()
        
        # Build mapping from classes to shapes (for sh:class resolution)
        self._build_class_to_shape_map(node_shapes)
        
        # Convert each shape to a JSON Schema definition
        for shape in node_shapes:
            self._convert_node_shape(shape)
        
        # Create the main schema
        schema = self._create_main_schema()
        
        # Log warnings
        if self.warnings:
            logger.warning(f"Conversion completed with {len(self.warnings)} warnings:")
            for warning in self.warnings:
                logger.warning(f"  - {warning}")
        else:
            logger.info("Conversion completed successfully with no warnings")
        
        return schema
    
    def _build_class_to_shape_map(self, node_shapes: List[URIRef]):
        """Build a mapping from targetClass to Shape name for sh:class resolution."""
        for shape in node_shapes:
            target_class = self.graph.value(shape, SH.targetClass)
            if target_class:
                shape_name = self._get_local_name(shape)
                self.class_to_shape_map[str(target_class)] = shape_name
                logger.debug(f"Mapped class {target_class} -> shape {shape_name}")
    
    def _create_empty_schema(self) -> Dict[str, Any]:
        """Create an empty schema when no shapes are found."""
        return {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Empty Schema",
            "description": "No SHACL shapes found for conversion",
            "type": "object"
        }
    
    def _create_main_schema(self) -> Dict[str, Any]:
        """Create the main JSON Schema structure."""
        schema = {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "title": "Generated JSON Schema from SHACL",
            "description": "This schema was automatically generated from SHACL shapes. It provides structural validation only. For semantic validation, use the original SHACL shapes.",
            "$comment": "Auto-generated by shacl-to-jsonschema.py - DO NOT EDIT MANUALLY",
            "definitions": self.definitions
        }
        
        # If there's a main shape, use it as root
        # Look for a shape that represents the main class (heuristic: first shape found)
        if self.definitions:
            first_def = next(iter(self.definitions.keys()))
            schema["$ref"] = f"#/definitions/{first_def}"
        
        return schema
    
    def _convert_node_shape(self, shape: URIRef):
        """Convert a single NodeShape to a JSON Schema definition."""
        shape_name = self._get_local_name(shape)
        logger.info(f"Converting shape: {shape_name}")
        
        definition: Dict[str, Any] = {
            "type": "object",
            "$comment": f"Generated from SHACL shape {shape}"
        }
        
        # Get shape name and description
        name = self._get_literal_value(shape, SH.name)
        description = self._get_literal_value(shape, SH.description)
        
        if name:
            definition["title"] = name
        if description:
            definition["description"] = description
        
        # Process properties
        properties: Dict[str, Any] = {}
        required: List[str] = []
        
        for prop_shape in self.graph.objects(shape, SH.property):
            prop_name, prop_def, is_required = self._convert_property_shape(prop_shape)
            if prop_name:
                properties[prop_name] = prop_def
                if is_required:
                    required.append(prop_name)
        
        if properties:
            definition["properties"] = properties
        
        if required:
            definition["required"] = required
        
        # Handle sh:closed
        closed = self._get_literal_value(shape, SH.closed)
        if closed and str(closed).lower() == "true":
            definition["additionalProperties"] = False
        
        self.definitions[shape_name] = definition
    
    def _convert_property_shape(self, prop_shape: URIRef) -> tuple[Optional[str], Dict[str, Any], bool]:
        """Convert a property shape to JSON Schema property definition."""
        path = self.graph.value(prop_shape, SH.path)
        if not path:
            self.warnings.append(f"Property shape without sh:path found: {prop_shape}")
            return None, {}, False
        
        prop_name = self._get_property_name(path)
        prop_def: Dict[str, Any] = {}
        
        # Get description
        description = self._get_literal_value(prop_shape, SH.description)
        message = self._get_literal_value(prop_shape, SH.message)
        if description:
            prop_def["description"] = description
        elif message:
            prop_def["description"] = message
        
        # Determine type from sh:datatype or sh:class
        datatype = self.graph.value(prop_shape, SH.datatype)
        class_ref = self.graph.value(prop_shape, SH["class"])
        
        if datatype:
            json_type = self.xsd_to_json_type.get(datatype, "string")
            prop_def["type"] = json_type
            
            # Add format if applicable
            json_format = self.xsd_to_json_format.get(datatype)
            if json_format:
                prop_def["format"] = json_format
        
        elif class_ref:
            # sh:class points to an ontology class. Find the Shape that targets this class.
            class_uri = str(class_ref)
            shape_name = self.class_to_shape_map.get(class_uri)
            
            if shape_name:
                # Found a shape that targets this class
                prop_def["$ref"] = f"#/definitions/{shape_name}"
            else:
                # No shape found for this class - might be external or missing
                self.warnings.append(f"No shape found with sh:targetClass {class_ref} for property {prop_name}")
                prop_def["$comment"] = f"sh:class {class_ref} - no corresponding shape found"
        
        elif self.graph.value(prop_shape, SH.node):
            # sh:node directly references another shape
            node_shape = self.graph.value(prop_shape, SH.node)
            shape_name = self._get_local_name(node_shape)
            prop_def["$ref"] = f"#/definitions/{shape_name}"
        
        else:
            # No explicit type - default to allowing any type
            prop_def["$comment"] = "No explicit sh:datatype or sh:class found"
        
        # Handle cardinality
        min_count = self._get_literal_value(prop_shape, SH.minCount)
        max_count = self._get_literal_value(prop_shape, SH.maxCount)
        
        is_required = False
        if min_count is not None:
            min_count_int = int(min_count)
            if min_count_int >= 1:
                is_required = True
        
        # If maxCount > 1 or minCount > 1, this is an array
        if max_count is not None and int(max_count) > 1:
            array_def = {"type": "array"}
            if "type" in prop_def or "$ref" in prop_def:
                array_def["items"] = {k: v for k, v in prop_def.items() if k != "description"}
            if "description" in prop_def:
                array_def["description"] = prop_def["description"]
            if min_count is not None:
                array_def["minItems"] = int(min_count)
            if max_count is not None:
                array_def["maxItems"] = int(max_count)
            prop_def = array_def
        elif min_count is not None and int(min_count) > 1:
            # minCount > 1 without maxCount also implies array
            array_def = {"type": "array"}
            if "type" in prop_def or "$ref" in prop_def:
                array_def["items"] = {k: v for k, v in prop_def.items() if k != "description"}
            if "description" in prop_def:
                array_def["description"] = prop_def["description"]
            array_def["minItems"] = int(min_count)
            prop_def = array_def
        
        # Handle sh:in (enumeration)
        in_values = list(self.graph.objects(prop_shape, SH["in"]))
        if in_values:
            enum_values = self._extract_list_values(in_values[0])
            if enum_values:
                # If it's an array, add enum to items
                if prop_def.get("type") == "array" and "items" in prop_def:
                    prop_def["items"]["enum"] = enum_values
                else:
                    prop_def["enum"] = enum_values
        
        # Handle numeric constraints
        min_inclusive = self._get_literal_value(prop_shape, SH.minInclusive)
        max_inclusive = self._get_literal_value(prop_shape, SH.maxInclusive)
        min_exclusive = self._get_literal_value(prop_shape, SH.minExclusive)
        max_exclusive = self._get_literal_value(prop_shape, SH.maxExclusive)
        
        target_def = prop_def
        if prop_def.get("type") == "array" and "items" in prop_def:
            target_def = prop_def["items"]
        
        if min_inclusive is not None:
            target_def["minimum"] = float(min_inclusive)
        if max_inclusive is not None:
            target_def["maximum"] = float(max_inclusive)
        if min_exclusive is not None:
            target_def["exclusiveMinimum"] = float(min_exclusive)
        if max_exclusive is not None:
            target_def["exclusiveMaximum"] = float(max_exclusive)
        
        # Handle string constraints
        min_length = self._get_literal_value(prop_shape, SH.minLength)
        max_length = self._get_literal_value(prop_shape, SH.maxLength)
        pattern = self._get_literal_value(prop_shape, SH.pattern)
        
        if min_length is not None:
            target_def["minLength"] = int(min_length)
        if max_length is not None:
            target_def["maxLength"] = int(max_length)
        if pattern:
            target_def["pattern"] = str(pattern)
        
        # Handle sh:or (anyOf)
        or_constraints = list(self.graph.objects(prop_shape, SH["or"]))
        if or_constraints:
            self.warnings.append(f"sh:or found in {prop_name} - partial conversion to anyOf")
        
        # Handle sh:xone (oneOf)
        xone_constraints = list(self.graph.objects(prop_shape, SH.xone))
        if xone_constraints:
            self.warnings.append(f"sh:xone found in {prop_name} - partial conversion to oneOf")
        
        # Handle sh:and (allOf)
        and_constraints = list(self.graph.objects(prop_shape, SH["and"]))
        if and_constraints:
            self.warnings.append(f"sh:and found in {prop_name} - partial conversion to allOf")
        
        # Handle sh:sparql (not convertible)
        sparql_constraints = list(self.graph.objects(prop_shape, SH.sparql))
        if sparql_constraints:
            self.warnings.append(f"sh:sparql found in {prop_name} - CANNOT be converted to JSON Schema")
            prop_def["$comment"] = (prop_def.get("$comment", "") + " Contains sh:sparql constraint not convertible to JSON Schema").strip()
        
        return prop_name, prop_def, is_required
    
    def _extract_list_values(self, list_node: URIRef) -> List[str]:
        """Extract values from an RDF list."""
        values = []
        current = list_node
        
        while current != RDF.nil:
            first = self.graph.value(current, RDF.first)
            if first:
                if isinstance(first, URIRef):
                    values.append(str(first))
                elif isinstance(first, Literal):
                    values.append(str(first))
            
            rest = self.graph.value(current, RDF.rest)
            if rest:
                current = rest
            else:
                break
        
        return values
    
    def _get_property_name(self, path: URIRef) -> str:
        """Get a JSON-friendly property name from a path URI."""
        # Use prefix notation if possible
        local_name = self._get_local_name(path)
        
        # Try to get namespace prefix
        for prefix, namespace in self.graph.namespaces():
            if str(path).startswith(str(namespace)):
                return f"{prefix}:{local_name}"
        
        # Fallback to local name
        return local_name
    
    def _get_local_name(self, uri: URIRef) -> str:
        """Extract the local name from a URI."""
        uri_str = str(uri)
        if "#" in uri_str:
            return uri_str.split("#")[-1]
        elif "/" in uri_str:
            return uri_str.split("/")[-1]
        return uri_str
    
    def _get_literal_value(self, subject: URIRef, predicate: URIRef) -> Optional[str]:
        """Get a literal value from the graph."""
        value = self.graph.value(subject, predicate)
        if value:
            return str(value)
        return None


def main():
    """Main entry point."""
    parser = argparse.ArgumentParser(
        description="Convert SHACL shapes to JSON Schema",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python shacl-to-jsonschema.py -i shapes/digitalWastePassportShapes.ttl -o build/digitalWastePassport.schema.json
  python shacl-to-jsonschema.py --input shapes/digitalMarpolWastePassportShapes.ttl --output build/digitalMarpolWastePassport.schema.json
        """
    )
    
    parser.add_argument(
        "-i", "--input",
        required=True,
        help="Input SHACL file (Turtle format)"
    )
    
    parser.add_argument(
        "-o", "--output",
        required=True,
        help="Output JSON Schema file"
    )
    
    parser.add_argument(
        "-v", "--verbose",
        action="store_true",
        help="Enable verbose output"
    )
    
    args = parser.parse_args()
    
    if args.verbose:
        logger.setLevel(logging.DEBUG)
    
    # Check input file exists
    input_path = Path(args.input)
    if not input_path.exists():
        logger.error(f"Input file not found: {args.input}")
        sys.exit(1)
    
    # Load SHACL graph
    logger.info(f"Loading SHACL file: {args.input}")
    graph = Graph()
    try:
        graph.parse(args.input, format="turtle")
        logger.info(f"Loaded {len(graph)} triples")
    except Exception as e:
        logger.error(f"Failed to parse SHACL file: {e}")
        sys.exit(1)
    
    # Convert
    converter = SHACLToJSONSchemaConverter(graph)
    schema = converter.convert()
    
    # Write output
    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    logger.info(f"Writing JSON Schema to: {args.output}")
    with open(args.output, "w", encoding="utf-8") as f:
        json.dump(schema, f, indent=2, ensure_ascii=False)
    
    logger.info("✅ Conversion complete")
    
    # Exit with warning code if there were warnings
    if converter.warnings:
        sys.exit(2)  # Non-zero exit code to signal warnings


if __name__ == "__main__":
    main()
