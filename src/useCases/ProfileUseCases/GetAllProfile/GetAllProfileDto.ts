import { Profile } from "../../../entities/Profile";

export interface IGetAllProfileResposeDto {
  id: string;
  name: string;
  picture?: string;
  promotion?: {
    id: string;
    title: string;
    description?: string;
  };
  address?: {
    city: string;
    uf: string;
  };
  categoryGroup?: {
    id: string;
    name: string;
  }[];
  category?: {
    id: string;
    name: string;
  }[];
}

export function MappingListAllProfileResponseDto(
  profiles: Profile[]
): IGetAllProfileResposeDto[] {
  return profiles.map((p) => {
    return {
      id: p.id,
      name: p.name,
      picture: p.picture?.url,
      categoryGroup: !p.categoryGroup
        ? null
        : p.categoryGroup.map((cp) => {
            return {
              id: cp.name,
              name: cp.name,
            };
          }),
      category: !p.category
        ? null
        : p.category.map((c) => {
            return {
              id: c.name,
              name: c.name,
            };
          }),
      promotion: !p.promotion
        ? null
        : {
            id: p.promotion.id,
            description: p.promotion.description,
            title: p.promotion.title,
          },
      address: !p.promotion
        ? null
        : {
            city: p.address.city,
            uf: p.address.uf,
          },
    };
  });
}
