"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSchemas = void 0;
const ajv_1 = __importDefault(require("ajv"));
const book_schema_json_1 = __importDefault(require("../../../schemas/book.schema.json"));
const initSchemas = () => {
    return addSchemas(new ajv_1.default({
        allowUnionTypes: true,
    }));
};
exports.initSchemas = initSchemas;
const addSchemas = (ajv) => {
    ajv.addSchema(book_schema_json_1.default, "book");
    return ajv;
};
