# bim-bcf copy Ontology

- **Version:** 0.1
- **Link to ontology:** [ontology/v0.1/bim-bcf copy.ttl](https://blue-room-innovation.github.io/bri-ontology/ontology/v0.1/bim-bcf%20copy.ttl)

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
   class bitmaps{
   }
   class clippingPlane{
   }
   class clippingPlanes{
   }
   class colorComponents{
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
   class comments{
   }
   class component{
       authoringToolId string
       ifcGuid string
       originatingSystem string
   }
   class componentColoring{
   }
   class componentSelection{
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
   class documentInfo{
   }
   class documentReference{
       documentGuid string
       url string
   }
   class documentReferences{
   }
   class documentsContainer{
   }
   class exceptions{
   }
   class extensions{
   }
   class file{
       ifcProject string
       ifcSpatialStructureElement string
   }
   class filesContainer{
   }
   class header{
   }
   class labels{
       label string
   }
   class line{
   }
   class lines{
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
   class priorities{
   }
   class project{
       name string
       projectId string
   }
   class projectInfo{
   }
   class referenceLinks{
       referenceLink string
   }
   class relatedTopicRef{
   }
   class relatedTopics{
   }
   class snippetTypes{
   }
   class stages{
   }
   class topic{
       assignedTo string
       creationAuthor string
       creationDate dateTime
       dueDate dateTime
       serverAssignedId string
       title string
   }
   class topicLabels{
       topicLabel string
   }
   class topicStatuses{
   }
   class topicTypes{
   }
   class users{
       user string
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
   class viewpoints{
   }
   class visualizationInfo{
   }
   class n528d39ce95614b6290e1532610d0bb8db1{
   }
   class n528d39ce95614b6290e1532610d0bb8db10{
   }
   class n528d39ce95614b6290e1532610d0bb8db13{
   }
   class n528d39ce95614b6290e1532610d0bb8db16{
   }
   class n528d39ce95614b6290e1532610d0bb8db20{
   }
   class n528d39ce95614b6290e1532610d0bb8db23{
       filename string
   }
   class n528d39ce95614b6290e1532610d0bb8db26{
       description string
   }
   class n528d39ce95614b6290e1532610d0bb8db30{
       topicType string
   }
   class n528d39ce95614b6290e1532610d0bb8db33{
       topicStatus string
   }
   class n528d39ce95614b6290e1532610d0bb8db36{
       priority string
   }
   class n528d39ce95614b6290e1532610d0bb8db39{
       snippetType string
   }
   class n528d39ce95614b6290e1532610d0bb8db4{
   }
   class n528d39ce95614b6290e1532610d0bb8db42{
       stage string
   }
   class n528d39ce95614b6290e1532610d0bb8db45{
       index int
   }
   class n528d39ce95614b6290e1532610d0bb8db48{
       modifiedDate dateTime
   }
   class n528d39ce95614b6290e1532610d0bb8db51{
       modifiedAuthor string
   }
   class n528d39ce95614b6290e1532610d0bb8db54{
       reference string
   }
   class n528d39ce95614b6290e1532610d0bb8db58{
       isExternal boolean
   }
   class n528d39ce95614b6290e1532610d0bb8db61{
       date dateTime
   }
   class n528d39ce95614b6290e1532610d0bb8db64{
       aspectRatio double
   }
   class n528d39ce95614b6290e1532610d0bb8db67{
       x double
   }
   class n528d39ce95614b6290e1532610d0bb8db7{
   }
   class n528d39ce95614b6290e1532610d0bb8db70{
       y double
   }
   class n528d39ce95614b6290e1532610d0bb8db73{
       z double
   }
   topic --> bimSnippet : bimSnippet
   bitmaps --> bitmap : bitmap
   visualizationInfo --> bitmaps : bitmaps
   n528d39ce95614b6290e1532610d0bb8db10 --> direction : cameraDirection
   n528d39ce95614b6290e1532610d0bb8db13 --> direction : cameraUpVector
   n528d39ce95614b6290e1532610d0bb8db7 --> point : cameraViewPoint
   clippingPlanes --> clippingPlane : clippingPlane
   visualizationInfo --> clippingPlanes : clippingPlanes
   componentColoring --> coloringEntry : color
   components --> componentColoring : coloring
   comments --> comment : comment
   topic --> comments : comments
   n528d39ce95614b6290e1532610d0bb8db16 --> component : component
   n528d39ce95614b6290e1532610d0bb8db1 --> n528d39ce95614b6290e1532610d0bb8db4 : components
   clippingPlane --> direction : direction
   documentsContainer --> document : document
   bcfModel --> documentInfo : documentInfo
   documentReferences --> documentReference : documentReference
   topic --> documentReferences : documentReferences
   documentInfo --> documentsContainer : documents
   line --> point : endPoint
   componentVisibility --> exceptions : exceptions
   bcfModel --> extensions : extensions
   filesContainer --> file : file
   header --> filesContainer : files
   markup --> header : header
   topic --> labels : labels
   lines --> line : line
   visualizationInfo --> lines : lines
   n528d39ce95614b6290e1532610d0bb8db20 --> point : location
   bcfModel --> markup : markup
   bitmap --> direction : normal
   visualizationInfo --> orthogonalCamera : orthogonalCamera
   visualizationInfo --> perspectiveCamera : perspectiveCamera
   extensions --> priorities : priorities
   projectInfo --> project : project
   bcfModel --> projectInfo : projectInfo
   topic --> referenceLinks : referenceLinks
   relatedTopics --> relatedTopicRef : relatedTopic
   topic --> relatedTopics : relatedTopics
   components --> componentSelection : selection
   extensions --> snippetTypes : snippetTypes
   extensions --> stages : stages
   line --> point : startPoint
   markup --> topic : topic
   extensions --> topicLabels : topicLabels
   extensions --> topicStatuses : topicStatuses
   extensions --> topicTypes : topicTypes
   bitmap --> direction : up
   extensions --> users : users
   bcfModel --> version : version
   viewpoints --> viewPoint : viewPoint
   componentVisibility --> viewSetupHints : viewSetupHints
   comment --> commentViewpointRef : viewpoint
   topic --> viewpoints : viewpoints
   components --> componentVisibility : visibility
   bcfModel --> visualizationInfo : visualizationInfo
```

## Classes

|Name|Description|Datatype properties|Object properties|Subclass of|
| :--- | :--- | :--- | :--- | :--- |
|<span id="bcfModel">bcfModel</span>|Root container class for BIM BCF model resources.||[documentInfo](#documentInfo), [extensions](#extensions), [markup](#markup), [projectInfo](#projectInfo), [version](#version), [visualizationInfo](#visualizationInfo)||
|<span id="bimSnippet">bimSnippet</span>|BIM snippet metadata containing reference and schema details.|[referenceSchema](#referenceSchema)|||
|<span id="bitmap">bitmap</span>|Bitmap overlay with placement, orientation, format, and size.|[format](#format), [height](#height)|[normal](#normal), [up](#up)||
|<span id="bitmaps">bitmaps</span>|Collection class for bitmap overlays.||[bitmap](#bitmap)||
|<span id="clippingPlane">clippingPlane</span>|Clipping plane defined by location and direction.||[direction](#direction)||
|<span id="clippingPlanes">clippingPlanes</span>|Collection class for clipping planes.||[clippingPlane](#clippingPlane)||
|<span id="colorComponents">colorComponents</span>|Set of components affected by a single color rule.||||
|<span id="coloringEntry">coloringEntry</span>|Single color rule entry linking components and a color value.|[colorValue](#colorValue)|||
|<span id="comment">comment</span>|Comment resource with authoring and modification metadata.|[author](#author), [commentText](#commentText)|[viewpoint](#viewpoint)||
|<span id="commentViewpointRef">commentViewpointRef</span>|Reference from comment to a viewpoint identified by GUID.||||
|<span id="comments">comments</span>|Collection class for comment entries.||[comment](#comment)||
|<span id="component">component</span>|IFC component reference with optional originating system metadata.|[authoringToolId](#authoringToolId), [ifcGuid](#ifcGuid), [originatingSystem](#originatingSystem)|||
|<span id="componentColoring">componentColoring</span>|Collection of component coloring entries.||[color](#color)||
|<span id="componentSelection">componentSelection</span>|Collection of selected components.||||
|<span id="componentVisibility">componentVisibility</span>|Default visibility and exception settings for components.|[defaultVisibility](#defaultVisibility)|[exceptions](#exceptions), [viewSetupHints](#viewSetupHints)||
|<span id="components">components</span>|Components definition containing selection, visibility, and coloring sections.||[coloring](#coloring), [selection](#selection), [visibility](#visibility)||
|<span id="direction">direction</span>|3D direction vector represented by X, Y, and Z components.||||
|<span id="document">document</span>|Document metadata entry with filename, description, and GUID.||||
|<span id="documentInfo">documentInfo</span>|Container class for document metadata.||[documents](#documents)||
|<span id="documentReference">documentReference</span>|Document reference class for either internal document GUID or external URL.|[documentGuid](#documentGuid), [url](#url)|||
|<span id="documentReferences">documentReferences</span>|Collection class for document references.||[documentReference](#documentReference)||
|<span id="documentsContainer">documentsContainer</span>|Collection class that groups document entries.||[document](#document)||
|<span id="exceptions">exceptions</span>|Visibility exception list for components.||||
|<span id="extensions">extensions</span>|Container class for extension catalogs.||[priorities](#priorities), [snippetTypes](#snippetTypes), [stages](#stages), [topicLabels](#topicLabels), [topicStatuses](#topicStatuses), [topicTypes](#topicTypes), [users](#users)||
|<span id="file">file</span>|Referenced file metadata class in the markup header.|[ifcProject](#ifcProject), [ifcSpatialStructureElement](#ifcSpatialStructureElement)|||
|<span id="filesContainer">filesContainer</span>|Collection class for file entries.||[file](#file)||
|<span id="header">header</span>|Header section containing referenced files.||[files](#files)||
|<span id="labels">labels</span>|Collection class for topic labels.|[label](#label)|||
|<span id="line">line</span>|Line overlay defined by start and end points.||[endPoint](#endPoint), [startPoint](#startPoint)||
|<span id="lines">lines</span>|Collection class for line overlays.||[line](#line)||
|<span id="markup">markup</span>|Main BCF markup class containing header and topic.||[header](#header), [topic](#topic)||
|<span id="orthogonalCamera">orthogonalCamera</span>|Orthogonal camera definition.|[viewToWorldScale](#viewToWorldScale)|||
|<span id="perspectiveCamera">perspectiveCamera</span>|Perspective camera definition.|[fieldOfView](#fieldOfView)|||
|<span id="point">point</span>|3D point represented by X, Y, and Z coordinates.||||
|<span id="priorities">priorities</span>|Collection of priority literals.||||
|<span id="project">project</span>|Project details with project ID and optional name.|[name](#name), [projectId](#projectId)|||
|<span id="projectInfo">projectInfo</span>|Project information wrapper.||[project](#project)||
|<span id="referenceLinks">referenceLinks</span>|Collection class for topic reference links.|[referenceLink](#referenceLink)|||
|<span id="relatedTopicRef">relatedTopicRef</span>|Reference class identifying a related topic by GUID.||||
|<span id="relatedTopics">relatedTopics</span>|Collection class for links to related topics.||[relatedTopic](#relatedTopic)||
|<span id="snippetTypes">snippetTypes</span>|Collection of BIM snippet type literals.||||
|<span id="stages">stages</span>|Collection of stage literals.||||
|<span id="topic">topic</span>|Core issue/topic class with metadata, workflow state, comments, and viewpoints.|[assignedTo](#assignedTo), [creationAuthor](#creationAuthor), [creationDate](#creationDate), [dueDate](#dueDate), [serverAssignedId](#serverAssignedId), [title](#title)|[bimSnippet](#bimSnippet), [comments](#comments), [documentReferences](#documentReferences), [labels](#labels), [referenceLinks](#referenceLinks), [relatedTopics](#relatedTopics), [viewpoints](#viewpoints)||
|<span id="topicLabels">topicLabels</span>|Collection of topic label literals.|[topicLabel](#topicLabel)|||
|<span id="topicStatuses">topicStatuses</span>|Collection of topic status literals.||||
|<span id="topicTypes">topicTypes</span>|Collection of topic type literals.||||
|<span id="users">users</span>|Collection of user identifier literals.|[user](#user)|||
|<span id="version">version</span>|Version payload with required version identifier.|[versionId](#versionId)|||
|<span id="viewPoint">viewPoint</span>|Viewpoint resource with viewpoint file, snapshot, index, and GUID.|[snapshot](#snapshot), [viewpointFile](#viewpointFile)|||
|<span id="viewSetupHints">viewSetupHints</span>|Viewer hints for visibility of spaces, boundaries, and openings.|[openingsVisible](#openingsVisible), [spaceBoundariesVisible](#spaceBoundariesVisible), [spacesVisible](#spacesVisible)|||
|<span id="viewpoints">viewpoints</span>|Collection class for viewpoint entries.||[viewPoint](#viewPoint)||
|<span id="visualizationInfo">visualizationInfo</span>|Visualization payload including camera configuration and overlays.||[bitmaps](#bitmaps), [clippingPlanes](#clippingPlanes), [lines](#lines), [orthogonalCamera](#orthogonalCamera), [perspectiveCamera](#perspectiveCamera)||
|<span id="n528d39ce95614b6290e1532610d0bb8db1">n528d39ce95614b6290e1532610d0bb8db1</span>|||[components](#components)||
|<span id="n528d39ce95614b6290e1532610d0bb8db10">n528d39ce95614b6290e1532610d0bb8db10</span>|||[cameraDirection](#cameraDirection)||
|<span id="n528d39ce95614b6290e1532610d0bb8db13">n528d39ce95614b6290e1532610d0bb8db13</span>|||[cameraUpVector](#cameraUpVector)||
|<span id="n528d39ce95614b6290e1532610d0bb8db16">n528d39ce95614b6290e1532610d0bb8db16</span>|||[component](#component)||
|<span id="n528d39ce95614b6290e1532610d0bb8db20">n528d39ce95614b6290e1532610d0bb8db20</span>|||[location](#location)||
|<span id="n528d39ce95614b6290e1532610d0bb8db23">n528d39ce95614b6290e1532610d0bb8db23</span>||[filename](#filename)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db26">n528d39ce95614b6290e1532610d0bb8db26</span>||[description](#description)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db30">n528d39ce95614b6290e1532610d0bb8db30</span>||[topicType](#topicType)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db33">n528d39ce95614b6290e1532610d0bb8db33</span>||[topicStatus](#topicStatus)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db36">n528d39ce95614b6290e1532610d0bb8db36</span>||[priority](#priority)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db39">n528d39ce95614b6290e1532610d0bb8db39</span>||[snippetType](#snippetType)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db4">n528d39ce95614b6290e1532610d0bb8db4</span>|||||
|<span id="n528d39ce95614b6290e1532610d0bb8db42">n528d39ce95614b6290e1532610d0bb8db42</span>||[stage](#stage)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db45">n528d39ce95614b6290e1532610d0bb8db45</span>||[index](#index)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db48">n528d39ce95614b6290e1532610d0bb8db48</span>||[modifiedDate](#modifiedDate)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db51">n528d39ce95614b6290e1532610d0bb8db51</span>||[modifiedAuthor](#modifiedAuthor)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db54">n528d39ce95614b6290e1532610d0bb8db54</span>||[reference](#reference)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db58">n528d39ce95614b6290e1532610d0bb8db58</span>||[isExternal](#isExternal)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db61">n528d39ce95614b6290e1532610d0bb8db61</span>||[date](#date)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db64">n528d39ce95614b6290e1532610d0bb8db64</span>||[aspectRatio](#aspectRatio)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db67">n528d39ce95614b6290e1532610d0bb8db67</span>||[x](#x)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db7">n528d39ce95614b6290e1532610d0bb8db7</span>|||[cameraViewPoint](#cameraViewPoint)||
|<span id="n528d39ce95614b6290e1532610d0bb8db70">n528d39ce95614b6290e1532610d0bb8db70</span>||[y](#y)|||
|<span id="n528d39ce95614b6290e1532610d0bb8db73">n528d39ce95614b6290e1532610d0bb8db73</span>||[z](#z)|||

## Data Properties

|Name|Description|Domain|Range|Subproperty of|
| :--- | :--- | :--- | :--- | :--- |
|<span id="aspectRatio">aspectRatio</span>|Width/height aspect ratio of the camera view.|[n528d39ce95614b6290e1532610d0bb8db64](#n528d39ce95614b6290e1532610d0bb8db64)|double||
|<span id="assignedTo">assignedTo</span>|Assignee identifier for the topic.|[topic](#topic)|string||
|<span id="author">author</span>|Author identifier for a comment entry.|[comment](#comment)|string|author|
|<span id="authoringToolId">authoringToolId</span>|Identifier of the component in the authoring tool.|[component](#component)|string|identifier, identifier|
|<span id="colorValue">colorValue</span>|Hexadecimal RGB or RGBA color value used in a coloring rule.|[coloringEntry](#coloringEntry)|string||
|<span id="commentText">commentText</span>|Textual body of a comment entry.|[comment](#comment)|string|text|
|<span id="creationAuthor">creationAuthor</span>|Author who created the topic.|[topic](#topic)|string|creator, author|
|<span id="creationDate">creationDate</span>|Timestamp when the topic was created.|[topic](#topic)|dateTime|dateCreated, created|
|<span id="date">date</span>|Timestamp associated with a file or comment entry.|[n528d39ce95614b6290e1532610d0bb8db61](#n528d39ce95614b6290e1532610d0bb8db61)|dateTime||
|<span id="defaultVisibility">defaultVisibility</span>|Default visibility state for components in a viewpoint.|[componentVisibility](#componentVisibility)|boolean||
|<span id="description">description</span>|Human-readable description text.|[n528d39ce95614b6290e1532610d0bb8db26](#n528d39ce95614b6290e1532610d0bb8db26)|string|description, description|
|<span id="documentGuid">documentGuid</span>|GUID of an internal document referenced by a topic.|[documentReference](#documentReference)|string|identifier, identifier|
|<span id="dueDate">dueDate</span>|Requested due date for the topic.|[topic](#topic)|dateTime||
|<span id="fieldOfView">fieldOfView</span>|Vertical field of view angle in degrees for perspective camera.|[perspectiveCamera](#perspectiveCamera)|double||
|<span id="filename">filename</span>|Filename associated with a document or file entry.|[n528d39ce95614b6290e1532610d0bb8db23](#n528d39ce95614b6290e1532610d0bb8db23)|string|name|
|<span id="format">format</span>|Bitmap image format (for example, png or jpg).|[bitmap](#bitmap)|string|fileFormat, format|
|<span id="guid">guid</span>|Globally unique identifier represented as text.|[Thing](#Thing)|string|identifier, identifier|
|<span id="height">height</span>|Height of the bitmap overlay in world units.|[bitmap](#bitmap)|double|height|
|<span id="ifcGuid">ifcGuid</span>|IFC GUID of the component.|[component](#component)|string|identifier, identifier|
|<span id="ifcProject">ifcProject</span>|IFC project GUID associated with a file entry.|[file](#file)|string|identifier, identifier|
|<span id="ifcSpatialStructureElement">ifcSpatialStructureElement</span>|IFC spatial structure element GUID associated with a file entry.|[file](#file)|string|identifier, identifier|
|<span id="index">index</span>|Integer sort/index value for topic or viewpoint.|[n528d39ce95614b6290e1532610d0bb8db45](#n528d39ce95614b6290e1532610d0bb8db45)|int|position|
|<span id="isExternal">isExternal</span>|Indicates whether a referenced resource is external to the BCF package.|[n528d39ce95614b6290e1532610d0bb8db58](#n528d39ce95614b6290e1532610d0bb8db58)|boolean||
|<span id="label">label</span>|Single label attached to a topic.|[labels](#labels)|string|keywords, subject|
|<span id="modifiedAuthor">modifiedAuthor</span>|Author of the latest modification.|[n528d39ce95614b6290e1532610d0bb8db51](#n528d39ce95614b6290e1532610d0bb8db51)|string|author|
|<span id="modifiedDate">modifiedDate</span>|Timestamp of the latest modification.|[n528d39ce95614b6290e1532610d0bb8db48](#n528d39ce95614b6290e1532610d0bb8db48)|dateTime|dateModified, modified|
|<span id="name">name</span>|Human-readable name of the project.|[project](#project)|string|name|
|<span id="openingsVisible">openingsVisible</span>|Viewer hint indicating whether openings are visible.|[viewSetupHints](#viewSetupHints)|boolean||
|<span id="originatingSystem">originatingSystem</span>|Name of the source system for a component reference.|[component](#component)|string||
|<span id="priority">priority</span>|Priority value or catalog entry.|[n528d39ce95614b6290e1532610d0bb8db36](#n528d39ce95614b6290e1532610d0bb8db36)|string||
|<span id="projectId">projectId</span>|Identifier for the project.|[project](#project)|string|identifier, identifier|
|<span id="reference">reference</span>|Reference string (filename, URI, or path) used by snippets, files, and bitmaps.|[n528d39ce95614b6290e1532610d0bb8db54](#n528d39ce95614b6290e1532610d0bb8db54)|string|contentUrl|
|<span id="referenceLink">referenceLink</span>|External reference URL associated with a topic.|[referenceLinks](#referenceLinks)|string|url, references|
|<span id="referenceSchema">referenceSchema</span>|Schema identifier associated with a BIM snippet.|[bimSnippet](#bimSnippet)|string||
|<span id="serverAssignedId">serverAssignedId</span>|Server-assigned topic identifier.|[topic](#topic)|string|identifier, identifier|
|<span id="snapshot">snapshot</span>|Snapshot image filename associated with a viewpoint.|[viewPoint](#viewPoint)|string|image, contentUrl|
|<span id="snippetType">snippetType</span>|Snippet type value used in topic snippets and extension catalogs.|[n528d39ce95614b6290e1532610d0bb8db39](#n528d39ce95614b6290e1532610d0bb8db39)|string|type|
|<span id="spaceBoundariesVisible">spaceBoundariesVisible</span>|Viewer hint indicating whether space boundaries are visible.|[viewSetupHints](#viewSetupHints)|boolean||
|<span id="spacesVisible">spacesVisible</span>|Viewer hint indicating whether spaces are visible.|[viewSetupHints](#viewSetupHints)|boolean||
|<span id="stage">stage</span>|Stage value used in topics and extension catalogs.|[n528d39ce95614b6290e1532610d0bb8db42](#n528d39ce95614b6290e1532610d0bb8db42)|string||
|<span id="title">title</span>|Short human-readable title of a topic.|[topic](#topic)|string|name, title|
|<span id="topicLabel">topicLabel</span>|Single label value available in extension catalogs.|[topicLabels](#topicLabels)|string|keywords, subject|
|<span id="topicStatus">topicStatus</span>|Topic status value or catalog entry.|[n528d39ce95614b6290e1532610d0bb8db33](#n528d39ce95614b6290e1532610d0bb8db33)|string||
|<span id="topicType">topicType</span>|Topic type value or catalog entry.|[n528d39ce95614b6290e1532610d0bb8db30](#n528d39ce95614b6290e1532610d0bb8db30)|string|type|
|<span id="url">url</span>|URL of an external document referenced by a topic.|[documentReference](#documentReference)|string|url, references|
|<span id="user">user</span>|Single user value available in extension catalogs.|[users](#users)|string||
|<span id="versionId">versionId</span>|Version identifier string for BCF payload.|[version](#version)|string|identifier, identifier|
|<span id="viewToWorldScale">viewToWorldScale</span>|Visible vertical size in world units for orthogonal camera.|[orthogonalCamera](#orthogonalCamera)|double||
|<span id="viewpointFile">viewpointFile</span>|Filename or path of the viewpoint file associated with a viewpoint resource.|[viewPoint](#viewPoint)|string|contentUrl|
|<span id="x">x</span>|X coordinate component.|[n528d39ce95614b6290e1532610d0bb8db67](#n528d39ce95614b6290e1532610d0bb8db67)|double||
|<span id="y">y</span>|Y coordinate component.|[n528d39ce95614b6290e1532610d0bb8db70](#n528d39ce95614b6290e1532610d0bb8db70)|double||
|<span id="z">z</span>|Z coordinate component.|[n528d39ce95614b6290e1532610d0bb8db73](#n528d39ce95614b6290e1532610d0bb8db73)|double||

## Object Properties

|Name|Descriptions|Domain|Range|Subproperty of|
| :--- | :--- | :--- | :--- | :--- |
|<span id="bimSnippet">bimSnippet</span>|BIM snippet metadata containing reference and schema details. Links topic to its BIM snippet description.|[topic](#topic)|[bimSnippet](#bimSnippet)||
|<span id="bitmap">bitmap</span>|Bitmap overlay with placement, orientation, format, and size. References individual bitmap overlay entries.|[bitmaps](#bitmaps)|[bitmap](#bitmap)||
|<span id="bitmaps">bitmaps</span>|Collection class for bitmap overlays. Associates visualization info with bitmap overlays.|[visualizationInfo](#visualizationInfo)|[bitmaps](#bitmaps)||
|<span id="cameraDirection">cameraDirection</span>|Camera forward direction vector.|[n528d39ce95614b6290e1532610d0bb8db10](#n528d39ce95614b6290e1532610d0bb8db10)|[direction](#direction)||
|<span id="cameraUpVector">cameraUpVector</span>|Camera up direction vector.|[n528d39ce95614b6290e1532610d0bb8db13](#n528d39ce95614b6290e1532610d0bb8db13)|[direction](#direction)||
|<span id="cameraViewPoint">cameraViewPoint</span>|Camera position in 3D space.|[n528d39ce95614b6290e1532610d0bb8db7](#n528d39ce95614b6290e1532610d0bb8db7)|[point](#point)||
|<span id="clippingPlane">clippingPlane</span>|Clipping plane defined by location and direction. References individual clipping plane entries.|[clippingPlanes](#clippingPlanes)|[clippingPlane](#clippingPlane)||
|<span id="clippingPlanes">clippingPlanes</span>|Collection class for clipping planes. Associates visualization info with clipping plane definitions.|[visualizationInfo](#visualizationInfo)|[clippingPlanes](#clippingPlanes)||
|<span id="color">color</span>|Links component coloring container to individual coloring entries.|[componentColoring](#componentColoring)|[coloringEntry](#coloringEntry)||
|<span id="coloring">coloring</span>|Color overrides for components within a viewpoint.|[components](#components)|[componentColoring](#componentColoring)||
|<span id="comment">comment</span>|Comment resource with authoring and modification metadata. Links comments container to individual comment entries.|[comments](#comments)|[comment](#comment)||
|<span id="comments">comments</span>|Collection class for comment entries. Links topic to its comment collection.|[topic](#topic)|[comments](#comments)||
|<span id="component">component</span>|IFC component reference with optional originating system metadata. References individual IFC components.|[n528d39ce95614b6290e1532610d0bb8db16](#n528d39ce95614b6290e1532610d0bb8db16)|[component](#component)||
|<span id="components">components</span>|Components definition containing selection, visibility, and coloring sections. References component sets used in visualization and coloring entries.|[n528d39ce95614b6290e1532610d0bb8db1](#n528d39ce95614b6290e1532610d0bb8db1)|[n528d39ce95614b6290e1532610d0bb8db4](#n528d39ce95614b6290e1532610d0bb8db4)||
|<span id="direction">direction</span>|3D direction vector represented by X, Y, and Z components. Normal direction of a clipping plane.|[clippingPlane](#clippingPlane)|[direction](#direction)||
|<span id="document">document</span>|Document metadata entry with filename, description, and GUID. Links a documents collection to individual document metadata entries.|[documentsContainer](#documentsContainer)|[document](#document)||
|<span id="documentInfo">documentInfo</span>|Container class for document metadata. Links a BCF model to its document information section.|[bcfModel](#bcfModel)|[documentInfo](#documentInfo)||
|<span id="documentReference">documentReference</span>|Document reference class for either internal document GUID or external URL. Links document references container to individual reference entries.|[documentReferences](#documentReferences)|[documentReference](#documentReference)||
|<span id="documentReferences">documentReferences</span>|Collection class for document references. Links topic to document reference entries.|[topic](#topic)|[documentReferences](#documentReferences)||
|<span id="documents">documents</span>|Container relation that groups document entries.|[documentInfo](#documentInfo)|[documentsContainer](#documentsContainer)||
|<span id="endPoint">endPoint</span>|End point of a line segment.|[line](#line)|[point](#point)||
|<span id="exceptions">exceptions</span>|Visibility exception list for components. Components that differ from default visibility.|[componentVisibility](#componentVisibility)|[exceptions](#exceptions)||
|<span id="extensions">extensions</span>|Container class for extension catalogs. Links a BCF model to extension vocabularies like status, type, stage, and labels.|[bcfModel](#bcfModel)|[extensions](#extensions)||
|<span id="file">file</span>|Referenced file metadata class in the markup header. Links a files collection to individual file entries.|[filesContainer](#filesContainer)|[file](#file)||
|<span id="files">files</span>|Container relation for header file entries.|[header](#header)|[filesContainer](#filesContainer)||
|<span id="header">header</span>|Header section containing referenced files. Links markup to optional header information.|[markup](#markup)|[header](#header)||
|<span id="labels">labels</span>|Collection class for topic labels. Links topic to free-form labels container.|[topic](#topic)|[labels](#labels)||
|<span id="line">line</span>|Line overlay defined by start and end points. References individual line overlay entries.|[lines](#lines)|[line](#line)||
|<span id="lines">lines</span>|Collection class for line overlays. Associates visualization info with line overlays.|[visualizationInfo](#visualizationInfo)|[lines](#lines)||
|<span id="location">location</span>|3D location used by clipping planes and bitmap placement.|[n528d39ce95614b6290e1532610d0bb8db20](#n528d39ce95614b6290e1532610d0bb8db20)|[point](#point)||
|<span id="markup">markup</span>|Main BCF markup class containing header and topic. Links a BCF model to its main markup content.|[bcfModel](#bcfModel)|[markup](#markup)||
|<span id="normal">normal</span>|Normal vector of a bitmap overlay plane.|[bitmap](#bitmap)|[direction](#direction)||
|<span id="orthogonalCamera">orthogonalCamera</span>|Orthogonal camera definition. Associates visualization info with an orthogonal camera definition.|[visualizationInfo](#visualizationInfo)|[orthogonalCamera](#orthogonalCamera)||
|<span id="perspectiveCamera">perspectiveCamera</span>|Perspective camera definition. Associates visualization info with a perspective camera definition.|[visualizationInfo](#visualizationInfo)|[perspectiveCamera](#perspectiveCamera)||
|<span id="priorities">priorities</span>|Collection of priority literals. Links extensions to the available priority values.|[extensions](#extensions)|[priorities](#priorities)||
|<span id="project">project</span>|Project details with project ID and optional name. Links project info to the concrete project descriptor.|[projectInfo](#projectInfo)|[project](#project)||
|<span id="projectInfo">projectInfo</span>|Project information wrapper. Links a BCF model to the project information section.|[bcfModel](#bcfModel)|[projectInfo](#projectInfo)||
|<span id="referenceLinks">referenceLinks</span>|Collection class for topic reference links. Links topic to external reference URLs.|[topic](#topic)|[referenceLinks](#referenceLinks)||
|<span id="relatedTopic">relatedTopic</span>|Links related-topics container to individual related topic references.|[relatedTopics](#relatedTopics)|[relatedTopicRef](#relatedTopicRef)||
|<span id="relatedTopics">relatedTopics</span>|Collection class for links to related topics. Links topic to references to other related topics.|[topic](#topic)|[relatedTopics](#relatedTopics)||
|<span id="selection">selection</span>|Selected components within a viewpoint.|[components](#components)|[componentSelection](#componentSelection)||
|<span id="snippetTypes">snippetTypes</span>|Collection of BIM snippet type literals. Links extensions to the available BIM snippet types.|[extensions](#extensions)|[snippetTypes](#snippetTypes)||
|<span id="stages">stages</span>|Collection of stage literals. Links extensions to the available workflow stages.|[extensions](#extensions)|[stages](#stages)||
|<span id="startPoint">startPoint</span>|Start point of a line segment.|[line](#line)|[point](#point)||
|<span id="topic">topic</span>|Core issue/topic class with metadata, workflow state, comments, and viewpoints. Links markup to its main topic issue payload.|[markup](#markup)|[topic](#topic)||
|<span id="topicLabels">topicLabels</span>|Collection of topic label literals. Links extensions to the available topic labels.|[extensions](#extensions)|[topicLabels](#topicLabels)||
|<span id="topicStatuses">topicStatuses</span>|Collection of topic status literals. Links extensions to the available topic status values.|[extensions](#extensions)|[topicStatuses](#topicStatuses)||
|<span id="topicTypes">topicTypes</span>|Collection of topic type literals. Links extensions to the available topic type values.|[extensions](#extensions)|[topicTypes](#topicTypes)||
|<span id="up">up</span>|Up vector of a bitmap overlay plane.|[bitmap](#bitmap)|[direction](#direction)||
|<span id="users">users</span>|Collection of user identifier literals. Links extensions to the available user identifiers.|[extensions](#extensions)|[users](#users)||
|<span id="version">version</span>|Version payload with required version identifier. Links a BCF model to its declared version payload.|[bcfModel](#bcfModel)|[version](#version)||
|<span id="viewPoint">viewPoint</span>|Viewpoint resource with viewpoint file, snapshot, index, and GUID. Links viewpoints container to individual viewpoint entries.|[viewpoints](#viewpoints)|[viewPoint](#viewPoint)||
|<span id="viewSetupHints">viewSetupHints</span>|Viewer hints for visibility of spaces, boundaries, and openings. Viewer hints for spaces, openings, and boundaries.|[componentVisibility](#componentVisibility)|[viewSetupHints](#viewSetupHints)||
|<span id="viewpoint">viewpoint</span>|Links a comment to a referenced viewpoint.|[comment](#comment)|[commentViewpointRef](#commentViewpointRef)||
|<span id="viewpoints">viewpoints</span>|Collection class for viewpoint entries. Links topic to viewpoint definitions and snapshots.|[topic](#topic)|[viewpoints](#viewpoints)||
|<span id="visibility">visibility</span>|Visibility rules for components within a viewpoint.|[components](#components)|[componentVisibility](#componentVisibility)||
|<span id="visualizationInfo">visualizationInfo</span>|Visualization payload including camera configuration and overlays. Links a BCF model to viewpoint visualization information.|[bcfModel](#bcfModel)|[visualizationInfo](#visualizationInfo)||
