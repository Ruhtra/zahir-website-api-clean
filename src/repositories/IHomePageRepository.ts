import { HomePageWithProfile } from "../entities/HomePage.ts";

export interface IHomePageRepository {
  all: () => Promise<HomePageWithProfile[]>;
}
