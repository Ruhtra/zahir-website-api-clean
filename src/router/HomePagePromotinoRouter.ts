import express from "express";
import { getAllHomePagePromotionController } from "../useCases/HomePagePromotionUseCases/GetAllHomePagePromotion";

const router = express.Router();

router.get("/all", (req, res) =>
  getAllHomePagePromotionController.handle(req, res)
);

export { router };
