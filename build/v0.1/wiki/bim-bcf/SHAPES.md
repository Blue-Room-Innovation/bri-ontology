# Shapes for bim-bcf

| Shape | Target Class(es) | Property | Datatype | Class | Min | Max | In | Description |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| bimBcfShape | bcfModel | documents |  |  | 0 |  |  |  |
| bimBcfShape | bcfModel | extensions |  |  | 0 | 1 |  |  |
| bimBcfShape | bcfModel | markup |  |  | 0 | 1 |  |  |
| bimBcfShape | bcfModel | projectInfo |  |  | 0 | 1 |  |  |
| bimBcfShape | bcfModel | version |  |  | 0 | 1 |  |  |
| bimBcfShape | bcfModel | visualizationInfo |  |  | 0 | 1 |  |  |
| bimSnippetShape | bimSnippet | reference |  |  | 1 | 1 |  |  |
| bimSnippetShape | bimSnippet | referenceSchema |  |  | 1 | 1 |  |  |
| bimSnippetShape | bimSnippet | snippetType |  |  | 1 | 1 |  |  |
| bimSnippetShape | bimSnippet | isExternal | boolean |  | 0 | 1 |  |  |
| bitmapFormatShape |  |  |  |  |  |  |  |  |
| bitmapShape | bitmap | format |  |  | 1 | 1 |  |  |
| bitmapShape | bitmap | reference |  |  | 1 | 1 |  |  |
| bitmapShape | bitmap | location |  |  | 1 | 1 |  |  |
| bitmapShape | bitmap | normal |  |  | 1 | 1 |  |  |
| bitmapShape | bitmap | up |  |  | 1 | 1 |  |  |
| bitmapShape | bitmap | height | double |  | 1 | 1 |  |  |
| clippingPlaneShape | clippingPlane | location |  |  | 1 | 1 |  |  |
| clippingPlaneShape | clippingPlane | direction |  |  | 1 | 1 |  |  |
| colorLiteralShape |  |  |  |  |  |  |  |  |
| coloringEntryShape | coloringEntry | components |  |  | 0 |  |  |  |
| coloringEntryShape | coloringEntry | colorValue |  |  | 1 | 1 |  |  |
| commentShape | comment | date | dateTime |  | 1 | 1 |  |  |
| commentShape | comment | author |  |  | 1 | 1 |  |  |
| commentShape | comment | commentText |  |  | 0 | 1 |  |  |
| commentShape | comment | viewpoint |  |  | 0 | 1 |  |  |
| commentShape | comment | modifiedDate | dateTime |  | 0 | 1 |  |  |
| commentShape | comment | modifiedAuthor |  |  | 0 | 1 |  |  |
| commentShape | comment | guid |  |  | 1 | 1 |  |  |
| commentViewpointRefShape | commentViewpointRef | guid |  |  | 1 | 1 |  |  |
| componentShape | component | originatingSystem |  |  | 0 | 1 |  |  |
| componentShape | component | authoringToolId |  |  | 0 | 1 |  |  |
| componentShape | component | ifcGuid |  |  | 0 | 1 |  |  |
| componentVisibilityShape | componentVisibility | viewSetupHints |  |  | 0 | 1 |  |  |
| componentVisibilityShape | componentVisibility | exceptions |  |  | 0 |  |  |  |
| componentVisibilityShape | componentVisibility | defaultVisibility | boolean |  | 0 | 1 |  |  |
| componentsShape | components | selection |  |  | 0 |  |  |  |
| componentsShape | components | visibility |  |  | 0 | 1 |  |  |
| componentsShape | components | coloring |  |  | 0 |  |  |  |
| directionShape | direction | x | double |  | 1 | 1 |  |  |
| directionShape | direction | y | double |  | 1 | 1 |  |  |
| directionShape | direction | z | double |  | 1 | 1 |  |  |
| documentReferenceShape | documentReference | description |  |  | 0 | 1 |  |  |
| documentReferenceShape | documentReference | guid |  |  | 1 | 1 |  |  |
| documentShape | document | filename |  |  | 1 | 1 |  |  |
| documentShape | document | description |  |  | 0 | 1 |  |  |
| documentShape | document | guid |  |  | 1 | 1 |  |  |
| extensionsShape | extensions | topicTypes |  |  | 0 |  |  |  |
| extensionsShape | extensions | topicStatuses |  |  | 0 |  |  |  |
| extensionsShape | extensions | priorities |  |  | 0 |  |  |  |
| extensionsShape | extensions | topicLabels |  |  | 0 |  |  |  |
| extensionsShape | extensions | users |  |  | 0 |  |  |  |
| extensionsShape | extensions | snippetTypes |  |  | 0 |  |  |  |
| extensionsShape | extensions | stages |  |  | 0 |  |  |  |
| fieldOfViewShape |  |  |  |  |  |  |  |  |
| fileShape | file | filename |  |  | 0 | 1 |  |  |
| fileShape | file | date | dateTime |  | 0 | 1 |  |  |
| fileShape | file | reference |  |  | 0 | 1 |  |  |
| fileShape | file | ifcProject |  |  | 0 | 1 |  |  |
| fileShape | file | ifcSpatialStructureElement |  |  | 0 | 1 |  |  |
| fileShape | file | isExternal | boolean |  | 0 | 1 |  |  |
| guidLiteralShape |  |  |  |  |  |  |  |  |
| headerShape | header | file |  |  | 0 |  |  |  |
| ifcGuidLiteralShape |  |  |  |  |  |  |  |  |
| lineShape | line | startPoint |  |  | 1 | 1 |  |  |
| lineShape | line | endPoint |  |  | 1 | 1 |  |  |
| markupShape | markup | header |  |  | 0 | 1 |  |  |
| markupShape | markup | topic |  |  | 1 | 1 |  |  |
| nonEmptyOrBlankStringShape |  |  |  |  |  |  |  |  |
| orthogonalCameraShape | orthogonalCamera | cameraViewPoint |  |  | 1 | 1 |  |  |
| orthogonalCameraShape | orthogonalCamera | cameraDirection |  |  | 1 | 1 |  |  |
| orthogonalCameraShape | orthogonalCamera | cameraUpVector |  |  | 1 | 1 |  |  |
| orthogonalCameraShape | orthogonalCamera | viewToWorldScale | double |  | 1 | 1 |  |  |
| orthogonalCameraShape | orthogonalCamera | aspectRatio |  |  | 1 | 1 |  |  |
| perspectiveCameraShape | perspectiveCamera | cameraViewPoint |  |  | 1 | 1 |  |  |
| perspectiveCameraShape | perspectiveCamera | cameraDirection |  |  | 1 | 1 |  |  |
| perspectiveCameraShape | perspectiveCamera | cameraUpVector |  |  | 1 | 1 |  |  |
| perspectiveCameraShape | perspectiveCamera | fieldOfView |  |  | 1 | 1 |  |  |
| perspectiveCameraShape | perspectiveCamera | aspectRatio |  |  | 1 | 1 |  |  |
| pointShape | point | x | double |  | 1 | 1 |  |  |
| pointShape | point | y | double |  | 1 | 1 |  |  |
| pointShape | point | z | double |  | 1 | 1 |  |  |
| positiveDoubleShape |  |  |  |  |  |  |  |  |
| projectInfoShape | projectInfo | project |  |  | 1 | 1 |  |  |
| projectShape | project | name |  |  | 0 | 1 |  |  |
| projectShape | project | projectId |  |  | 1 | 1 |  |  |
| relatedTopicRefShape | relatedTopicRef | guid |  |  | 1 | 1 |  |  |
| topicShape | topic | referenceLinks |  |  | 0 |  |  |  |
| topicShape | topic | title |  |  | 1 | 1 |  |  |
| topicShape | topic | priority |  |  | 0 | 1 |  |  |
| topicShape | topic | index | int |  | 0 | 1 |  |  |
| topicShape | topic | labels |  |  | 0 |  |  |  |
| topicShape | topic | creationDate | dateTime |  | 1 | 1 |  |  |
| topicShape | topic | creationAuthor |  |  | 1 | 1 |  |  |
| topicShape | topic | modifiedDate | dateTime |  | 0 | 1 |  |  |
| topicShape | topic | modifiedAuthor |  |  | 0 | 1 |  |  |
| topicShape | topic | dueDate | dateTime |  | 0 | 1 |  |  |
| topicShape | topic | assignedTo |  |  | 0 | 1 |  |  |
| topicShape | topic | stage |  |  | 0 | 1 |  |  |
| topicShape | topic | description |  |  | 0 | 1 |  |  |
| topicShape | topic | bimSnippet |  |  | 0 | 1 |  |  |
| topicShape | topic | documentReferences |  |  | 0 |  |  |  |
| topicShape | topic | relatedTopics |  |  | 0 |  |  |  |
| topicShape | topic | comments |  |  | 0 |  |  |  |
| topicShape | topic | viewpoints |  |  | 0 |  |  |  |
| topicShape | topic | guid |  |  | 1 | 1 |  |  |
| topicShape | topic | serverAssignedId |  |  | 0 | 1 |  |  |
| topicShape | topic | topicType |  |  | 1 | 1 |  |  |
| topicShape | topic | topicStatus |  |  | 1 | 1 |  |  |
| versionShape | version | versionId | string |  | 1 | 1 |  |  |
| viewPointShape | viewPoint | viewpointFile |  |  | 0 | 1 |  |  |
| viewPointShape | viewPoint | snapshot |  |  | 0 | 1 |  |  |
| viewPointShape | viewPoint | index | int |  | 0 | 1 |  |  |
| viewPointShape | viewPoint | guid |  |  | 1 | 1 |  |  |
| viewSetupHintsShape | viewSetupHints | spacesVisible | boolean |  | 0 | 1 |  |  |
| viewSetupHintsShape | viewSetupHints | spaceBoundariesVisible | boolean |  | 0 | 1 |  |  |
| viewSetupHintsShape | viewSetupHints | openingsVisible | boolean |  | 0 | 1 |  |  |
| visualizationInfoShape | visualizationInfo | components |  |  | 0 | 1 |  |  |
| visualizationInfoShape | visualizationInfo | lines |  |  | 0 |  |  |  |
| visualizationInfoShape | visualizationInfo | clippingPlanes |  |  | 0 |  |  |  |
| visualizationInfoShape | visualizationInfo | bitmaps |  |  | 0 |  |  |  |
| visualizationInfoShape | visualizationInfo | guid |  |  | 1 | 1 |  |  |
