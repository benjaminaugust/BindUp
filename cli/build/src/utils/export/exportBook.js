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
const BookTypes_1 = require("../../types/BookTypes");
const exportEpub_1 = __importDefault(require("./exportEpub"));
const getFonts_1 = __importDefault(require("../../book-styles/getFonts"));
const markdownToHtml_1 = __importDefault(require("../convert/markdownToHtml"));
const convertChapters_1 = __importDefault(require("../convert/convertChapters"));
const getCSS_1 = __importDefault(require("../../book-styles/getCSS"));
const throwIfPathInvalid_1 = __importDefault(require("../throwIfPathInvalid"));
const printRed_1 = __importDefault(require("../printRed"));
const printWhite_1 = __importDefault(require("../printWhite"));
exports.default = (bookConfig, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manuscriptPath = bookConfig.manuscript;
        (0, throwIfPathInvalid_1.default)(manuscriptPath, verbose);
        if (bookConfig.css === undefined)
            bookConfig.css = "";
        try {
            const { cssFile } = bookConfig;
            if (cssFile) {
                (0, throwIfPathInvalid_1.default)(cssFile, verbose);
                (0, printWhite_1.default)(`Loading CSS File ${cssFile} ...`);
                bookConfig.css += yield (0, getCSS_1.default)(cssFile, verbose);
                bookConfig.css += " ";
            }
        }
        catch (error) {
            (0, printRed_1.default)("You specified a CSS File, but it failed to load.", error);
        }
        bookConfig.css += (0, getFonts_1.default)(bookConfig, verbose);
        const chapterArray = (0, convertChapters_1.default)(manuscriptPath);
        const convertedChapters = yield (0, markdownToHtml_1.default)(chapterArray, manuscriptPath);
        return yield exportBasedOnFormat(bookConfig, convertedChapters, verbose);
    }
    catch (err) {
        return (0, printRed_1.default)("Failed to export ebook.", err);
    }
});
const exportBasedOnFormat = (bookConfig, convertedContent, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    (0, printWhite_1.default)(`Rendering to the following formats:\n ${bookConfig.formats}`);
    const { formats } = bookConfig;
    if (verbose)
        (0, printWhite_1.default)(`Validating your specified formats...`);
    if (!formats)
        throw new Error(`No valid file formats specified. Did you leave the formats array empty?`);
    const results = yield Promise.allSettled(formats.map((thisFormat) => __awaiter(void 0, void 0, void 0, function* () {
        switch (thisFormat) {
            case BookTypes_1.Format.epub:
                return yield (0, exportEpub_1.default)(bookConfig, convertedContent, verbose);
        }
    })));
    if (results.length <= 0)
        throw new Error(`No valid format to render! Your formats include: ${formats}, but bindup can't render any of those`);
    return results;
});
