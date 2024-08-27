import { Profile } from "../../../entities/Profile";

export interface IGetProfileRequestDto {
  id: string;
}

export interface IGetProfileResponseDto {
  id: string;
  name: string;
  informations?: string;
  movie?: string;
  resume?: string;
  address?: {
    id: string;
    cep: string;
    city: string;
    complement?: string;
    lat: number;
    lng: number;
    neighborhood: string;
    number: string;
    street: string;
    uf: string;
  };
  picture?: string;
  promotion?: {
    id: string;
    title: string;
    description?: string;
  };
  telephone?: {
    id: string;
    telephone: string[];
    whatsapp: string[];
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
export function MappingProfileResponseDto(
  profile: Profile
): IGetProfileResponseDto {
  return {
    id: profile.id,
    name: profile.name,
    informations: profile.informations,
    movie: profile.movie,
    resume: profile.resume,
    address: !profile.address
      ? null
      : {
          id: profile.address.id,
          cep: profile.address.cep,
          city: profile.address.city,
          complement: profile.address.complement,
          lat: profile.address.lat,
          lng: profile.address.lng,
          neighborhood: profile.address.neighborhood,
          number: profile.address.number,
          street: profile.address.street,
          uf: profile.address.uf,
        },
    picture: profile.picture?.url,
    telephone: !profile.telephone
      ? null
      : {
          id: profile.telephone.id,
          telephone: profile.telephone.telephone,
          whatsapp: profile.telephone.whatsapp,
        },
    promotion: !profile.promotion
      ? null
      : {
          id: profile.promotion.id,
          description: profile.promotion.description,
          title: profile.promotion.title,
        },
    categoryGroup: !profile.categoryGroup
      ? null
      : profile.categoryGroup.map((cg) => {
          return {
            id: cg.id,
            name: cg.name,
          };
        }),
    category: !profile.category
      ? null
      : profile.category.map((c) => {
          return {
            id: c.id,
            name: c.name,
          };
        }),
  };
}
