import express from "express";
import { getAllCategoryController } from "../useCases/CategoryUseCases/GetAllCategory";

const router = express.Router();

router.get("/all", (req, res) => getAllCategoryController.handle(req, res));

export { router };
