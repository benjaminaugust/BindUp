"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSchemas = void 0;
const ajv_1 = __importDefault(require("ajv"));
const book_schema_json_1 = __importDefault(require("../../../schemas/book.schema.json"));
const chapter_schema_json_1 = __importDefault(require("../../../schemas/chapter/chapter.schema.json"));
const chapter_section_schema_json_1 = __importDefault(require("../../../schemas/chapter/chapter-section/chapter-section.schema.json"));
const initSchemas = () => {
    return addSchemas(new ajv_1.default());
};
exports.initSchemas = initSchemas;
const addSchemas = (ajv) => {
    ajv.addSchema(book_schema_json_1.default, 'book');
    ajv.addSchema(chapter_schema_json_1.default, 'chapter');
    ajv.addSchema(chapter_section_schema_json_1.default, 'chapterSection');
    return ajv;
};
