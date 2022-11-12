"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PDFDocument = require('pdfkit');
const fs_1 = __importDefault(require("fs"));
exports.default = (bookConfig, convertedContent) => {
    const doc = new PDFDocument();
    doc.pipe(fs_1.default.createWriteStream('output.pdf'));
    doc.addPage().
        text('This **should be bold** so good luck');
    convertedContent.forEach((chapter) => {
        doc.addPage()
            .text(chapter.content);
    });
    doc.end();
};
