import epub from 'epub-gen-memory';
import { BookConfig } from '../../types/BookTypes';
import fs from 'fs/promises';


export default async (bookConfig: BookConfig, convertedContent: object) => {

  const sectionArray =
    bookConfig?.sections &&
    bookConfig.sections.map((sections, index) => ({
      title: sections.title,
      content: convertedContent?.convertedChapters[index],
      filename: sections.title,
    }))


  const chapterArray = bookConfig.chapters.map((chapter, index) => ({
    title: chapter.title,
    content: convertedContentArray[index],
    filename: chapter.title,
  }))

  console.log(bookConfig.bookTitle)

  try {
    const content = await epub({
      title: bookConfig.bookTitle ?? "No title provided",
      author: bookConfig.bookAuthor ?? "No author provided"
    },
      chapterArray);

    // fs.writeFile(`${bookConfig.bookTitle.replace(' ', '-').replace(':', '').replace(',', '')}`, content);
    console.log("Ebook Generated Successfully!");
  } catch (err) {
    console.error("Failed to generate Ebook because of ", err)
  }
}