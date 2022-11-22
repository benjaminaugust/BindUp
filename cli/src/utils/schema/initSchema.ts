import AJV from "ajv";
import bookSchema from "../../../schemas/book.schema.json";
import chalk from "chalk";

export const initSchemas = (verbose = false): AJV => {
  if (verbose) console.log(chalk.blueBright("Loading bindup schemas..."));
  return addSchemas(
    new AJV({
      allowUnionTypes: true,
    })
  );
};

const addSchemas = (ajv: AJV): AJV => {
  ajv.addSchema(bookSchema, "book");
  return ajv;
};
