import { CategoryGroup } from "../entities/CategoryGroup";

export interface ICategoryGroupRepository {
  all: () => Promise<CategoryGroup[]>;
}
