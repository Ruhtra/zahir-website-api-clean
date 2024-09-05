import { HomePagePromotion } from "../entities/HomePagePromotion";

export interface IHomePagePromotionRepository {
  all: () => Promise<HomePagePromotion[]>;
  create: (hpp: HomePagePromotion) => Promise<void>;
  remove: (profileId: string) => Promise<void>;
}
