
import { Request, Response, NextFunction } from 'express';
import { Borrow } from './borrow.model';
import { borrowBookSchema, updateBorrowSchema } from '../../validators/borrow.validators';
import { ZodError } from 'zod';
import mongoose from 'mongoose';

// POST /borrows → Borrow a book
const borrowBook = async (req: Request, res: Response) => {
try {
     const parsed = borrowBookSchema.parse(req.body);

     const newBorrow = await Borrow.create({
          ...parsed,
          bookTitle: req.body.bookTitle || 'Unknown Book',
          isbn: req.body.isbn || 'N/A',
     });

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully!',
      created: newBorrow,
    });
  } catch (err) {
    if (err instanceof ZodError)
      return res.status(400).json({ message: 'Validation error', issues: err });
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /borrows → all borrow records
const getAllBorrows = async (_req: Request, res: Response) => {
  const borrows = await Borrow.find().sort({ borrowedAt: -1 });
  res.status(200).json({
    success: true,
    message: 'Borrows retrieved successfully',
    borrows,
  });
};

// GET /borrows/summary → total quantity borrowed per book
const getBorrowSummary = async (_req: Request, res: Response) => {
  const summary = await Borrow.aggregate([
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
};

// PUT /borrows/:id
const updateBorrow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ success: false, message: 'Invalid Borrow ID' });

    const parsed = updateBorrowSchema.parse(req.body);

    const updated = await Borrow.findByIdAndUpdate(id, parsed, { new: true }).exec();
    if (!updated)
      return res.status(404).json({ success: false, message: 'Borrow not found' });

    res.status(200).json({
      success: true,
      message: 'Borrow updated successfully',
      updated,
    });
  } catch (err) {
    if (err instanceof ZodError)
      return res.status(400).json({ message: 'Validation error', issues: err });
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /borrows/:id
const deleteBorrow = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id))
    return res.status(400).json({ success: false, message: 'Invalid Borrow ID' });

  const deleted = await Borrow.findByIdAndDelete(id);
  if (!deleted)
    return res.status(404).json({ success: false, message: 'Borrow not found' });

  res.status(200).json({
    success: true,
    message: 'Borrow deleted successfully',
    id: deleted._id,
  });
};

export const borrowController = {
  borrowBook,
  getAllBorrows,
  getBorrowSummary,
  updateBorrow,
  deleteBorrow,
};
