"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookSchema = exports.createBookSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createBookSchema = zod_1.default.object({
    title: zod_1.default.string().min(1),
    author: zod_1.default.string().min(1),
    genre: zod_1.default.string().min(1),
    isbn: zod_1.default.string().min(5),
    description: zod_1.default.string().optional(),
    copies: zod_1.default.number().int().nonnegative(),
    available: zod_1.default.boolean().optional()
});
exports.updateBookSchema = exports.createBookSchema.partial().extend({
// id will be taken from params, but we keep this flexible
});
