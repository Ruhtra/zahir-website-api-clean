import { HomePagePromotion } from "../../../entities/HomePagePromotion.js";

export interface GetAllHomePagePromotionResponseDto {
  id: string;
  order: number;
  profile: {
    id: string;
    name: string;
    picture?: string;
    address?: {
      city: string;
      uf: string;
    };
    promotion: {
      id: string;
      title: string;
      description?: string;
    };
  };
}

export function MappingHomePagePromotionResponseDto(
  homePagePromotion: HomePagePromotion
): GetAllHomePagePromotionResponseDto {
  return {
    id: homePagePromotion.id,
    order: homePagePromotion.order,
    profile: {
      id: homePagePromotion.profile.id,
      picture: homePagePromotion.profile.picture?.url,
      name: homePagePromotion.profile.name,
      address: !homePagePromotion.profile.address
        ? null
        : {
            city: homePagePromotion.profile.address.city,
            uf: homePagePromotion.profile.address.uf,
          },
      promotion: !homePagePromotion.profile.promotion
        ? null
        : {
            id: homePagePromotion.profile.promotion.id,
            title: homePagePromotion.profile.promotion.title,
            description: homePagePromotion.profile.promotion.description,
          },
    },
  };
}

export function MappingListHomePagePromotionResponseDto(
  homePagePromotion: HomePagePromotion[]
): GetAllHomePagePromotionResponseDto[] {
  return homePagePromotion.map((e) => {
    return MappingHomePagePromotionResponseDto(e);
  });
}
