import AJV from 'ajv';
import type { BookConfig } from "../../types/BookTypes";
import _bookConfigJSON from '../../../book-config.json';

export const validateBookConfig = (ajv: AJV, bookConfig: BookConfig): boolean => {
  const validate = ajv.getSchema('book')

  if (!validate) {
    console.log("Validate broke")
    return false;
  }

  if (validate(bookConfig)) {
    console.log('Success validating');
    return true;
  }

  if (validate.errors) {
    console.log("Failed to validate book config!")
    let x = 0;
    for (const err of validate.errors) {
      console.log(++x)
      console.log(err.keyword)
      console.error(err);
    }
  }
  return false;
};