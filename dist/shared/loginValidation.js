"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = void 0;
const zod_1 = require("zod");
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'Phone Number is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
exports.loginValidation = {
    loginZodSchema,
};
