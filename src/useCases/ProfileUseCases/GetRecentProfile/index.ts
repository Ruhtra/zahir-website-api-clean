import { ProfileRepositoryPrisma } from "../../../repositories/implementations/ProfileRepositoryPrisma";
import { GetRecentProfileController } from "./GetRecentProfileController";

const profileRepositoryPrisma = new ProfileRepositoryPrisma();

const getRecentProfileController = new GetRecentProfileController(
  profileRepositoryPrisma
);

export { getRecentProfileController };
