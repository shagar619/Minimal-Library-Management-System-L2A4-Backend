import { Router } from "express";
import { borrowController } from "./borrow.controller";


const borrowRoute = Router();

borrowRoute.post("/", borrowController.borrowBook);
borrowRoute.get("/", borrowController.getAllBorrows);
borrowRoute.get("/summary", borrowController.getBorrowSummary);
borrowRoute.put("/:id", borrowController.updateBorrow);
borrowRoute.delete("/:id", borrowController.deleteBorrow);

export default borrowRoute;