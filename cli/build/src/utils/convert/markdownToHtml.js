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
const printWhite_1 = __importDefault(require("../printWhite"));
const throwIfPathInvalid_1 = __importDefault(require("../throwIfPathInvalid"));
const matter = require("gray-matter");
exports.default = (chapterArray, manuscriptPath, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    // We need to recursively list all folders within manuscript and create chapters for them.
    return Promise.all(chapterArray.map((chapter) => __awaiter(void 0, void 0, void 0, function* () {
        let convertedChapter = Object.assign(Object.assign({}, chapter), { content: "" });
        const path = `${manuscriptPath}\\manuscript\\${chapter.path}`;
        if (verbose)
            (0, printWhite_1.default)(`Converting ${chapter.title}" at ${path}" to HTML...`);
        if (chapter.isSection) {
            return convertedChapter;
        }
        try {
            (0, throwIfPathInvalid_1.default)(path, verbose);
            const rawContent = yield promises_1.default.readFile(path);
            //Parse the frontmatter data and the content
            const { content, data } = matter(rawContent.toString());
            const converter = new showdown_1.default.Converter();
            const htmlContent = converter.makeHtml(content);
            if (data) {
                convertedChapter = Object.assign(Object.assign(Object.assign({}, chapter), { content: htmlContent }), data);
            }
            else {
                convertedChapter.content = htmlContent;
            }
            // if (chapter.title === "Jasheed 1-1")
            if (verbose)
                (0, printWhite_1.default)(`Successfully converted ${chapter.title}" at ${path}`);
            return convertedChapter;
        }
        catch (error) {
            throw new Error(`Failed to convert ${path}": \n ${error}`);
        }
    })));
});
