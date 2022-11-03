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
const epub_gen_memory_1 = __importDefault(require("epub-gen-memory"));
exports.default = (bookConfig, convertedContent) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const sectionArray = (bookConfig === null || bookConfig === void 0 ? void 0 : bookConfig.sections) &&
        bookConfig.sections.map((sections, index) => ({
            title: sections.title,
            content: convertedContent === null || convertedContent === void 0 ? void 0 : convertedContent.convertedChapters[index],
            filename: sections.title,
        }));
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
