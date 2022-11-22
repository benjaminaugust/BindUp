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
const promises_1 = __importDefault(require("fs/promises"));
const printBlue_1 = __importDefault(require("../utils/printBlue"));
const throwIfPathInvalid_1 = __importDefault(require("../utils/throwIfPathInvalid"));
exports.default = (cssFile, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose)
        (0, printBlue_1.default)(`Trying to load css from ${cssFile} ...`);
    (0, throwIfPathInvalid_1.default)(cssFile);
    const rawFile = yield promises_1.default.readFile(cssFile);
    return rawFile.toString();
});
