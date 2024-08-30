import { IUseCase } from "../../IUseCase";
import { UploadFileRequestDto, UploadFileResponseDto } from "./UploadFileDto";
import { randomUUID } from "crypto";
import { prismaClient } from "../../../prismaClient";
import { IBuketProvider } from "../../../providers/IBucketProvider";
import path from "path";

export class UploadFileUseCase
  implements IUseCase<UploadFileRequestDto, UploadFileResponseDto>
{
  constructor(private bucketProvider: IBuketProvider) {}

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
      const picture = await prismaClient.picture.upsert({
        where: {
          profileId: idProfile,
        },
        update: {
          name: name,
          key: fileKey,
          url: url,
          size: file.size,
        },
        create: {
          name: file.originalname,
          key: fileKey,
          url: url,
          size: file.size,
          profile: {
            connect: {
              id: idProfile,
            },
          },
        },
      });
      return { id: picture.id };
    } catch (error) {
      await this.bucketProvider.delete(fileKey);
      throw error;
    }
  }
}
