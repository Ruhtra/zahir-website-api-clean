import { BucketSupabaseProvider } from "../../../providers/implementations/BucketSupabaseProvider";
import { UploadFileController } from "./UploadFileController";
import { UploadFileUseCase } from "./UploadFileUseCase";

const bucketSupabaseProvider = new BucketSupabaseProvider();

const uploadFileUseCase = new UploadFileUseCase(bucketSupabaseProvider);
const uploadFileController = new UploadFileController(uploadFileUseCase);

export { uploadFileUseCase, uploadFileController };
