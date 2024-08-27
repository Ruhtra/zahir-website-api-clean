import { ProfileRepositoryPrisma } from "../../../repositories/implementations/ProfileRepositoryPrisma";
import { GetProfileController } from "./GetProfileController";

const profileRepositoryPrisma = new ProfileRepositoryPrisma();

const getProfileController = new GetProfileController(profileRepositoryPrisma);

export { getProfileController };
