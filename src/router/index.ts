import express from "express";
import { router as categoryGroupRoute } from "./CategoryGroupRoute";
import { router as categoryRoute } from "./CategoryRoute";
import { router as homePagePromotionRoute } from "./HomePagePromotinoRouter";
import { router as profileRoute } from "./ProfileRouter";

const router = express.Router();

router.use("/category", categoryRoute);
router.use("/categoryGroup", categoryGroupRoute);
router.use("/homePagePromotion", homePagePromotionRoute);
router.use("/profile", profileRoute);

export { router };
