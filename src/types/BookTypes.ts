export enum Format {
  epub = "epub",
  html = "html",
  mobi = "mobi",
  pdf = "pdf",
  docx = "docx",
}

export type BookConfig = {
  formats: string[],
  bookTitle: string,
  bookAuthor: string,
  chapters: Chapter[],
  sections?: Section[]
};

export type Section = {
  content?: string,
  title: string,
  appearsBefore: string
};

export type Chapter = {
  title?: string,
  author?: string,
  sections?: Array<ChapterSection>,
  contentPath?: string,
};

export type ChapterSection = {
  title?: string,
  author?: string,
  contentPath?: string,
}