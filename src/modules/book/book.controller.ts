import { NextFunction, Request, Response } from "express";
import { json, success, ZodError } from "zod";
import { createBookSchema } from "../../validators/book.validators";
import { Book } from "./book.model";
import mongoose from "mongoose";


/**
 * POST /books
 */
const createBook = async(req: Request, res: Response) => {

     try {
          const parsed = createBookSchema.parse(req.body);
          const created = await Book.create({
          ...parsed,
          available: parsed.available ?? true
     });
          res.status(201).json({
          success: true,
          message: "New Book created successfully!",
          created
          });
          
}    catch (err) {
          if (err instanceof ZodError) {
          return res.status(400).json({ message: 'Validation error', issues: err });
     }
          // duplicate key example
          if ((err as any)?.code === 11000) {
          return res.status(409).json({ message: 'Duplicate key', detail: (err as any).keyValue });
     }
     console.error(err);
     res.status(500).json({ message: 'Server error' });
}
};


/**
 * GET /books
 * Query params:
 *  - limit, skip, genre, author
 */
const getAllBooks = async(req: Request, res: Response, next: NextFunction) => {

     try{
          // get all books
          const { limit = '100', skip = '0', genre, author } = req.query;
          const q: any = {};
          if (genre) q.genre = String(genre);
          if (author) q.author = String(author);

          const books = await Book.find(q)
               .limit(Number(limit))
               .skip(Number(skip))
               .sort({ createdAt: -1 })
               .exec();

          res.status(201).json({
               message: "Books retrieved successfully",
               success: true,
               books
          });

     } catch(error) {
          next(error);
     };
};


/**
 * GET /books/:id
 */
const getBookById = async(req: Request, res: Response, next: NextFunction) => {

     try {

          // get books by Id
          const { id } = req.params;

          if(!mongoose.isValidObjectId(id)) {
               return res.status(400).json({
                    success: false,
                    message: 'Invalid book ID',
                    error: { id },
               });
          }

          const book = await Book.findById(id).exec();

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

     } catch(error) {
          next(error);
     }
};





export const bookController = {
     createBook,
     getAllBooks,
     getBookById
};