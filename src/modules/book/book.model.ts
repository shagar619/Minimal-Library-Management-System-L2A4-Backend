import mongoose, { Schema } from "mongoose";
import { IBook } from "./book.interface";


const BookSchema: Schema = new Schema<IBook>({
     title: { 
          type: String, 
          required: true, 
          trim: true 
     },
     author: { 
          type: String, 
          required: true, 
          trim: true 
     },
     genre: { 
          type: String, 
          required: true, 
          trim: true },
     isbn: { 
          type: String, 
          required: true, 
          trim: true, 
          unique: true 
     },
     description: { 
          type: String, 
          default: '' 
     },
     copies: { 
          type: Number, 
          required: true, 
          min: 0 
     },
     available: { 
          type: Boolean, 
          required: true, 
          default: true 
     },
},
     { 
          timestamps: true,
          versionKey: false
     }
);

// Create an index on isbn to avoid duplicates in real app
BookSchema.index({ isbn: 1 }, { unique: true });

export const Book = mongoose.model<IBook>('Book', BookSchema);