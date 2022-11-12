import { BookConfig, ConvertedContent } from './../../types/BookTypes';
const kindle = require('html-to-mobi');

export default async (bookConfig: BookConfig, convertedContent: any) => {
  const bookData = {
    title: bookConfig.bookTitle,
    creator: bookConfig.bookAuthor,
    sections: convertedContent
  }

  console.log("Hello")
  console.log(kindle)

  kindle.create(bookData, { target: '.' })

}