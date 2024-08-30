import { IUseCase } from "../../IUseCase";
import { UploadFileRequestDto, UploadFileResponseDto } from "./UploadFileDto";
import { randomUUID } from "crypto";
import { prismaClient } from "../../../prismaClient";
import { IBuketProvider } from "../../../providers/IBucketProvider";
import path from "path";
import { IPictureRepository } from "../../../repositories/IPictureRepository";
import { Picture } from "../../../entities/Picture";

//TO-DO: Fazer upsert no bucket pois no upsert do prisma não apaga a imagme anterior
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
    const fileKey = randomUUID().concat("-").concat(name).concat(fileExtension);

    const { url } = await this.bucketProvider.upload(
      fileKey,
      file as Express.Multer.File
    );

    try {
      const picture = Picture.create({
        key: fileKey,
        name: name,
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
