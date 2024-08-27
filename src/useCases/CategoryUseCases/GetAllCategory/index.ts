import { CategoryRepositoryPrisma } from "../../../repositories/implementations/CategoryRepositoryPrisma";
import { GetAllCategoryController } from "./GetAllCategoryController";

const categoryRepositoryPrisma = new CategoryRepositoryPrisma();

const getAllCategoryController = new GetAllCategoryController(
  categoryRepositoryPrisma
);

export { getAllCategoryController };
