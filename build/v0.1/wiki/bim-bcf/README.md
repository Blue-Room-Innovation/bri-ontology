# bim-bcf Ontology

- **Version:** 0.1
- **Link to ontology:** [ontology/v0.1/bim-bcf.ttl](https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf.ttl)

```mermaid
classDiagram
   class bcfModel{
   }
   class bimSnippet{
       referenceSchema string
   }
   class bitmap{
       format string
       height double
   }
   class clippingPlane{
   }
   class coloringEntry{
       colorValue string
   }
   class comment{
       author string
       commentText string
   }
   class commentViewpointRef{
   }
   class component{
       authoringToolId string
       ifcGuid string
       originatingSystem string
   }
   class componentVisibility{
       defaultVisibility boolean
   }
   class components{
   }
   class direction{
   }
   class document{
   }
   class documentReference{
       documentGuid string
       url string
   }
   class extensions{
       priorities string
       snippetTypes string
       stages string
       topicLabels string
       topicStatuses string
       topicTypes string
       users string
   }
   class file{
       ifcProject string
       ifcSpatialStructureElement string
   }
   class header{
   }
   class line{
   }
   class markup{
   }
   class orthogonalCamera{
       viewToWorldScale double
   }
   class perspectiveCamera{
       fieldOfView double
   }
   class point{
   }
   class project{
       name string
       projectId string
   }
   class projectInfo{
   }
   class relatedTopicRef{
   }
   class topic{
       assignedTo string
       creationAuthor string
       creationDate dateTime
       dueDate dateTime
       labels string
       priority string
       referenceLinks string
       serverAssignedId string
       stage string
       title string
       topicStatus string
       topicType string
   }
   class version{
       versionId string
   }
   class viewPoint{
       snapshot string
       viewpointFile string
   }
   class viewSetupHints{
       openingsVisible boolean
       spaceBoundariesVisible boolean
       spacesVisible boolean
   }
   class visualizationInfo{
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b1{
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b10{
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b13{
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b16{
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b19{
       filename string
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b22{
       description string
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b26{
       index int
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b29{
       modifiedDate dateTime
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b32{
       modifiedAuthor string
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b35{
       reference string
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b39{
       isExternal boolean
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b4{
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b42{
       date dateTime
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b45{
       aspectRatio double
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b48{
       x double
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b51{
       y double
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b54{
       z double
   }
   class nd2f3f6d31c8e4974a341f7c032c94043b7{
   }
   topic --> bimSnippet : bimSnippet
   visualizationInfo --> bitmap : bitmaps
   nd2f3f6d31c8e4974a341f7c032c94043b10 --> direction : cameraDirection
   nd2f3f6d31c8e4974a341f7c032c94043b13 --> direction : cameraUpVector
   nd2f3f6d31c8e4974a341f7c032c94043b7 --> point : cameraViewPoint
   visualizationInfo --> clippingPlane : clippingPlanes
   components --> coloringEntry : coloring
   topic --> comment : comments
   nd2f3f6d31c8e4974a341f7c032c94043b1 --> nd2f3f6d31c8e4974a341f7c032c94043b4 : components
   clippingPlane --> direction : direction
   topic --> documentReference : documentReferences
   bcfModel --> document : documents
   line --> point : endPoint
   componentVisibility --> component : exceptions
   bcfModel --> extensions : extensions
   header --> file : file
   markup --> header : header
   visualizationInfo --> line : lines
   nd2f3f6d31c8e4974a341f7c032c94043b16 --> point : location
   bcfModel --> markup : markup
   bitmap --> direction : normal
   visualizationInfo --> orthogonalCamera : orthogonalCamera
   visualizationInfo --> perspectiveCamera : perspectiveCamera
   projectInfo --> project : project
   bcfModel --> projectInfo : projectInfo
   topic --> relatedTopicRef : relatedTopics
   components --> component : selection
   line --> point : startPoint
   markup --> topic : topic
   bitmap --> direction : up
   bcfModel --> version : version
   componentVisibility --> viewSetupHints : viewSetupHints
   comment --> commentViewpointRef : viewpoint
   topic --> viewPoint : viewpoints
   components --> componentVisibility : visibility
   bcfModel --> visualizationInfo : visualizationInfo
```

## Classes

