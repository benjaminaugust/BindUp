import type { BookConfig } from "./types/BookTypes";
import _bookConfigJSON from '../book-config.json';
import exportBook from './utils/export/exportBook';
import { initSchemas } from './utils/schema/initSchema';
import { validateBookConfig } from './utils/schema/validateBookConfig';

const generateBook = async () => {
  const bookConfig: BookConfig = _bookConfigJSON
  const ajv = initSchemas();
  if (!validateBookConfig(ajv, bookConfig))
    return console.error("Failed to validate!")

  await exportBook(bookConfig);
};

generateBook();
