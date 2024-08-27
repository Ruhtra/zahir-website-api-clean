import { HomePagePromotionRepositoryPrisma } from "../../../repositories/implementations/HomePagePromotionRepositoryPrisma";
import { GetAllHomePagePromotionController } from "./GetAllHomePagePromotionController";

const homePagePromotionRepository = new HomePagePromotionRepositoryPrisma();

const getAllHomePagePromotionController = new GetAllHomePagePromotionController(
  homePagePromotionRepository
);

export { getAllHomePagePromotionController };
