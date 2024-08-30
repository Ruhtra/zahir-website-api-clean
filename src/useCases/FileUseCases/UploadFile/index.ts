import { BucketSupabaseProvider } from "../../../providers/implementations/BucketSupabaseProvider";
import { PictureRespositoryPrisma } from "../../../repositories/implementations/PictureRepositoryPrisma";
import { UploadFileController } from "./UploadFileController";
import { UploadFileUseCase } from "./UploadFileUseCase";

const bucketSupabaseProvider = new BucketSupabaseProvider();
const pictureRespositoryPrisma = new PictureRespositoryPrisma();

const uploadFileUseCase = new UploadFileUseCase(
  bucketSupabaseProvider,
  pictureRespositoryPrisma
);
const uploadFileController = new UploadFileController(uploadFileUseCase);

export { uploadFileUseCase, uploadFileController };