|Name|Description|Datatype properties|Object properties|Subclass of|
| :--- | :--- | :--- | :--- | :--- |
|<span id="bcfModel">bcfModel</span>|Root container class for BIM BCF model resources.||[documents](#documents), [extensions](#extensions), [markup](#markup), [projectInfo](#projectInfo), [version](#version), [visualizationInfo](#visualizationInfo)||
|<span id="bimSnippet">bimSnippet</span>|BIM snippet metadata containing reference and schema details.|[referenceSchema](#referenceSchema)|||
|<span id="bitmap">bitmap</span>|Bitmap overlay with placement, orientation, format, and size.|[format](#format), [height](#height)|[normal](#normal), [up](#up)||
|<span id="clippingPlane">clippingPlane</span>|Clipping plane defined by location and direction.||[direction](#direction)||
|<span id="coloringEntry">coloringEntry</span>|Single color rule entry linking components and a color value.|[colorValue](#colorValue)|||
|<span id="comment">comment</span>|Comment resource with authoring and modification metadata.|[author](#author), [commentText](#commentText)|[viewpoint](#viewpoint)||
|<span id="commentViewpointRef">commentViewpointRef</span>|Reference from comment to a viewpoint identified by GUID.||||
|<span id="component">component</span>|IFC component reference with optional originating system metadata.|[authoringToolId](#authoringToolId), [ifcGuid](#ifcGuid), [originatingSystem](#originatingSystem)|||
|<span id="componentVisibility">componentVisibility</span>|Default visibility and exception settings for components.|[defaultVisibility](#defaultVisibility)|[exceptions](#exceptions), [viewSetupHints](#viewSetupHints)||
|<span id="components">components</span>|Components definition containing selection, visibility, and coloring sections.||[coloring](#coloring), [selection](#selection), [visibility](#visibility)||
|<span id="direction">direction</span>|3D direction vector represented by X, Y, and Z components.||||
|<span id="document">document</span>|Document metadata entry with filename, description, and GUID.||||
|<span id="documentReference">documentReference</span>|Document reference class for either internal document GUID or external URL.|[documentGuid](#documentGuid), [url](#url)|||
|<span id="extensions">extensions</span>|Extension catalog holder.|[priorities](#priorities), [snippetTypes](#snippetTypes), [stages](#stages), [topicLabels](#topicLabels), [topicStatuses](#topicStatuses), [topicTypes](#topicTypes), [users](#users)|||
|<span id="file">file</span>|Referenced file metadata class in the markup header.|[ifcProject](#ifcProject), [ifcSpatialStructureElement](#ifcSpatialStructureElement)|||
|<span id="header">header</span>|Header section containing referenced files.||[file](#file)||
|<span id="line">line</span>|Line overlay defined by start and end points.||[endPoint](#endPoint), [startPoint](#startPoint)||
|<span id="markup">markup</span>|Main BCF markup class containing header and topic.||[header](#header), [topic](#topic)||
|<span id="orthogonalCamera">orthogonalCamera</span>|Orthogonal camera definition.|[viewToWorldScale](#viewToWorldScale)|||
|<span id="perspectiveCamera">perspectiveCamera</span>|Perspective camera definition.|[fieldOfView](#fieldOfView)|||
|<span id="point">point</span>|3D point represented by X, Y, and Z coordinates.||||
|<span id="project">project</span>|Project details with project ID and optional name.|[name](#name), [projectId](#projectId)|||
|<span id="projectInfo">projectInfo</span>|Project information wrapper.||[project](#project)||
|<span id="relatedTopicRef">relatedTopicRef</span>|Reference class identifying a related topic by GUID.||||
|<span id="topic">topic</span>|Core issue/topic class with metadata, workflow state, comments, and viewpoints.|[assignedTo](#assignedTo), [creationAuthor](#creationAuthor), [creationDate](#creationDate), [dueDate](#dueDate), [labels](#labels), [priority](#priority), [referenceLinks](#referenceLinks), [serverAssignedId](#serverAssignedId), [stage](#stage), [title](#title), [topicStatus](#topicStatus), [topicType](#topicType)|[bimSnippet](#bimSnippet), [comments](#comments), [documentReferences](#documentReferences), [relatedTopics](#relatedTopics), [viewpoints](#viewpoints)||
|<span id="version">version</span>|Version payload with required version identifier.|[versionId](#versionId)|||
|<span id="viewPoint">viewPoint</span>|Viewpoint resource with viewpoint file, snapshot, index, and GUID.|[snapshot](#snapshot), [viewpointFile](#viewpointFile)|||
|<span id="viewSetupHints">viewSetupHints</span>|Viewer hints for visibility of spaces, boundaries, and openings.|[openingsVisible](#openingsVisible), [spaceBoundariesVisible](#spaceBoundariesVisible), [spacesVisible](#spacesVisible)|||
|<span id="visualizationInfo">visualizationInfo</span>|Visualization payload including camera configuration and overlays.||[bitmaps](#bitmaps), [clippingPlanes](#clippingPlanes), [lines](#lines), [orthogonalCamera](#orthogonalCamera), [perspectiveCamera](#perspectiveCamera)||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b1">nd2f3f6d31c8e4974a341f7c032c94043b1</span>|||[components](#components)||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b10">nd2f3f6d31c8e4974a341f7c032c94043b10</span>|||[cameraDirection](#cameraDirection)||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b13">nd2f3f6d31c8e4974a341f7c032c94043b13</span>|||[cameraUpVector](#cameraUpVector)||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b16">nd2f3f6d31c8e4974a341f7c032c94043b16</span>|||[location](#location)||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b19">nd2f3f6d31c8e4974a341f7c032c94043b19</span>||[filename](#filename)|||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b22">nd2f3f6d31c8e4974a341f7c032c94043b22</span>||[description](#description)|||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b26">nd2f3f6d31c8e4974a341f7c032c94043b26</span>||[index](#index)|||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b29">nd2f3f6d31c8e4974a341f7c032c94043b29</span>||[modifiedDate](#modifiedDate)|||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b32">nd2f3f6d31c8e4974a341f7c032c94043b32</span>||[modifiedAuthor](#modifiedAuthor)|||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b35">nd2f3f6d31c8e4974a341f7c032c94043b35</span>||[reference](#reference)|||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b39">nd2f3f6d31c8e4974a341f7c032c94043b39</span>||[isExternal](#isExternal)|||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b4">nd2f3f6d31c8e4974a341f7c032c94043b4</span>|||||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b42">nd2f3f6d31c8e4974a341f7c032c94043b42</span>||[date](#date)|||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b45">nd2f3f6d31c8e4974a341f7c032c94043b45</span>||[aspectRatio](#aspectRatio)|||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b48">nd2f3f6d31c8e4974a341f7c032c94043b48</span>||[x](#x)|||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b51">nd2f3f6d31c8e4974a341f7c032c94043b51</span>||[y](#y)|||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b54">nd2f3f6d31c8e4974a341f7c032c94043b54</span>||[z](#z)|||
|<span id="nd2f3f6d31c8e4974a341f7c032c94043b7">nd2f3f6d31c8e4974a341f7c032c94043b7</span>|||[cameraViewPoint](#cameraViewPoint)||

## Data Properties

|Name|Description|Domain|Range|Subproperty of|
| :--- | :--- | :--- | :--- | :--- |
|<span id="aspectRatio">aspectRatio</span>|Width/height aspect ratio of the camera view.|[nd2f3f6d31c8e4974a341f7c032c94043b45](#nd2f3f6d31c8e4974a341f7c032c94043b45)|double||
|<span id="assignedTo">assignedTo</span>|Assignee identifier for the topic.|[topic](#topic)|string||
|<span id="author">author</span>|Author identifier for a comment entry.|[comment](#comment)|string|author|
|<span id="authoringToolId">authoringToolId</span>|Identifier of the component in the authoring tool.|[component](#component)|string|identifier, identifier|
|<span id="colorValue">colorValue</span>|Hexadecimal RGB or RGBA color value used in a coloring rule.|[coloringEntry](#coloringEntry)|string||
|<span id="commentText">commentText</span>|Textual body of a comment entry.|[comment](#comment)|string|text|
|<span id="creationAuthor">creationAuthor</span>|Author who created the topic.|[topic](#topic)|string|creator, author|
|<span id="creationDate">creationDate</span>|Timestamp when the topic was created.|[topic](#topic)|dateTime|dateCreated, created|
|<span id="date">date</span>|Timestamp associated with a file or comment entry.|[nd2f3f6d31c8e4974a341f7c032c94043b42](#nd2f3f6d31c8e4974a341f7c032c94043b42)|dateTime||
|<span id="defaultVisibility">defaultVisibility</span>|Default visibility state for components in a viewpoint.|[componentVisibility](#componentVisibility)|boolean||
|<span id="description">description</span>|Human-readable description text.|[nd2f3f6d31c8e4974a341f7c032c94043b22](#nd2f3f6d31c8e4974a341f7c032c94043b22)|string|description, description|
|<span id="documentGuid">documentGuid</span>|GUID of an internal document referenced by a topic.|[documentReference](#documentReference)|string|identifier, identifier|
|<span id="dueDate">dueDate</span>|Requested due date for the topic.|[topic](#topic)|dateTime||
|<span id="fieldOfView">fieldOfView</span>|Vertical field of view angle in degrees for perspective camera.|[perspectiveCamera](#perspectiveCamera)|double||
|<span id="filename">filename</span>|Filename associated with a document or file entry.|[nd2f3f6d31c8e4974a341f7c032c94043b19](#nd2f3f6d31c8e4974a341f7c032c94043b19)|string|name|
|<span id="format">format</span>|Bitmap image format (for example, png or jpg).|[bitmap](#bitmap)|string|fileFormat, format|
|<span id="guid">guid</span>|Globally unique identifier represented as text.|[Thing](#Thing)|string|identifier, identifier|
|<span id="height">height</span>|Height of the bitmap overlay in world units.|[bitmap](#bitmap)|double|height|
|<span id="ifcGuid">ifcGuid</span>|IFC GUID of the component.|[component](#component)|string|identifier, identifier|
|<span id="ifcProject">ifcProject</span>|IFC project GUID associated with a file entry.|[file](#file)|string|identifier, identifier|
|<span id="ifcSpatialStructureElement">ifcSpatialStructureElement</span>|IFC spatial structure element GUID associated with a file entry.|[file](#file)|string|identifier, identifier|
|<span id="index">index</span>|Integer sort/index value for topic or viewpoint.|[nd2f3f6d31c8e4974a341f7c032c94043b26](#nd2f3f6d31c8e4974a341f7c032c94043b26)|int|position|
|<span id="isExternal">isExternal</span>|Indicates whether a referenced resource is external to the BCF package.|[nd2f3f6d31c8e4974a341f7c032c94043b39](#nd2f3f6d31c8e4974a341f7c032c94043b39)|boolean||
|<span id="labels">labels</span>|Label attached directly to a topic.|[topic](#topic)|string|keywords, subject|
|<span id="modifiedAuthor">modifiedAuthor</span>|Author of the latest modification.|[nd2f3f6d31c8e4974a341f7c032c94043b32](#nd2f3f6d31c8e4974a341f7c032c94043b32)|string|author|
|<span id="modifiedDate">modifiedDate</span>|Timestamp of the latest modification.|[nd2f3f6d31c8e4974a341f7c032c94043b29](#nd2f3f6d31c8e4974a341f7c032c94043b29)|dateTime|dateModified, modified|
|<span id="name">name</span>|Human-readable name of the project.|[project](#project)|string|name|
|<span id="openingsVisible">openingsVisible</span>|Viewer hint indicating whether openings are visible.|[viewSetupHints](#viewSetupHints)|boolean||
|<span id="originatingSystem">originatingSystem</span>|Name of the source system for a component reference.|[component](#component)|string||
|<span id="priorities">priorities</span>|Priority value available in extensions.|[extensions](#extensions)|string||
|<span id="priority">priority</span>|Priority value used in a topic.|[topic](#topic)|string||
|<span id="projectId">projectId</span>|Identifier for the project.|[project](#project)|string|identifier, identifier|
|<span id="reference">reference</span>|Reference string (filename, URI, or path) used by snippets, files, and bitmaps.|[nd2f3f6d31c8e4974a341f7c032c94043b35](#nd2f3f6d31c8e4974a341f7c032c94043b35)|string|contentUrl|
|<span id="referenceLinks">referenceLinks</span>|External reference URL associated with a topic.|[topic](#topic)|string|url, references|
|<span id="referenceSchema">referenceSchema</span>|Schema identifier associated with a BIM snippet.|[bimSnippet](#bimSnippet)|string||
|<span id="serverAssignedId">serverAssignedId</span>|Server-assigned topic identifier.|[topic](#topic)|string|identifier, identifier|
|<span id="snapshot">snapshot</span>|Snapshot image filename associated with a viewpoint.|[viewPoint](#viewPoint)|string|image, contentUrl|
|<span id="snippetTypes">snippetTypes</span>|Snippet type value available in extensions.|[extensions](#extensions)|string|type|
|<span id="spaceBoundariesVisible">spaceBoundariesVisible</span>|Viewer hint indicating whether space boundaries are visible.|[viewSetupHints](#viewSetupHints)|boolean||
|<span id="spacesVisible">spacesVisible</span>|Viewer hint indicating whether spaces are visible.|[viewSetupHints](#viewSetupHints)|boolean||
|<span id="stage">stage</span>|Stage value used in a topic.|[topic](#topic)|string||
|<span id="stages">stages</span>|Stage value available in extensions.|[extensions](#extensions)|string||
|<span id="title">title</span>|Short human-readable title of a topic.|[topic](#topic)|string|name, title|
|<span id="topicLabels">topicLabels</span>|Topic label value available in extensions.|[extensions](#extensions)|string|keywords, subject|
|<span id="topicStatus">topicStatus</span>|Topic status value used in a topic.|[topic](#topic)|string||
|<span id="topicStatuses">topicStatuses</span>|Topic status value available in extensions.|[extensions](#extensions)|string||
|<span id="topicType">topicType</span>|Topic type value used in a topic.|[topic](#topic)|string|type|
|<span id="topicTypes">topicTypes</span>|Topic type value available in extensions.|[extensions](#extensions)|string|type|
|<span id="url">url</span>|URL of an external document referenced by a topic.|[documentReference](#documentReference)|string|url, references|
|<span id="users">users</span>|User identifier value available in extensions.|[extensions](#extensions)|string||
|<span id="versionId">versionId</span>|Version identifier string for BCF payload.|[version](#version)|string|identifier, identifier|
|<span id="viewToWorldScale">viewToWorldScale</span>|Visible vertical size in world units for orthogonal camera.|[orthogonalCamera](#orthogonalCamera)|double||
|<span id="viewpointFile">viewpointFile</span>|Filename or path of the viewpoint file associated with a viewpoint resource.|[viewPoint](#viewPoint)|string|contentUrl|
|<span id="x">x</span>|X coordinate component.|[nd2f3f6d31c8e4974a341f7c032c94043b48](#nd2f3f6d31c8e4974a341f7c032c94043b48)|double||
|<span id="y">y</span>|Y coordinate component.|[nd2f3f6d31c8e4974a341f7c032c94043b51](#nd2f3f6d31c8e4974a341f7c032c94043b51)|double||
|<span id="z">z</span>|Z coordinate component.|[nd2f3f6d31c8e4974a341f7c032c94043b54](#nd2f3f6d31c8e4974a341f7c032c94043b54)|double||

## Object Properties

|Name|Descriptions|Domain|Range|Subproperty of|
| :--- | :--- | :--- | :--- | :--- |
|<span id="bimSnippet">bimSnippet</span>|BIM snippet metadata containing reference and schema details. Links topic to its BIM snippet description.|[topic](#topic)|[bimSnippet](#bimSnippet)||
|<span id="bitmaps">bitmaps</span>|Links visualization info directly to bitmap entries.|[visualizationInfo](#visualizationInfo)|[bitmap](#bitmap)||
|<span id="cameraDirection">cameraDirection</span>|Camera forward direction vector.|[nd2f3f6d31c8e4974a341f7c032c94043b10](#nd2f3f6d31c8e4974a341f7c032c94043b10)|[direction](#direction)||
|<span id="cameraUpVector">cameraUpVector</span>|Camera up direction vector.|[nd2f3f6d31c8e4974a341f7c032c94043b13](#nd2f3f6d31c8e4974a341f7c032c94043b13)|[direction](#direction)||
|<span id="cameraViewPoint">cameraViewPoint</span>|Camera position in 3D space.|[nd2f3f6d31c8e4974a341f7c032c94043b7](#nd2f3f6d31c8e4974a341f7c032c94043b7)|[point](#point)||
|<span id="clippingPlanes">clippingPlanes</span>|Links visualization info directly to clipping plane entries.|[visualizationInfo](#visualizationInfo)|[clippingPlane](#clippingPlane)||
|<span id="coloring">coloring</span>|Links components directly to coloring entries.|[components](#components)|[coloringEntry](#coloringEntry)||
|<span id="comments">comments</span>|Links a topic directly to comment entries.|[topic](#topic)|[comment](#comment)||
|<span id="components">components</span>|Components definition containing selection, visibility, and coloring sections. Links visualization info or a coloring entry to components according to the SHACL model.|[nd2f3f6d31c8e4974a341f7c032c94043b1](#nd2f3f6d31c8e4974a341f7c032c94043b1)|[nd2f3f6d31c8e4974a341f7c032c94043b4](#nd2f3f6d31c8e4974a341f7c032c94043b4)||
|<span id="direction">direction</span>|3D direction vector represented by X, Y, and Z components. Normal direction of a clipping plane.|[clippingPlane](#clippingPlane)|[direction](#direction)||
|<span id="documentReferences">documentReferences</span>|Links a topic directly to document reference entries.|[topic](#topic)|[documentReference](#documentReference)||
|<span id="documents">documents</span>|Links a BCF model directly to document entries.|[bcfModel](#bcfModel)|[document](#document)||
|<span id="endPoint">endPoint</span>|End point of a line segment.|[line](#line)|[point](#point)||
|<span id="exceptions">exceptions</span>|Links component visibility directly to exception components.|[componentVisibility](#componentVisibility)|[component](#component)||
|<span id="extensions">extensions</span>|Extension catalog holder. Links a BCF model to extension values.|[bcfModel](#bcfModel)|[extensions](#extensions)||
|<span id="file">file</span>|Referenced file metadata class in the markup header. Links a header directly to file entries.|[header](#header)|[file](#file)||
|<span id="header">header</span>|Header section containing referenced files. Links markup to optional header information.|[markup](#markup)|[header](#header)||
|<span id="lines">lines</span>|Links visualization info directly to line entries.|[visualizationInfo](#visualizationInfo)|[line](#line)||
|<span id="location">location</span>|3D location used by clipping planes and bitmap placement.|[nd2f3f6d31c8e4974a341f7c032c94043b16](#nd2f3f6d31c8e4974a341f7c032c94043b16)|[point](#point)||
|<span id="markup">markup</span>|Main BCF markup class containing header and topic. Links a BCF model to its main markup content.|[bcfModel](#bcfModel)|[markup](#markup)||
|<span id="normal">normal</span>|Normal vector of a bitmap overlay plane.|[bitmap](#bitmap)|[direction](#direction)||
|<span id="orthogonalCamera">orthogonalCamera</span>|Orthogonal camera definition. Associates visualization info with an orthogonal camera definition.|[visualizationInfo](#visualizationInfo)|[orthogonalCamera](#orthogonalCamera)||
|<span id="perspectiveCamera">perspectiveCamera</span>|Perspective camera definition. Associates visualization info with a perspective camera definition.|[visualizationInfo](#visualizationInfo)|[perspectiveCamera](#perspectiveCamera)||
|<span id="project">project</span>|Project details with project ID and optional name. Links project info to the concrete project descriptor.|[projectInfo](#projectInfo)|[project](#project)||
|<span id="projectInfo">projectInfo</span>|Project information wrapper. Links a BCF model to the project information section.|[bcfModel](#bcfModel)|[projectInfo](#projectInfo)||
|<span id="relatedTopics">relatedTopics</span>|Links a topic directly to related topic references.|[topic](#topic)|[relatedTopicRef](#relatedTopicRef)||
|<span id="selection">selection</span>|Links components directly to selected components.|[components](#components)|[component](#component)||
|<span id="startPoint">startPoint</span>|Start point of a line segment.|[line](#line)|[point](#point)||
|<span id="topic">topic</span>|Core issue/topic class with metadata, workflow state, comments, and viewpoints. Links markup to its main topic issue payload.|[markup](#markup)|[topic](#topic)||
|<span id="up">up</span>|Up vector of a bitmap overlay plane.|[bitmap](#bitmap)|[direction](#direction)||
|<span id="version">version</span>|Version payload with required version identifier. Links a BCF model to its declared version payload.|[bcfModel](#bcfModel)|[version](#version)||
|<span id="viewSetupHints">viewSetupHints</span>|Viewer hints for visibility of spaces, boundaries, and openings. Viewer hints for spaces, openings, and boundaries.|[componentVisibility](#componentVisibility)|[viewSetupHints](#viewSetupHints)||
|<span id="viewpoint">viewpoint</span>|Links a comment to a referenced viewpoint.|[comment](#comment)|[commentViewpointRef](#commentViewpointRef)||
|<span id="viewpoints">viewpoints</span>|Links a topic directly to viewpoint entries.|[topic](#topic)|[viewPoint](#viewPoint)||
|<span id="visibility">visibility</span>|Visibility rules for components within a viewpoint.|[components](#components)|[componentVisibility](#componentVisibility)||
|<span id="visualizationInfo">visualizationInfo</span>|Visualization payload including camera configuration and overlays. Links a BCF model to viewpoint visualization information.|[bcfModel](#bcfModel)|[visualizationInfo](#visualizationInfo)||
