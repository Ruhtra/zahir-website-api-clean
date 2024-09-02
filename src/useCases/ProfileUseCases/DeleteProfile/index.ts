import { ProfileRepositoryPrisma } from "../../../repositories/implementations/ProfileRepositoryPrisma";
import { DeleteProfileController } from "./DeleteProfileController";
import { DeleteProfileUseCase } from "./DeleteProfileUseCase";

const profileRepositoryPrisma = new ProfileRepositoryPrisma();

const deleteProfileUseCase = new DeleteProfileUseCase(profileRepositoryPrisma);
const deleteProfileController = new DeleteProfileController(
  deleteProfileUseCase
);

export { deleteProfileUseCase, deleteProfileController };
