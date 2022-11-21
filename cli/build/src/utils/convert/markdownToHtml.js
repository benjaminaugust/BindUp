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
exports.default = (chapterArray) => __awaiter(void 0, void 0, void 0, function* () {
    const converter = new showdown_1.default.Converter();
    // We need to recursively list all folders within manuscript and create chapters for them.
    return Promise.all(chapterArray.map((chapter) => __awaiter(void 0, void 0, void 0, function* () {
        const convertedChapter = Object.assign(Object.assign({}, chapter), { content: "" });
        if (chapter.isSection) {
            return convertedChapter;
        }
        const content = yield promises_1.default.readFile(`testbook\\manuscript\\${chapter.path}`);
        convertedChapter.content = converter.makeHtml(content.toString());
        return convertedChapter;
    })));
});
