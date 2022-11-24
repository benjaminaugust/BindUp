import type { BookConfig } from "../types/BookConfig";
import printWhite from "../utils/printWhite";

export default (bookConfig: BookConfig, verbose = false): string => {
  let configCSS = "";

  if (verbose) logVerboseFontInfo(bookConfig);

  configCSS += getDefaultFont(bookConfig);
  configCSS += getIndentation(bookConfig);
  configCSS += getTocFont(bookConfig);
  configCSS += getHeadingFont(bookConfig);
  configCSS += getClassFonts(bookConfig);

  return configCSS;
};

const getDefaultFont = (bookConfig: BookConfig) => {
  // Get default book-wide font
  if (bookConfig.defaultFontFamily)
    return ` p{ font-family: ${bookConfig.defaultFontFamily}; }`;
};

const getIndentation = (bookConfig: BookConfig) => {
  if (bookConfig?.indentParagraphs)
    return ` p {text-indent: ${bookConfig.indentParagraphs}px;}`;
};

const getTocFont = (bookConfig: BookConfig) => {
  if (bookConfig.tocFontFamily)
    return ` li > a {font-family: ${bookConfig.tocFontFamily};}`;
};

const getHeadingFont = (bookConfig: BookConfig) => {
  const { headingFontFamilies } = bookConfig;
  let styles = "";
  if (headingFontFamilies) {
    headingFontFamilies.forEach(({ headingLevel, fontFamily }) => {
      styles += ` ${headingLevel}{font-family: ${fontFamily};}`;
    });
  }
  return styles;
};

const getClassFonts = (bookConfig: BookConfig) => {
  let styles = "";
  if (bookConfig.fontClasses) {
    bookConfig.fontClasses.forEach(({ fontFamily, className }) => {
      if (!className || !fontFamily) return;
      styles += ` .${className}{ font-family: ${fontFamily}; }`;
    });
  }
  return styles;
};

const logVerboseFontInfo = (bookConfig: BookConfig) => {
  bookConfig.defaultFontFamily &&
    printWhite(`Applying your defaultFontFamily setting...`);
  bookConfig.indentParagraphs &&
    printWhite(`Applying your indentParagraphs setting...`);
  bookConfig.tocFontFamily &&
    printWhite(`Applying your tocFontFamily settings...`);
  bookConfig.headingFontFamilies &&
    printWhite(`Applying your headingFontFamilies settings...`);
  bookConfig.fontClasses && printWhite(`Applying your fontClasses settings...`);
};
