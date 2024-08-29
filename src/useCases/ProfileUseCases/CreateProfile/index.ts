import { ProfileRepositoryPrisma } from "../../../repositories/implementations/ProfileRepositoryPrisma";
import { CreateProfileController } from "./CreateProfileController";
import { CreateProfileUseCase } from "./CreateProfileUseCase";

const profileRepositoryPrisma = new ProfileRepositoryPrisma();

const createProfileUseCase = new CreateProfileUseCase(profileRepositoryPrisma);
const createProfileController = new CreateProfileController(
  createProfileUseCase
);

export { createProfileUseCase, createProfileController };
