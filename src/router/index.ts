import express from "express";
import { router as categoryGroupRoute } from "./CategoryGroupRoute";
import { router as categoryRoute } from "./CategoryRoute";
import { router as homePagePromotionRoute } from "./HomePagePromotinoRouter";
import { router as profileRoute } from "./ProfileRouter";
import { router as FileRoute } from "./FileRouter";

const router = express.Router();

router.use("/category", categoryRoute);
router.use("/categoryGroup", categoryGroupRoute);
router.use("/homePagePromotion", homePagePromotionRoute);
router.use("/profile", profileRoute);
router.use("/file", FileRoute);

export { router };
