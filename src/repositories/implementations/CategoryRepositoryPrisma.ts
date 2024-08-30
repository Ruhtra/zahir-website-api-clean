import { Category } from "../../entities/Category";
import { prismaClient } from "../../prismaClient";
import { ICategoryRepository } from "../ICategoryRepository";

export class CategoryRepositoryPrisma implements ICategoryRepository {
  async all(): Promise<Category[]> {
    const categories = await prismaClient.category.findMany({});

    return categories.map((c) => {
      return Category.with({
        // id: c.id,
        name: c.name,
      });
    });
  }
}
