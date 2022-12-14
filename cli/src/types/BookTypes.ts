export enum Format {
  epub = "epub",
  html = "html",
  pdf = "pdf",
  docx = "docx",
}

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
