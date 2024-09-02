import { BucketSupabaseProvider } from "../../../providers/implementations/BucketSupabaseProvider";
import { PictureRespositoryPrisma } from "../../../repositories/implementations/PictureRepositoryPrisma";
import { ProfileRepositoryPrisma } from "../../../repositories/implementations/ProfileRepositoryPrisma";
import { DeleteProfileController } from "./DeleteProfileController";
import { DeleteProfileUseCase } from "./DeleteProfileUseCase";

const profileRepositoryPrisma = new ProfileRepositoryPrisma();
const pictureRepositoryPrisma = new PictureRespositoryPrisma();
const bucketSupabaseProvider = new BucketSupabaseProvider();

const deleteProfileUseCase = new DeleteProfileUseCase(
  profileRepositoryPrisma,
  pictureRepositoryPrisma,
  bucketSupabaseProvider
);
const deleteProfileController = new DeleteProfileController(
  deleteProfileUseCase
);

export { deleteProfileUseCase, deleteProfileController };
