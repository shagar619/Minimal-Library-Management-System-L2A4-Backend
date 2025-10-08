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
exports.bookController = void 0;
const zod_1 = require("zod");
const book_validators_1 = require("../../validators/book.validators");
const book_model_1 = require("./book.model");
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * POST /books
 */
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const parsed = book_validators_1.createBookSchema.parse(req.body);
        const created = yield book_model_1.Book.create(Object.assign(Object.assign({}, parsed), { available: (_a = parsed.available) !== null && _a !== void 0 ? _a : true }));
        res.status(201).json({
            success: true,
            message: "New Book created successfully!",
            created
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                issues: err
            });
        }
        // duplicate key example
        if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
            return res.status(409).json({
                message: 'Duplicate key',
                detail: err.keyValue
            });
        }
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
        });
    }
});
/**
 * GET /books
 * Query params:
 *  - limit, skip, genre, author
 */
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get all books
        const { limit = '100', skip = '0', genre, author } = req.query;
        const q = {};
        if (genre)
            q.genre = String(genre);
        if (author)
            q.author = String(author);
        const books = yield book_model_1.Book.find(q)
            .limit(Number(limit))
            .skip(Number(skip))
            .sort({ createdAt: -1 })
            .exec();
        res.status(201).json({
            message: "Books retrieved successfully",
            success: true,
            books
        });
    }
    catch (error) {
        next(error);
    }
    ;
});
/**
 * GET /books/:id
 */
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // get books by Id
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID',
                error: { id },
            });
        }
        const book = yield book_model_1.Book.findById(id).exec();
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book Not Found",
                error: { id },
            });
        }
        res.status(201).json({
            success: true,
            message: "Book retrieved successfully",
            book,
        });
    }
    catch (error) {
        next(error);
    }
});
/**
 * PUT /books/:id
 */
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // update by
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Book ID",
                error: { id },
            });
        }
        const parsed = book_validators_1.updateBookSchema.parse(req.body);
        const updated = yield book_model_1.Book.findByIdAndUpdate(id, parsed, { new: true, runValidators: true }).exec();
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
                error: { id }
            });
        }
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            updated
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                issues: err
            });
        }
        if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
            return res.status(409).json({
                message: 'Duplicate key',
                detail: err.keyValue
            });
        }
        next(err);
    }
});
/**
 * DELETE /books/:id
 */
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // delete a book
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Book ID",
                error: { id },
            });
        }
        const deleted = yield book_model_1.Book.findByIdAndDelete(id).exec();
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
                error: { id },
            });
        }
        res.status(201).json({
            success: true,
            message: 'Book Deleted Successfully!',
            id: deleted._id,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.bookController = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
