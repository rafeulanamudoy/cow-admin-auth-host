"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const errors = [
        {
            path: error.path,
            message: error.message,
        },
    ];
    const statusCode = 400;
    // Add code here if you want to do something with the errors
    return {
        statusCode,
        message: 'Cast Error',
        errorMessages: errors,
    };
};
exports.default = handleCastError;
