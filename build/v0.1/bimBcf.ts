/**
 * Auto-generated TypeScript definitions from JSON Schema
 * DO NOT EDIT MANUALLY
 * Generated: 2026-03-10 15:47:58
 * Source: shapes/v0.1/bim-bcf.shacl.ttl
 */

export type BimBcfSchema =
  | {
      "@graph": (
        | BcfBimBcfShape
        | BcfDocumentShape
        | BcfExtensionsShape
        | BcfProjectInfoShape
        | BcfProjectShape
        | BcfVersionShape
        | BcfMarkupShape
        | BcfHeaderShape
        | BcfTopicShape
        | BcfBimSnippetShape
        | BcfFileShape
        | BcfViewPointShape
        | BcfDocumentReferenceShape
        | BcfRelatedTopicRefShape
        | BcfCommentViewpointRefShape
        | BcfCommentShape
        | BcfVisualizationInfoShape
        | BcfOrthogonalCameraShape
        | BcfPerspectiveCameraShape
        | BcfPointShape
        | BcfDirectionShape
        | BcfComponentsShape
        | BcfViewSetupHintsShape
        | BcfComponentVisibilityShape
        | BcfColoringEntryShape
        | BcfComponentShape
        | BcfLineShape
        | BcfClippingPlaneShape
        | BcfBitmapShape
      )[];
      [k: string]: unknown;
    }
  | ({
      [k: string]: unknown;
    } & (
      | BcfBimBcfShape
      | BcfDocumentShape
      | BcfExtensionsShape
      | BcfProjectInfoShape
      | BcfProjectShape
      | BcfVersionShape
      | BcfMarkupShape
      | BcfHeaderShape
      | BcfTopicShape
      | BcfBimSnippetShape
      | BcfFileShape
      | BcfViewPointShape
      | BcfDocumentReferenceShape
      | BcfRelatedTopicRefShape
      | BcfCommentViewpointRefShape
      | BcfCommentShape
      | BcfVisualizationInfoShape
      | BcfOrthogonalCameraShape
      | BcfPerspectiveCameraShape
      | BcfPointShape
      | BcfDirectionShape
      | BcfComponentsShape
      | BcfViewSetupHintsShape
      | BcfComponentVisibilityShape
      | BcfColoringEntryShape
      | BcfComponentShape
      | BcfLineShape
      | BcfClippingPlaneShape
      | BcfBitmapShape
    ));
