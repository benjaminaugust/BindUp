export enum Format {
  epub = "epub",
  html = "html",
  pdf = "pdf",
  docx = "docx",
}
/**A global book configuration object. */
export type BookConfig = {
  /**An array of formats you want to print your book in (epub only as of now). */
  formats: string[];
  /**The relative path to the manuscript folder. */
  manuscript: string;
  /**The amount, in pixels, to indent paragraphs. */
  indentParagraphs?: number;
  /**The relative path to output the book to. */
  outDir: string;
  /**The title of the book. */
  title: string;
  /**The author(s) of the book. */
  author: string | string[];
  /**The description of the book. */
  description?: string;
  /**The publisher of the book. */
  publisher?: string;
  /**The path to the book cover (jpg, png). */
  coverPath?: string;
  /**Whether to show TOC entry in the reader's Table of Contents; only for EPUB2. */
  tocInTOC?: boolean;
  /**Whether to number the items in the Table of Contents. */
  numberChaptersInTOC?: boolean;
  /**Whether to automatically number entries in TOC. */
  prependChapterTitles?: boolean;
  /**Publication date. */
  date?: string;
  /**The book's language as an ISO language code. */
  lang?: string;
  /**A CSS string that overrides default styles. */
  css?: string;
  /**Array of fonts to include */
  fonts?: {
    filename: string;
    url: string;
  }[];
  /**Either 3 or 2. The release version of EPUB to render your book to. */
  epubVersion?: number;
  /** Timeout time for requests, in milliseconds; Browsers need to support   `AbortController` and signals for this to work.*/
  fetchTimeout?: number;
  /**How many times to retry fetching resources */
  retryTimes?: number;
  /**The size of the batches to use when downloading files */
  batchSize?: number;
  /**Instead of throwing, emit a warning and write an empty file if a font or image fails to download.*/
  ignoreFailedDownloads?: boolean;
  /** Whether to log progress messages; If a function is provided, the first argument will either be 'log' or 'warn'.*/
  verbose?: boolean;
};

export type Section = {
  content?: string;
  title: string;
  appearsBefore: string;
};

export type Chapter = {
  title?: string;
  author?: string;
  sections?: Array<ChapterSection>;
  contentPath?: string;
};

export type ChapterSection = {
  title?: string;
  author?: string;
  contentPath?: string;
};

export type ConvertedItem = {
  title?: string;
  content?: string;
  id: string;
};

export type ConvertedContent = {
  chapters?: ConvertedItem[] | null;
  sections?: ConvertedItem[] | null;
};
