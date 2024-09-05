import { HomePagePromotion } from "../../entities/HomePagePromotion";
import { Picture } from "../../entities/Picture";
import { Profile } from "../../entities/Profile";
import { prismaClient } from "../../prismaClient";
import { IHomePagePromotionRepository } from "../IHomePagePromotionRepository";

export class HomePagePromotionRepositoryPrisma
  implements IHomePagePromotionRepository
{
  async create(hpp: HomePagePromotion): Promise<void> {
    await prismaClient.homePagePromotion.create({
      data: {
        order: hpp.order,
        profileId: hpp.profileId,
      },
    });
  }
  async remove(profileId: string): Promise<void> {
    await prismaClient.homePagePromotion.delete({
      where: {
        profileId: profileId,
      },
    });
  }
  async all(): Promise<HomePagePromotion[]> {
    const homePagePromotions = await prismaClient.homePagePromotion.findMany({
      include: {
        profile: {
          include: {
            address: true,
            picture: true,
            promotion: true,
          },
        },
      },
    });

    return homePagePromotions.map((hpp) => {
      return HomePagePromotion.with({
        id: hpp.id,
        order: hpp.order,
        profile: Profile.with({
          id: hpp.profile.id,
          name: hpp.profile.name,
          informations: hpp.profile.informations,
          movie: hpp.profile.movie,
          resume: hpp.profile.resume,
          createdAt: hpp.profile.createdAt,
          address: !hpp.profile.address
            ? null
            : {
                id: hpp.profile.address.id,
                cep: hpp.profile.address.cep,
                city: hpp.profile.address.city,
                complement: hpp.profile.address.complement,
                lat: hpp.profile.address.lat,
                lng: hpp.profile.address.lng,
                neighborhood: hpp.profile.address.neighborhood,
                number: hpp.profile.address.number,
                street: hpp.profile.address.street,
                uf: hpp.profile.address.uf,
              },
          picture: !hpp.profile.picture
            ? null
            : Picture.with({
                id: hpp.profile.picture.id,
                key: hpp.profile.picture.key,
                path: hpp.profile.picture.path,
                size: hpp.profile.picture.size,
                url: hpp.profile.picture.url,
              }),
          promotion: !hpp.profile.promotion
            ? null
            : {
                id: hpp.profile.promotion.id,
                title: hpp.profile.promotion.title,
                description: hpp.profile.promotion.description,
              },
        }),
      });
    });
  }
}
