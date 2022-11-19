import AJV from "ajv";
import bookSchema from "../../../schemas/book.schema.json";

export const initSchemas = (): AJV => {
  return addSchemas(new AJV());
};

const addSchemas = (ajv: AJV): AJV => {
  ajv.addSchema(bookSchema, "book");
  return ajv;
};
