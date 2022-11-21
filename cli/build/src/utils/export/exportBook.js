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
const chalk_1 = __importDefault(require("chalk"));
const BookTypes_1 = require("../../types/BookTypes");
const exportEpub_1 = __importDefault(require("./exportEpub"));
const getFonts_1 = __importDefault(require("../../book-styles/getFonts"));
const markdownToHtml_1 = __importDefault(require("../convert/markdownToHtml"));
const convertChapters_1 = __importDefault(require("../convert/convertChapters"));
const getCSS_1 = __importDefault(require("../../book-styles/getCSS"));
const is_valid_path_1 = __importDefault(require("is-valid-path"));
exports.default = (bookConfig) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manuscriptPath = bookConfig.manuscript;
        const chapterArray = (0, convertChapters_1.default)(manuscriptPath);
        if (bookConfig.css === undefined)
            bookConfig.css = "";
        try {
            const { cssFile } = bookConfig;
            if (cssFile && (0, is_valid_path_1.default)(cssFile)) {
                console.log(chalk_1.default.blueBright(`Loading CSS File ${cssFile} ...`));
                bookConfig.css += yield (0, getCSS_1.default)(cssFile);
                bookConfig.css += " ";
            }
        }
        catch (error) {
            console.error(chalk_1.default.redBright("Failed to load CSS", error));
        }
        bookConfig.css += (0, getFonts_1.default)(bookConfig);
        const convertedChapters = yield (0, markdownToHtml_1.default)(chapterArray, manuscriptPath);
        return exportBasedOnFormat(bookConfig, convertedChapters);
    }
    catch (err) {
        return console.log("Failed to generate ebook.", err);
    }
});
const exportBasedOnFormat = (bookConfig, convertedContent) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chalk_1.default.blueBright(`Rendering to the following formats:`, bookConfig === null || bookConfig === void 0 ? void 0 : bookConfig.formats));
    const { formats } = bookConfig;
    if (!formats)
        throw new Error("No valid format specified!");
    formats.forEach((thisFormat) => __awaiter(void 0, void 0, void 0, function* () {
        switch (thisFormat) {
            case BookTypes_1.Format.epub:
                return yield (0, exportEpub_1.default)(bookConfig, convertedContent);
        }
    }));
});
