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
exports.borrowController = void 0;
const borrow_model_1 = require("./borrow.model");
const borrow_validators_1 = require("../../validators/borrow.validators");
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
// POST /borrows → Borrow a book
const borrowBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = borrow_validators_1.borrowBookSchema.parse(req.body);
        const newBorrow = yield borrow_model_1.Borrow.create(Object.assign(Object.assign({}, parsed), { bookTitle: req.body.bookTitle || 'Unknown Book', isbn: req.body.isbn || 'N/A' }));
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully!',
            created: newBorrow,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError)
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                issues: err,
            });
        res.status(500).json({
            success: false,
            message: 'Server error',
        });
    }
});
// GET /borrows → all borrow records
const getAllBorrows = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const borrows = yield borrow_model_1.Borrow.find().sort({ borrowedAt: -1 });
    try {
        res.status(200).json({
            success: true,
            message: 'Borrows retrieved successfully',
            borrows,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
        });
    }
});
// GET /borrows/summary → total quantity borrowed per book
const getBorrowSummary = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: { bookTitle: '$bookTitle', isbn: '$isbn' },
                    totalQuantityBorrowed: { $sum: '$quantity' },
                },
            },
            {
                $project: {
                    _id: 0,
                    bookTitle: '$_id.bookTitle',
                    isbn: '$_id.isbn',
                    totalQuantityBorrowed: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: 'Borrow summary generated',
            summary,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: `Something went wrong to get books summary!`
        });
    }
});
// PUT /borrows/:id
const updateBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id))
            return res.status(400).json({
                success: false,
                message: 'Invalid Borrow ID'
            });
        const parsed = borrow_validators_1.updateBorrowSchema.parse(req.body);
        const updated = yield borrow_model_1.Borrow.findByIdAndUpdate(id, parsed, { new: true }).exec();
        if (!updated)
            return res.status(404).json({
                success: false,
                message: 'Borrow not found!'
            });
        res.status(200).json({
            success: true,
            message: 'Borrow updated successfully',
            updated,
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError)
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                issues: err
            });
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
        });
    }
});
// DELETE /borrows/:id
const deleteBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.isValidObjectId(id))
            return res.status(400).json({
                success: false,
                message: 'Invalid Borrow ID',
            });
        const deleted = yield borrow_model_1.Borrow.findByIdAndDelete(id);
        if (!deleted)
            return res.status(404).json({
                success: false,
                message: 'Borrow not found',
            });
        res.status(200).json({
            success: true,
            message: 'Borrow deleted successfully',
            id: deleted._id,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong!',
        });
    }
});
exports.borrowController = {
    borrowBook,
    getAllBorrows,
    getBorrowSummary,
    updateBorrow,
    deleteBorrow,
};
