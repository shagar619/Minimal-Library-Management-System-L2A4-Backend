"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBorrowSchema = exports.borrowBookSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.borrowBookSchema = zod_1.default.object({
    bookId: zod_1.default.string().min(1, 'Book ID is required'),
    quantity: zod_1.default.number().int().positive('Quantity must be at least 1'),
    dueDate: zod_1.default.string().min(1, 'Due date is required'),
});
exports.updateBorrowSchema = exports.borrowBookSchema.partial();
