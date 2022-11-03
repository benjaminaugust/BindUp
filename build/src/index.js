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
const book_config_json_1 = __importDefault(require("../book-config.json"));
const exportBook_1 = __importDefault(require("./utils/export/exportBook"));
const initSchema_1 = require("./utils/schema/initSchema");
const validateBookConfig_1 = require("./utils/schema/validateBookConfig");
const generateBook = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookConfig = book_config_json_1.default;
    const ajv = (0, initSchema_1.initSchemas)();
    if (!(0, validateBookConfig_1.validateBookConfig)(ajv, bookConfig))
        return console.error("Failed to validate!");
    yield (0, exportBook_1.default)(bookConfig);
});
generateBook();
