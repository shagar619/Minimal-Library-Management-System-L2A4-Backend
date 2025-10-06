import mongoose from "mongoose";


export interface BorrowDocument extends Document {
     bookId: mongoose.Types.ObjectId;
     bookTitle: string;
     isbn: string;
     quantity: number;
     dueDate: Date;
     borrowedAt: Date;
     returned: boolean;
}