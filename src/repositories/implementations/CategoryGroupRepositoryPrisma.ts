import { CategoryGroup } from "../../entities/CategoryGroup";
import { prismaClient } from "../../prismaClient";
import { ICategoryGroupRepository } from "../ICategoryGroupRepository";

export class CategoryGroupRepositoryPrisma implements ICategoryGroupRepository {
  async all(): Promise<CategoryGroup[]> {
    const categories = await prismaClient.categoryGroup.findMany({});

    return categories.map((c) => {
      return CategoryGroup.with({
        id: c.id,
        name: c.name,
      });
    });
  }
}
