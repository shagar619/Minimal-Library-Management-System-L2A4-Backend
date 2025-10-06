import z from 'zod';

export const borrowBookSchema = z.object({
     bookId: z.string().min(1, 'Book ID is required'),
     quantity: z.number().int().positive('Quantity must be at least 1'),
     dueDate: z.string().min(1, 'Due date is required'),
});

export const updateBorrowSchema = borrowBookSchema.partial();
