import { Router } from "express";
import { bookController } from "./book.controller";


const bookRoute = Router();

bookRoute.post("/", bookController.createBook);
bookRoute.get("/:id", bookController.getBookById);
bookRoute.put("/:id", bookController.updateBook);
bookRoute.delete("/:id", bookController.deleteBook);
bookRoute.get("/", bookController.getAllBooks);


export default bookRoute;