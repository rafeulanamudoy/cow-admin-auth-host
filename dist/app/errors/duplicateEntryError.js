"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const duplicateEntryError = (error) => {
    console.log(error, 'i am from duplicate entry');
    const errors = [
        {
            path: '',
            message: error.message,
        },
    ];
    const statusCode = 400;
    // Add code here if you want to do something with the errors
    return {
        statusCode,
        message: 'Duplicate Entry',
        errorMessages: errors,
    };
};
exports.default = duplicateEntryError;
