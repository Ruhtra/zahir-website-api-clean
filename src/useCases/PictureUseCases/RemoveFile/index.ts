import { PictureRespositoryPrisma } from "../../../repositories/implementations/PictureRepositoryPrisma";
import { BucketSupabaseProvider } from "../../../providers/implementations/BucketSupabaseProvider";
import { RemoveFileUseCase } from "./RemoveFileUseCase";
import { RemoveFileController } from "./RemoveFileController";

const bucketSupabaseProvider = new BucketSupabaseProvider();
const pictureRespositoryPrisma = new PictureRespositoryPrisma();

const removeFileUseCase = new RemoveFileUseCase(
  bucketSupabaseProvider,
  pictureRespositoryPrisma
);
const removeFileController = new RemoveFileController(removeFileUseCase);

export { removeFileController, removeFileUseCase };
