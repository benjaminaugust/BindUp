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
const BookTypes_1 = require("./types/BookTypes");
exports.default = (bookConfig) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const convertedContentArray = yield markdownToHtml(bookConfig);
        yield exportBasedOnFormat(bookConfig, convertedContentArray);
        // await exportEpub(bookConfig, convertedContentArray);
    }
    catch (err) {
        console.log('Failed to generate ebook.', err);
    }
});
const markdownToHtml = (bookConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const converter = new showdown_1.default.Converter();
    return yield Promise.all(bookConfig.chapters.map((chapter) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(chapter === null || chapter === void 0 ? void 0 : chapter.contentPath))
            throw new Error(`Undefined content path in chapter:\n\n${chapter}`);
        const contentFile = yield promises_1.default.readFile(chapter.contentPath);
        return converter.makeHtml(contentFile.toString());
    })));
});
const exportEpub = (bookConfig, convertedContentArray) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const chapterArray = bookConfig.chapters.map((chapter, index) => ({
        title: chapter.title,
        content: convertedContentArray[index],
        filename: chapter.title,
    }));
    console.log(bookConfig.bookTitle);
    try {
        const content = yield (0, epub_gen_memory_1.default)({
            title: (_a = bookConfig.bookTitle) !== null && _a !== void 0 ? _a : "No title provided",
            author: (_b = bookConfig.bookAuthor) !== null && _b !== void 0 ? _b : "No author provided"
        }, chapterArray);
        // fs.writeFile(`${bookConfig.bookTitle.replace(' ', '-').replace(':', '').replace(',', '')}`, content);
        console.log("Ebook Generated Successfully!");
    }
    catch (err) {
        console.error("Failed to generate Ebook because of ", err);
    }
});
const exportBasedOnFormat = (bookConfig, convertedContentArray) => __awaiter(void 0, void 0, void 0, function* () {
    const { formats } = bookConfig;
    if (!formats)
        throw new Error("No valid format specified!");
    formats.forEach((thisFormat) => __awaiter(void 0, void 0, void 0, function* () {
        switch (thisFormat) {
            case BookTypes_1.Format.epub:
                yield exportEpub(bookConfig, convertedContentArray);
                break;
        }
    }));
});
