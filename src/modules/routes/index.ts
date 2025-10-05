import { Router } from "express";
import bookRoute from "../book/book.route";


const routes = Router();

routes.use("/books", bookRoute);

export default routes;