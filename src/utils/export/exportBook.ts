import { BookConfig } from '../../types/BookTypes';
import showdown from "showdown";
import fs from 'fs/promises';
import { Format } from "../../types/BookTypes";
import exportEpub from './exportEpub';

export default async (bookConfig: BookConfig): Promise<void> => {
  try {
    const convertedContent = await markdownToHtml(bookConfig);

    await exportBasedOnFormat(bookConfig, convertedContent)
    // await exportEpub(bookConfig, convertedContent);

  } catch (err) {
    console.log('Failed to generate ebook.', err);
  }
}


const markdownToHtml = async (bookConfig: BookConfig) => {

  const converter = new showdown.Converter();
  const convertedChapters = await Promise.all(bookConfig.chapters.map(
    async (chapter) => {
      if (!chapter?.contentPath)
        throw new Error(`Undefined content path in chapter:\n\n${chapter}`);

      const contentFile = await fs.readFile(chapter.contentPath);
      return converter.makeHtml(contentFile.toString());
    }
  ))

  const convertedSections =
    bookConfig?.sections &&
    await Promise.all(bookConfig.sections.map(
      async (sections) => {
        if (!sections?.content)
          throw new Error(`Undefined content path in chapter:\n\n${sections}`);

        const contentFile = await fs.readFile(sections.content);
        return converter.makeHtml(contentFile.toString());
      }
    ))

  return {
    convertedChapters,
    convertedSections
  }
}


const exportBasedOnFormat = async (bookConfig: BookConfig, convertedContent: object) => {

  const { formats } = bookConfig;

  if (!formats)
    throw new Error("No valid format specified!");

  formats.forEach(async (thisFormat) => {
    switch (thisFormat) {
      case Format.epub:
        await exportEpub(bookConfig, convertedContent);
        break;
    }
  })
}