export type BcfBimBcfShape = {
  documents?: BcfDocumentShape | BcfDocumentShape[];
  extensions?: BcfExtensionsShape | [] | [BcfExtensionsShape];
  markup?: BcfMarkupShape | [] | [BcfMarkupShape];
  projectInfo?: BcfProjectInfoShape | [] | [BcfProjectInfoShape];
  version?: BcfVersionShape | [] | [BcfVersionShape];
  visualizationInfo?: BcfVisualizationInfoShape | [] | [BcfVisualizationInfoShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#bcfModel" | "bcfModel";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfDocumentShape = {
  filename: BcfNonEmptyOrBlankStringShape | [BcfNonEmptyOrBlankStringShape];
  description?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  guid: BcfGuidLiteralShape | [BcfGuidLiteralShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#document" | "document";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfNonEmptyOrBlankStringShape = string;
export type BcfGuidLiteralShape = string;
export type BcfExtensionsShape = {
  topicTypes?: BcfNonEmptyOrBlankStringShape | BcfNonEmptyOrBlankStringShape[];
  topicStatuses?: BcfNonEmptyOrBlankStringShape | BcfNonEmptyOrBlankStringShape[];
  priorities?: BcfNonEmptyOrBlankStringShape | BcfNonEmptyOrBlankStringShape[];
  topicLabels?: BcfNonEmptyOrBlankStringShape | BcfNonEmptyOrBlankStringShape[];
  users?: BcfNonEmptyOrBlankStringShape | BcfNonEmptyOrBlankStringShape[];
  snippetTypes?: BcfNonEmptyOrBlankStringShape | BcfNonEmptyOrBlankStringShape[];
  stages?: BcfNonEmptyOrBlankStringShape | BcfNonEmptyOrBlankStringShape[];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type":
        | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#extensions"
        | "extensions";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfMarkupShape = {
  header?: BcfHeaderShape | [] | [BcfHeaderShape];
  topic: BcfTopicShape | [BcfTopicShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#markup" | "markup";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfHeaderShape = {
  file?: BcfFileShape | BcfFileShape[];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#header" | "header";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfFileShape = {
  filename?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  date?: string | [] | [string];
  reference?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  ifcProject?: BcfIfcGuidLiteralShape | [] | [BcfIfcGuidLiteralShape];
  ifcSpatialStructureElement?: BcfIfcGuidLiteralShape | [] | [BcfIfcGuidLiteralShape];
  isExternal?: boolean | [] | [boolean];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#file" | "file";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfIfcGuidLiteralShape = string;
export type BcfTopicShape = {
  referenceLinks?: BcfNonEmptyOrBlankStringShape | BcfNonEmptyOrBlankStringShape[];
  title: BcfNonEmptyOrBlankStringShape | [BcfNonEmptyOrBlankStringShape];
  priority?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  index?: string | [] | [string];
  labels?: BcfNonEmptyOrBlankStringShape | BcfNonEmptyOrBlankStringShape[];
  creationDate: string | [string];
  creationAuthor: BcfNonEmptyOrBlankStringShape | [BcfNonEmptyOrBlankStringShape];
  modifiedDate?: string | [] | [string];
  modifiedAuthor?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  dueDate?: string | [] | [string];
  assignedTo?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  stage?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  description?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  bimSnippet?: BcfBimSnippetShape | [] | [BcfBimSnippetShape];
  documentReferences?: BcfDocumentReferenceShape | BcfDocumentReferenceShape[];
  relatedTopics?: BcfRelatedTopicRefShape | BcfRelatedTopicRefShape[];
  comments?: BcfCommentShape | BcfCommentShape[];
  viewpoints?: BcfViewPointShape | BcfViewPointShape[];
  guid: BcfGuidLiteralShape | [BcfGuidLiteralShape];
  serverAssignedId?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  topicType: BcfNonEmptyOrBlankStringShape | [BcfNonEmptyOrBlankStringShape];
  topicStatus: BcfNonEmptyOrBlankStringShape | [BcfNonEmptyOrBlankStringShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#topic" | "topic";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfBimSnippetShape = {
  reference: BcfNonEmptyOrBlankStringShape | [BcfNonEmptyOrBlankStringShape];
  referenceSchema: BcfNonEmptyOrBlankStringShape | [BcfNonEmptyOrBlankStringShape];
  snippetType: BcfNonEmptyOrBlankStringShape | [BcfNonEmptyOrBlankStringShape];
  isExternal?: boolean | [] | [boolean];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type":
        | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#bimSnippet"
        | "bimSnippet";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfDocumentReferenceShape = {
  description?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  guid: BcfGuidLiteralShape | [BcfGuidLiteralShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type":
        | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#documentReference"
        | "documentReference";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
) &
  (
    | ({
        documentGuid: BcfGuidLiteralShape | [BcfGuidLiteralShape];
        [k: string]: unknown;
      } & {
        [k: string]: unknown;
      })
    | ({
        url: BcfNonEmptyOrBlankStringShape | [BcfNonEmptyOrBlankStringShape];
        [k: string]: unknown;
      } & {
        [k: string]: unknown;
      })
  );
export type BcfRelatedTopicRefShape = {
  guid: BcfGuidLiteralShape | [BcfGuidLiteralShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type":
        | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#relatedTopicRef"
        | "relatedTopicRef";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfCommentShape = {
  date: string | [string];
  author: BcfNonEmptyOrBlankStringShape | [BcfNonEmptyOrBlankStringShape];
  commentText?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  viewpoint?: BcfCommentViewpointRefShape | [] | [BcfCommentViewpointRefShape];
  modifiedDate?: string | [] | [string];
  modifiedAuthor?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  guid: BcfGuidLiteralShape | [BcfGuidLiteralShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#comment" | "comment";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfCommentViewpointRefShape = {
  guid: BcfGuidLiteralShape | [BcfGuidLiteralShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type":
        | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#commentViewpointRef"
        | "commentViewpointRef";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfViewPointShape = {
  viewpointFile?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  snapshot?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  index?: string | [] | [string];
  guid: BcfGuidLiteralShape | [BcfGuidLiteralShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#viewPoint" | "viewPoint";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfProjectInfoShape = {
  project: BcfProjectShape | [BcfProjectShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type":
        | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#projectInfo"
        | "projectInfo";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfProjectShape = {
  name?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  projectId: BcfNonEmptyOrBlankStringShape | [BcfNonEmptyOrBlankStringShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#project" | "project";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfVersionShape = {
  versionId: string | [string];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#version" | "version";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfVisualizationInfoShape = {
  components?: BcfComponentsShape | [] | [BcfComponentsShape];
  lines?: BcfLineShape | BcfLineShape[];
  clippingPlanes?: BcfClippingPlaneShape | BcfClippingPlaneShape[];
  bitmaps?: BcfBitmapShape | BcfBitmapShape[];
  guid: BcfGuidLiteralShape | [BcfGuidLiteralShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type":
        | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#visualizationInfo"
        | "visualizationInfo";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
) &
  (
    | ({
        orthogonalCamera: BcfOrthogonalCameraShape | [BcfOrthogonalCameraShape];
        [k: string]: unknown;
      } & {
        [k: string]: unknown;
      })
    | ({
        perspectiveCamera: BcfPerspectiveCameraShape | [BcfPerspectiveCameraShape];
        [k: string]: unknown;
      } & {
        [k: string]: unknown;
      })
  );
export type BcfComponentsShape = {
  selection?: BcfComponentShape | BcfComponentShape[];
  visibility?: BcfComponentVisibilityShape | [] | [BcfComponentVisibilityShape];
  coloring?: BcfColoringEntryShape | BcfColoringEntryShape[];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type":
        | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#components"
        | "components";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfComponentShape = {
  originatingSystem?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  authoringToolId?: BcfNonEmptyOrBlankStringShape | [] | [BcfNonEmptyOrBlankStringShape];
  ifcGuid?: BcfIfcGuidLiteralShape | [] | [BcfIfcGuidLiteralShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#component" | "component";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfComponentVisibilityShape = {
  viewSetupHints?: BcfViewSetupHintsShape | [] | [BcfViewSetupHintsShape];
  exceptions?: BcfComponentShape | BcfComponentShape[];
  defaultVisibility?: boolean | [] | [boolean];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type":
        | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#componentVisibility"
        | "componentVisibility";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfViewSetupHintsShape = {
  spacesVisible?: boolean | [] | [boolean];
  spaceBoundariesVisible?: boolean | [] | [boolean];
  openingsVisible?: boolean | [] | [boolean];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type":
        | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#viewSetupHints"
        | "viewSetupHints";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfColoringEntryShape = {
  components?: BcfComponentShape | BcfComponentShape[];
  colorValue: BcfColorLiteralShape | [BcfColorLiteralShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type":
        | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#coloringEntry"
        | "coloringEntry";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfColorLiteralShape = string;
export type BcfLineShape = {
  startPoint: BcfPointShape | [BcfPointShape];
  endPoint: BcfPointShape | [BcfPointShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#line" | "line";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfPointShape = {
  x: number | [number];
  y: number | [number];
  z: number | [number];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#point" | "point";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfClippingPlaneShape = {
  location: BcfPointShape | [BcfPointShape];
  direction: BcfDirectionShape | [BcfDirectionShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type":
        | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#clippingPlane"
        | "clippingPlane";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfDirectionShape = {
  x: number | [number];
  y: number | [number];
  z: number | [number];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#direction" | "direction";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfBitmapShape = {
  format: BcfBitmapFormatShape | [BcfBitmapFormatShape];
  reference: BcfNonEmptyOrBlankStringShape | [BcfNonEmptyOrBlankStringShape];
  location: BcfPointShape | [BcfPointShape];
  normal: BcfDirectionShape | [BcfDirectionShape];
  up: BcfDirectionShape | [BcfDirectionShape];
  height: number | [number];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type": "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#bitmap" | "bitmap";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfBitmapFormatShape = "png" | "jpg";
export type BcfOrthogonalCameraShape = {
  cameraViewPoint: BcfPointShape | [BcfPointShape];
  cameraDirection: BcfDirectionShape | [BcfDirectionShape];
  cameraUpVector: BcfDirectionShape | [BcfDirectionShape];
  viewToWorldScale: number | [number];
  aspectRatio: BcfPositiveDoubleShape | [BcfPositiveDoubleShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type":
        | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#orthogonalCamera"
        | "orthogonalCamera";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfPositiveDoubleShape = number;
export type BcfPerspectiveCameraShape = {
  cameraViewPoint: BcfPointShape | [BcfPointShape];
  cameraDirection: BcfDirectionShape | [BcfDirectionShape];
  cameraUpVector: BcfDirectionShape | [BcfDirectionShape];
  fieldOfView: BcfFieldOfViewShape | [BcfFieldOfViewShape];
  aspectRatio: BcfPositiveDoubleShape | [BcfPositiveDoubleShape];
  "@id"?: string;
  "@type"?: string | unknown[];
  [k: string]: unknown;
} & (
  | {
      "@type":
        | "https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl#perspectiveCamera"
        | "perspectiveCamera";
      [k: string]: unknown;
    }
  | {
      "@type": unknown[];
      [k: string]: unknown;
    }
);
export type BcfFieldOfViewShape = number;
