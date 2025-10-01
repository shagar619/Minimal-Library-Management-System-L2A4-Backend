import z from "zod";


export const createBookSchema = z.object({
     title: z.string().min(1),
     author: z.string().min(1),
     genre: z.string().min(1),
     isbn: z.string().min(5),
     description: z.string().optional(),
     copies: z.number().int().nonnegative(),
     available: z.boolean().optional()
});

export const updateBookSchema = createBookSchema.partial().extend({
  // id will be taken from params, but we keep this flexible
});