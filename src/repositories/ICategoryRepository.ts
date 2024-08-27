import { Category } from "../entities/Category";

export interface ICategoryRepository {
  all: () => Promise<Category[]>;
}
