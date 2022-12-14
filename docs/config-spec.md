# Book

A global book configuration object.


**Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**manuscript**|`string`|The relative path to the manuscript folder.<br/>|yes|
|[**formats**](#formats)|`string[]`|An array of formats you want to print your book in (epub only as of now).<br/>|yes|
|**title**|`string`|The title of the book.<br/>|yes|
|[**author**](#author)|`string[]`|The author of the book.<br/>|yes|
|**description**|`string`|The description of the book.<br/>|no|
|**publisher**|`string`|The publisher of the book.<br/>|no|
|**coverPath**|`string`|The path to the book cover (jpg, png).<br/>|no|
|**tocInTOC**|`boolean`|(Default true) Whether to show TOC entry in the reader's Table of Contents; only for EPUB2.<br/>|no|
|**numberChaptersInTOC**|`boolean`|(Default false) Whether to number the items in the Table of Contents.<br/>|no|
|**prependChapterTitles**|`boolean`|(Default true) Whether to automatically number entries in TOC.<br/>|no|
|**date**|`string`|(Defaults to today) Publication date<br/>|no|
|**lang**|`string`|(Defaults to en) The book's language as an ISO language code.<br/>|no|
|**css**|`string`|A CSS string that overrides default styles.<br/>|no|
|[**fonts**](#fonts)|`object[]`|Array of fonts to include.<br/>|no|
|**epubVersion**|`number`|(Default 3) Either 3 or 2. The release version of EPUB to render your book to.<br/>|no|
|**fetchTimeout**|`number`|(Default 2000) Timeout time for requests, in milliseconds; Browsers need to support AbortController and signals for this to work.<br/>|no|
|**retryTimes**|`number`|(Default 3) How many times to retry fetching resources.<br/>|no|
|**batchSize**|`number`|(Default 100) The size of the batches to use when downloading files.<br/>|no|
|**ignoreFailedDownloads**|`boolean`|(Default false) Instead of throwing, emit a warning and write an empty file if a font or image fails to download.<br/>|no|
|**verbose**|`boolean`|(Default false) Whether to log progress messages; If a function is provided, the first argument will either be 'log' or 'warn'.<br/>|no|

**Example**

```json
{
    "fonts": [
        {}
    ]
}
```

<a name="formats"></a>
## formats\[\]: array

An array of formats you want to print your book in (epub only as of now).


**Items**

**Item Type:** `string`  
<a name="author"></a>
## author\[\]: array,string

The author of the book.


**Items**

**Item Type:** `string`  
<a name="fonts"></a>
## fonts\[\]: array

Array of fonts to include.


**Items**

**Item Properties**

|Name|Type|Description|Required|
|----|----|-----------|--------|
|**filename**|`string`|||
|**url**|`string`|||

**Example**

```json
[
    {}
]
```


