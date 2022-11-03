"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBookConfig = void 0;
const validateBookConfig = (ajv, bookConfig) => {
    const validate = ajv.getSchema('book');
    if (!validate)
        return console.log("Validate broke");
    if (validate(bookConfig)) {
        console.log('Success validating');
        return true;
    }
    if (validate.errors) {
        console.log("Failed to validate book config!");
        let x = 0;
        for (const err of validate.errors) {
            console.log(++x);
            console.log(err.keyword);
            console.error(err);
        }
    }
    return false;
};
exports.validateBookConfig = validateBookConfig;
