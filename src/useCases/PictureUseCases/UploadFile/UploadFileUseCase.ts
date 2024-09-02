import { IUseCase } from "../../IUseCase";
import { UploadFileRequestDto, UploadFileResponseDto } from "./UploadFileDto";
import { IBuketProvider } from "../../../providers/IBucketProvider";
import path from "path";
import { IPictureRepository } from "../../../repositories/IPictureRepository";
import { Picture } from "../../../entities/Picture";

export class UploadFileUseCase
  implements IUseCase<UploadFileRequestDto, UploadFileResponseDto>
{
  constructor(
    private bucketProvider: IBuketProvider,
    private pictureRepository: IPictureRepository
  ) {}

  async execute({
    file,
    idProfile,
    name,
  }: UploadFileRequestDto): Promise<UploadFileResponseDto> {
    const fileExtension = path.extname(file.originalname);
    const fileKey = idProfile.concat(fileExtension);
    const pathKey = path.join("public", fileKey);

    const { url } = await this.bucketProvider.upload(
      pathKey,
      file as Express.Multer.File
    );

    try {
      const picture = Picture.create({
        key: fileKey,
        path: pathKey,
        size: file.size,
        url: url,
        profileID: idProfile,
      });

      await this.pictureRepository.upsert(picture);

      return { url: url };
    } catch (error) {
      await this.bucketProvider.delete(fileKey);
      throw error;
    }
  }
}
