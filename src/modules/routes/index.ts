import { Router } from "express";
import bookRoute from "../book/book.route";


const routes = Router();

routes.use("/book", bookRoute);

export default routes;