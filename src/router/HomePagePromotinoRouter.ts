import express from "express";
import { getAllHomePagePromotionController } from "../useCases/HomePagePromotionUseCases/GetAllHomePagePromotion";
import { insertHomePagePromotionController } from "../useCases/HomePagePromotionUseCases/InsertHomePagePromotion";

const router = express.Router();

router.get("/all", (req, res) =>
  getAllHomePagePromotionController.handle(req, res)
);
router.post("/create", (req, res) =>
  insertHomePagePromotionController.handle(req, res)
);

export { router };
