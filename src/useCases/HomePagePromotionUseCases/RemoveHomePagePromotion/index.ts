import { HomePagePromotionRepositoryPrisma } from "../../../repositories/implementations/HomePagePromotionRepositoryPrisma";
import { RemoveHomePagePromotionController } from "./RemoveHomePagePromotionController";
import { RemoveHomePagePromotionUseCase } from "./RemoveHomePagePromotionUseCase";

const homePagePromotionRepository = new HomePagePromotionRepositoryPrisma();

const removeHomePagePromotionUseCase = new RemoveHomePagePromotionUseCase(
  homePagePromotionRepository
);
const removeHomePagePromotionController = new RemoveHomePagePromotionController(
  removeHomePagePromotionUseCase
);

export { removeHomePagePromotionController, removeHomePagePromotionUseCase };
