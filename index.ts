import showdown from "showdown";
import fs from 'fs/promises';
import epub from 'epub-gen-memory';
import AJV from 'ajv';
import type DefinedError from 'ajv';
import bookSchema from './schemas/book.schema.json';
import chapterSchema from './schemas/chapter/chapter.schema.json';
import chapterSectionSchema from './schemas/chapter/chapter-section/chapter-section.schema.json';
import bookConfig from './book-config.json';

const doBook = async () => {
  const ajv = new AJV();

  ajv.addSchema(bookSchema, 'book');
  ajv.addSchema(chapterSchema, 'chapter');
  ajv.addSchema(chapterSectionSchema, 'chapterSection');

  const validate = ajv.getSchema('book')

  if (!validate)
    return console.log("Validate broke")

  if (!validate(bookConfig)) {
    console.log("Failed")
    if (validate.errors) {
      let x = 0;
      for (const err of validate.errors) {
        console.log(++x)
        console.log(err.keyword)
        console.error(err);
      }
      // console.log("File", bookConfig)
    }
  } else {
    console.log('success validating');
    await makeFile();
  }


}


const makeFile = async () => {
  const converter = new showdown.Converter();
  try {
    const test = await fs.readFile('test.md');
    const html = converter.makeHtml(test.toString());

    const convertedContentArray: string[] = await Promise.all(bookConfig.chapters.map(
      async (chapter) => {
        const contentFile = await fs.readFile(chapter.contentPath);
        return converter.makeHtml(contentFile.toString());
      }
    ))

    const chapterArray = bookConfig.chapters.map((chapter, index) => ({
      title: chapter.title,
      content: convertedContentArray[index],
      filename: chapter.title,
    }))

    epub({
      title: bookConfig.bookTitle ?? "No title provided",
      author: bookConfig.bookAuthor ?? "No author provided"
    },
      chapterArray)
      .then(
        content => {
          fs.writeFile(`${bookConfig.bookTitle.replace(' ', '-').replace(':', '').replace(',', '')}`, content);
          console.log("Ebook Generated Successfully!");
        },
        err => console.error("Failed to generate Ebook because of ", err)
      );

  } catch (err) {
    console.log('failed to parse markdown', err);
  }
}

doBook();
