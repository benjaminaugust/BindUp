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
const BookTypes_1 = require("../../types/BookTypes");
const exportEpub_1 = __importDefault(require("./exportEpub"));
exports.default = (bookConfig) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const convertedContent = yield markdownToHtml(bookConfig);
        yield exportBasedOnFormat(bookConfig, convertedContent);
        // await exportEpub(bookConfig, convertedContent);
    }
    catch (err) {
        console.log('Failed to generate ebook.', err);
    }
});
const markdownToHtml = (bookConfig) => __awaiter(void 0, void 0, void 0, function* () {
    const converter = new showdown_1.default.Converter();
    const convertedChapters = yield Promise.all(bookConfig.chapters.map((chapter) => __awaiter(void 0, void 0, void 0, function* () {
        if (!(chapter === null || chapter === void 0 ? void 0 : chapter.contentPath))
            throw new Error(`Undefined content path in chapter:\n\n${chapter}`);
        const contentFile = yield promises_1.default.readFile(chapter.contentPath);
        return converter.makeHtml(contentFile.toString());
    })));
    const convertedSections = (bookConfig === null || bookConfig === void 0 ? void 0 : bookConfig.sections) &&
        (yield Promise.all(bookConfig.sections.map((sections) => __awaiter(void 0, void 0, void 0, function* () {
            if (!(sections === null || sections === void 0 ? void 0 : sections.content))
                throw new Error(`Undefined content path in chapter:\n\n${sections}`);
            const contentFile = yield promises_1.default.readFile(sections.content);
            return converter.makeHtml(contentFile.toString());
        }))));
    return {
        convertedChapters,
        convertedSections
    };
});
const exportBasedOnFormat = (bookConfig, convertedContent) => __awaiter(void 0, void 0, void 0, function* () {
    const { formats } = bookConfig;
    if (!formats)
        throw new Error("No valid format specified!");
    formats.forEach((thisFormat) => __awaiter(void 0, void 0, void 0, function* () {
        switch (thisFormat) {
            case BookTypes_1.Format.epub:
                yield (0, exportEpub_1.default)(bookConfig, convertedContent);
                break;
        }
    }));
});
