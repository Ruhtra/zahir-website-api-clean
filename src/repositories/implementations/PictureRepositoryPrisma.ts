import { Picture } from "../../entities/Picture";
import { prismaClient } from "../../prismaClient";
import { IPictureRepository } from "../IPictureRepository";

export class PictureRespositoryPrisma implements IPictureRepository {
  async upsert(picture: Picture): Promise<void> {
    await prismaClient.picture.upsert({
      create: {
        key: picture.key,
        name: picture.name,
        url: picture.url,
        size: picture.size,
        profile: {
          connect: {
            id: picture.profileID,
          },
        },
      },
      update: {
        key: picture.key,
        name: picture.name,
        url: picture.url,
        size: picture.size,
      },
      where: {
        profileId: picture.profileID,
      },
    });
  }
}
