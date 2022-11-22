"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSchemas = void 0;
const ajv_1 = __importDefault(require("ajv"));
const book_schema_json_1 = __importDefault(require("../../../schemas/book.schema.json"));
const chalk_1 = __importDefault(require("chalk"));
const initSchemas = (verbose = false) => {
    if (verbose)
        console.log(chalk_1.default.blueBright("Loading bindup schemas..."));
    return addSchemas(new ajv_1.default({
        allowUnionTypes: true,
    }));
};
exports.initSchemas = initSchemas;
const addSchemas = (ajv) => {
    ajv.addSchema(book_schema_json_1.default, "book");
    return ajv;
};
