import AJV from 'ajv';
import type { BookConfig } from "../../types/BookTypes";
import _bookConfigJSON from '../../../book-config.json';
import chalk from 'chalk';

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
    console.log(
      chalk.bold.black.bgWhite(`\nInvalid book config file. Your book config must match the writedown book config schema. Check the docs.`)
    )
    let x = 0;
    for (const err of validate.errors) {
      if (err.instancePath)
        console.error(chalk.red.bold('\nAt ' + err.instancePath))
      console.error(chalk.red.bold('\nBook config error: ' + err.message))
    }
  }
  return false;
};