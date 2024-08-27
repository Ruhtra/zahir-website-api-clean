import express from "express";
import { getAllCategoryGroupController } from "../useCases/CategoryGroupUseCases/GetAllCategory";

const router = express.Router();

router.get("/all", (req, res) =>
  getAllCategoryGroupController.handle(req, res)
);

export { router };
