import { HomePagePromotionRepositoryPrisma } from "../../../repositories/implementations/HomePagePromotionRepositoryPrisma";
import { InsertHomePagePromotionController } from "./InsertHomePagePromotionController";
import { InsertHomePagePromotionUseCase } from "./InsertHomePagePromotionUseCase";

const homePagePromotionRepository = new HomePagePromotionRepositoryPrisma();

const insertHomePagePromotionUseCase = new InsertHomePagePromotionUseCase(
  homePagePromotionRepository
);
const insertHomePagePromotionController = new InsertHomePagePromotionController(
  insertHomePagePromotionUseCase
);

export { insertHomePagePromotionController, insertHomePagePromotionUseCase };
