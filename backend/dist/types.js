"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBody = exports.signinBody = exports.signupBody = void 0;
const zod_1 = require("zod");
exports.signupBody = zod_1.z.object({
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(1).regex(/^[a-zA-Z]+$/),
    lastName: zod_1.z.string().min(1).regex(/^[a-zA-Z]+$/),
    password: zod_1.z.string().min(6),
});
exports.signinBody = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.updateBody = zod_1.z.object({
    email: zod_1.z.string().email(), // Removed unnecessary `.min(1).regex(...)`
    firstName: zod_1.z.string().min(1).regex(/^[a-zA-Z]+$/),
    lastName: zod_1.z.string().min(1).regex(/^[a-zA-Z]+$/),
    password: zod_1.z.string().min(6),
});
