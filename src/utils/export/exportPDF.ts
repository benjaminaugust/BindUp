import { BookConfig } from './../../types/BookTypes';
const PDFDocument = require('pdfkit');
import fs from 'fs';

export default (bookConfig: BookConfig, convertedContent: any) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('output.pdf',));
  doc.addPage().
    text('This **should be bold** so good luck')
  convertedContent.forEach((chapter: any) => {
    doc.addPage()
      .text(chapter.content)
  })
  doc.end();
}