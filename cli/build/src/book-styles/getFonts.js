"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const printWhite_1 = __importDefault(require("../utils/printWhite"));
exports.default = (bookConfig, verbose = false) => {
    let configCSS = "";
    if (verbose)
        logVerboseFontInfo(bookConfig);
    configCSS += getDefaultFont(bookConfig);
    configCSS += getIndentation(bookConfig);
    configCSS += getTocFont(bookConfig);
    configCSS += getHeadingFont(bookConfig);
    configCSS += getClassFonts(bookConfig);
    return configCSS;
};
const getDefaultFont = (bookConfig) => {
    // Get default book-wide font
    if (bookConfig.defaultFontFamily)
        return ` p{ font-family: ${bookConfig.defaultFontFamily}; }`;
};
const getIndentation = (bookConfig) => {
    if (bookConfig === null || bookConfig === void 0 ? void 0 : bookConfig.indentParagraphs)
        return ` p {text-indent: ${bookConfig.indentParagraphs}px;}`;
};
const getTocFont = (bookConfig) => {
    if (bookConfig.tocFontFamily)
        return ` li > a {font-family: ${bookConfig.tocFontFamily};}`;
};
const getHeadingFont = (bookConfig) => {
    const { headingFontFamilies } = bookConfig;
    let styles = "";
    if (headingFontFamilies) {
        headingFontFamilies.forEach(({ headingLevel, fontFamily }) => {
            styles += ` ${headingLevel}{font-family: ${fontFamily};}`;
        });
    }
    return styles;
};
const getClassFonts = (bookConfig) => {
    let styles = "";
    if (bookConfig.fontClasses) {
        bookConfig.fontClasses.forEach(({ fontFamily, className }) => {
            if (!className || !fontFamily)
                return;
            styles += ` .${className}{ font-family: ${fontFamily}; }`;
        });
    }
    return styles;
};
const logVerboseFontInfo = (bookConfig) => {
    bookConfig.defaultFontFamily &&
        (0, printWhite_1.default)(`Applying your defaultFontFamily setting...`);
    bookConfig.indentParagraphs &&
        (0, printWhite_1.default)(`Applying your indentParagraphs setting...`);
    bookConfig.tocFontFamily &&
        (0, printWhite_1.default)(`Applying your tocFontFamily settings...`);
    bookConfig.headingFontFamilies &&
        (0, printWhite_1.default)(`Applying your headingFontFamilies settings...`);
    bookConfig.fontClasses && (0, printWhite_1.default)(`Applying your fontClasses settings...`);
};
