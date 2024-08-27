import { prismaClient } from "../../prismaClient";
import { IGoogleUserRepository } from "../IGoogleUserRepository";
import { GoogleUser } from "../../entities/GoogleUser";

export class GoogleuserRepositoryPrisma implements IGoogleUserRepository {
  async get(id: string): Promise<GoogleUser> {
    const googleUser = await prismaClient.googleUser.findUnique({
      where: {
        googleId: id,
      },
    });
    if (!googleUser) return null;

    return GoogleUser.with({
      id: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
      googleId: googleUser.googleId,

      createdAt: googleUser.createdAt,
      updatedAt: googleUser.updatedAt,
    });
  }
}
