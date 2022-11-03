import AJV from 'ajv';
import bookSchema from '../../../schemas/book.schema.json';
import chapterSchema from '../../../schemas/chapter/chapter.schema.json';
import chapterSectionSchema from '../../../schemas/chapter/chapter-section/chapter-section.schema.json';

export const initSchemas = (): AJV => {
  return addSchemas(new AJV())
}

const addSchemas = (ajv: AJV): AJV => {
  ajv.addSchema(bookSchema, 'book');
  ajv.addSchema(chapterSchema, 'chapter');
  ajv.addSchema(chapterSectionSchema, 'chapterSection');
  return ajv;
};
