import { ProfileRepositoryPrisma } from "../../../repositories/implementations/ProfileRepositoryPrisma";
import { UpdateProfileController } from "./UpdateProfileController";
import { UpdateProfileUseCase } from "./UpdateProfileUseCase";

const profileRepositoryPrisma = new ProfileRepositoryPrisma();

const updateProfileUseCase = new UpdateProfileUseCase(profileRepositoryPrisma);
const updateProfileController = new UpdateProfileController(
  updateProfileUseCase
);

export { updateProfileUseCase, updateProfileController };
