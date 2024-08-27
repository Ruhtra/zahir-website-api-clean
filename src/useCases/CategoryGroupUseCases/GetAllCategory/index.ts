import { CategoryGroupRepositoryPrisma } from "../../../repositories/implementations/CategoryGroupRepositoryPrisma";
import { GetAllCategoryGroupController } from "./GetAllCategoryGroupController";

const categoryGroupRepositoryPrisma = new CategoryGroupRepositoryPrisma();

const getAllCategoryGroupController = new GetAllCategoryGroupController(
  categoryGroupRepositoryPrisma
);

export { getAllCategoryGroupController };
