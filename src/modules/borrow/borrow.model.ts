import mongoose, { Schema } from "mongoose";
import { BorrowDocument } from "./borrow.interface";


const borrowSchema = new Schema<BorrowDocument>(
{
     bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
     bookTitle: { type: String, required: true },
     isbn: { type: String, required: true },
     quantity: { type: Number, required: true, min: 1 },
     dueDate: { type: Date, required: true },
     borrowedAt: { type: Date, default: Date.now },
     returned: { type: Boolean, default: true },
},
{ 
     timestamps: true,
     versionKey: false
}
);

export const Borrow = mongoose.model<BorrowDocument>('Borrow', borrowSchema);