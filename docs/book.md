# Book Schema

```txt
book
```

A global book configuration object.

| Abstract            | Extensible | Status         | Identifiable | Custom Properties | Additional Properties | Access Restrictions | Defined In                                                         |
| :------------------ | :--------- | :------------- | :----------- | :---------------- | :-------------------- | :------------------ | :----------------------------------------------------------------- |
| Can be instantiated | No         | Unknown status | No           | Forbidden         | Allowed               | none                | [book.schema.json](https://github.com/benjaminaugust/BindUp/tree/main/out "open original schema") |

## Book Type

`object` ([Book](book))

# Book Properties

| Property                                        | Type      | Required | Nullable       | Defined by                                                                                |
| :---------------------------------------------- | :-------- | :------- | :------------- | :---------------------------------------------------------------------------------------- |
| [manuscript](#manuscript)                       | `string`  | Required | cannot be null | [Book](book-properties-manuscript "book#/properties/manuscript")                       |
| [formats](#formats)                             | `array`   | Required | cannot be null | [Book](book-properties-formats "book#/properties/formats")                             |
| [title](#title)                                 | `string`  | Required | cannot be null | [Book](book-properties-title "book#/properties/title")                                 |
| [author](#author)                               | Multiple  | Required | cannot be null | [Book](book-properties-author "book#/properties/author")                               |
| [description](#description)                     | `string`  | Optional | cannot be null | [Book](book-properties-description "book#/properties/description")                     |
| [publisher](#publisher)                         | `string`  | Optional | cannot be null | [Book](book-properties-publisher "book#/properties/publisher")                         |
| [coverPath](#coverpath)                         | `string`  | Optional | cannot be null | [Book](book-properties-coverpath "book#/properties/coverPath")                         |
| [tocInTOC](#tocintoc)                           | `boolean` | Optional | cannot be null | [Book](book-properties-tocintoc "book#/properties/tocInTOC")                           |
| [numberChaptersInTOC](#numberchaptersintoc)     | `boolean` | Optional | cannot be null | [Book](book-properties-numberchaptersintoc "book#/properties/numberChaptersInTOC")     |
| [prependChapterTitles](#prependchaptertitles)   | `boolean` | Optional | cannot be null | [Book](book-properties-prependchaptertitles "book#/properties/prependChapterTitles")   |
| [date](#date)                                   | `string`  | Optional | cannot be null | [Book](book-properties-date "book#/properties/date")                                   |
| [lang](#lang)                                   | `string`  | Optional | cannot be null | [Book](book-properties-lang "book#/properties/lang")                                   |
| [css](#css)                                     | `string`  | Optional | cannot be null | [Book](book-properties-css "book#/properties/css")                                     |
| [fonts](#fonts)                                 | `array`   | Optional | cannot be null | [Book](book-properties-fonts "book#/properties/fonts")                                 |
| [epubVersion](#epubversion)                     | `number`  | Optional | cannot be null | [Book](book-properties-epubversion "book#/properties/epubVersion")                     |
| [fetchTimeout](#fetchtimeout)                   | `number`  | Optional | cannot be null | [Book](book-properties-fetchtimeout "book#/properties/fetchTimeout")                   |
| [retryTimes](#retrytimes)                       | `number`  | Optional | cannot be null | [Book](book-properties-retrytimes "book#/properties/retryTimes")                       |
| [batchSize](#batchsize)                         | `number`  | Optional | cannot be null | [Book](book-properties-batchsize "book#/properties/batchSize")                         |
| [ignoreFailedDownloads](#ignorefaileddownloads) | `boolean` | Optional | cannot be null | [Book](book-properties-ignorefaileddownloads "book#/properties/ignoreFailedDownloads") |
| [verbose](#verbose)                             | `boolean` | Optional | cannot be null | [Book](book-properties-verbose "book#/properties/verbose")                             |

## manuscript

The relative path to the manuscript folder.

`manuscript`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Book](book-properties-manuscript "book#/properties/manuscript")

### manuscript Type

`string`

## formats

An array of formats you want to print your book in (epub only as of now).

`formats`

*   is required

*   Type: `string[]`

*   cannot be null

*   defined in: [Book](book-properties-formats "book#/properties/formats")

### formats Type

`string[]`

## title

The title of the book.

`title`

*   is required

*   Type: `string`

*   cannot be null

*   defined in: [Book](book-properties-title "book#/properties/title")

### title Type

`string`

## author

The author of the book.

`author`

*   is required

*   Type: `string[]`

*   cannot be null

*   defined in: [Book](book-properties-author "book#/properties/author")

### author Type

`string[]`

## description

The description of the book.

`description`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Book](book-properties-description "book#/properties/description")

### description Type

`string`

## publisher

The publisher of the book.

`publisher`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Book](book-properties-publisher "book#/properties/publisher")

### publisher Type

`string`

## coverPath

The path to the book cover (jpg, png).

`coverPath`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Book](book-properties-coverpath "book#/properties/coverPath")

### coverPath Type

`string`

## tocInTOC

(Default true) Whether to show TOC entry in the reader's Table of Contents; only for EPUB2.

`tocInTOC`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Book](book-properties-tocintoc "book#/properties/tocInTOC")

### tocInTOC Type

`boolean`

## numberChaptersInTOC

(Default false) Whether to number the items in the Table of Contents.

`numberChaptersInTOC`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Book](book-properties-numberchaptersintoc "book#/properties/numberChaptersInTOC")

### numberChaptersInTOC Type

`boolean`

## prependChapterTitles

(Default true) Whether to automatically number entries in TOC.

`prependChapterTitles`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Book](book-properties-prependchaptertitles "book#/properties/prependChapterTitles")

### prependChapterTitles Type

`boolean`

## date

(Defaults to today) Publication date

`date`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Book](book-properties-date "book#/properties/date")

### date Type

`string`

## lang

(Defaults to en) The book's language as an ISO language code.

`lang`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Book](book-properties-lang "book#/properties/lang")

### lang Type

`string`

## css

A CSS string that overrides default styles.

`css`

*   is optional

*   Type: `string`

*   cannot be null

*   defined in: [Book](book-properties-css "book#/properties/css")

### css Type

`string`

## fonts

Array of fonts to include.

`fonts`

*   is optional

*   Type: `object[]` ([Details](book-properties-fonts-items))

*   cannot be null

*   defined in: [Book](book-properties-fonts "book#/properties/fonts")

### fonts Type

`object[]` ([Details](book-properties-fonts-items))

## epubVersion

(Default 3) Either 3 or 2. The release version of EPUB to render your book to.

`epubVersion`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Book](book-properties-epubversion "book#/properties/epubVersion")

### epubVersion Type

`number`

## fetchTimeout

(Default 2000) Timeout time for requests, in milliseconds; Browsers need to support AbortController and signals for this to work.

`fetchTimeout`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Book](book-properties-fetchtimeout "book#/properties/fetchTimeout")

### fetchTimeout Type

`number`

## retryTimes

(Default 3) How many times to retry fetching resources.

`retryTimes`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Book](book-properties-retrytimes "book#/properties/retryTimes")

### retryTimes Type

`number`

## batchSize

(Default 100) The size of the batches to use when downloading files.

`batchSize`

*   is optional

*   Type: `number`

*   cannot be null

*   defined in: [Book](book-properties-batchsize "book#/properties/batchSize")

### batchSize Type

`number`

## ignoreFailedDownloads

(Default false) Instead of throwing, emit a warning and write an empty file if a font or image fails to download.

`ignoreFailedDownloads`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Book](book-properties-ignorefaileddownloads "book#/properties/ignoreFailedDownloads")

### ignoreFailedDownloads Type

`boolean`

## verbose

(Default false) Whether to log progress messages; If a function is provided, the first argument will either be 'log' or 'warn'.

`verbose`

*   is optional

*   Type: `boolean`

*   cannot be null

*   defined in: [Book](book-properties-verbose "book#/properties/verbose")

### verbose Type

`boolean`
