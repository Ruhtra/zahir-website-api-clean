import { HomePagePromotion } from "../entities/HomePagePromotion";

export interface IHomePagePromotionRepository {
  all: () => Promise<HomePagePromotion[]>;
}
