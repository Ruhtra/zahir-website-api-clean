import { Picture } from "../../entities/Picture";
import { prismaClient } from "../../prismaClient";
import { IPictureRepository } from "../IPictureRepository";

//TO-DO REMOVE THE OR THROW IN FINDUNIQUE
export class PictureRespositoryPrisma implements IPictureRepository {
  async get(profileId: string): Promise<Picture> {
    const picture = await prismaClient.picture.findUniqueOrThrow({
      where: {
        profileId: profileId,
      },
    });

    return Picture.with({
      id: picture.id,
      key: picture.key,
      path: picture.path,
      size: picture.size,
      url: picture.url,
    });
  }
  async upsert(picture: Picture): Promise<void> {
    await prismaClient.picture.upsert({
      create: {
        key: picture.key,
        path: picture.path,
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
        path: picture.path,
        url: picture.url,
        size: picture.size,
      },
      where: {
        profileId: picture.profileID,
      },
    });
  }

  async remove(id: string): Promise<void> {
    await prismaClient.picture.delete({
      where: {
        id: id,
      },
    });
  }
}
