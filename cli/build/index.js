"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const showdown_1 = __importDefault(require("showdown"));
const promises_1 = __importDefault(require("fs/promises"));
const epub_gen_memory_1 = __importDefault(require("epub-gen-memory"));
const ajv_1 = __importDefault(require("ajv"));
const book_schema_json_1 = __importDefault(require("./schemas/book.schema.json"));
const chapter_schema_json_1 = __importDefault(require("./schemas/chapter/chapter.schema.json"));
const chapter_section_schema_json_1 = __importDefault(require("./schemas/chapter/chapter-section/chapter-section.schema.json"));
const book_config_json_1 = __importDefault(require("./book-config.json"));
const doBook = () => __awaiter(void 0, void 0, void 0, function* () {
    const ajv = new ajv_1.default();
    ajv.addSchema(book_schema_json_1.default, 'book');
    ajv.addSchema(chapter_schema_json_1.default, 'chapter');
    ajv.addSchema(chapter_section_schema_json_1.default, 'chapterSection');
    const validate = ajv.getSchema('book');
    if (!validate)
        return console.log("Validate broke");
    if (!validate(book_config_json_1.default)) {
        console.log("Failed");
        if (validate.errors) {
            let x = 0;
            for (const err of validate.errors) {
                console.log(++x);
                console.log(err.keyword);
                console.error(err);
            }
            // console.log("File", bookConfig)
        }
    }
    else {
        console.log('success validating');
        yield makeFile();
    }
});
const makeFile = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const converter = new showdown_1.default.Converter();
    try {
        const test = yield promises_1.default.readFile('test.md');
        const html = converter.makeHtml(test.toString());
        const convertedContentArray = yield Promise.all(book_config_json_1.default.chapters.map((chapter) => __awaiter(void 0, void 0, void 0, function* () {
            const contentFile = yield promises_1.default.readFile(chapter.contentPath);
            return converter.makeHtml(contentFile.toString());
        })));
        const chapterArray = book_config_json_1.default.chapters.map((chapter, index) => ({
            title: chapter.title,
            content: convertedContentArray[index],
            filename: chapter.title,
        }));
        (0, epub_gen_memory_1.default)({
            title: (_a = book_config_json_1.default.bookTitle) !== null && _a !== void 0 ? _a : "No title provided",
            author: (_b = book_config_json_1.default.bookAuthor) !== null && _b !== void 0 ? _b : "No author provided"
        }, chapterArray)
            .then(content => {
            promises_1.default.writeFile(`${book_config_json_1.default.bookTitle.replace(' ', '-').replace(':', '').replace(',', '')}`, content);
            console.log("Ebook Generated Successfully!");
        }, err => console.error("Failed to generate Ebook because of ", err));
    }
    catch (err) {
        console.log('failed to parse markdown', err);
    }
});
doBook();
