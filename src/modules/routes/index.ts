import { Router } from "express";
import bookRoute from "../book/book.route";
import borrowRoute from "../borrow/borrow.route";


const routes = Router();

routes.use("/books", bookRoute);
routes.use("/borrows", borrowRoute);

export default routes;