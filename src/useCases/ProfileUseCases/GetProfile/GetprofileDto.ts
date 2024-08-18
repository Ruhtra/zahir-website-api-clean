import { Profile } from "../../../entities/Profile";

export interface IGetProfileResponseDto extends Pick<
    Profile,
    'id' |
    'createdAt' |
    'name' |
    'informations' |
    'telephones' |
    'local' |
    'movie' |
    'resume' |
    'categoryType' |
    'promotion'
> {
    picture: Profile['picture']['url']
}

export function MappingProfileResponseDto(profile: Profile): IGetProfileResponseDto {
    return {
        picture: profile.picture ? profile.picture.url : null,
        id: profile.id,
        createdAt: profile.createdAt,
        name: profile.name,
        informations: profile.informations,
        telephones: {
            telephone: profile.telephones.telephone,
            whatsapp: profile.telephones.whatsapp
        },
        local: {
            cep: profile.local.cep,
            city: profile.local.city,
            complement: profile.local.complement,
            lat: profile.local.lat,
            lng: profile.local.lng,
            neighborhood: profile.local.neighborhood,
            number: profile.local.number,
            street: profile.local.street,
            uf: profile.local.uf
        },
        movie: profile.movie,
        resume: profile.resume,
        categoryType: profile.categoryType,
        promotion: profile.promotion ? {
            description: profile.promotion.description,
            title: profile.promotion.title
        }: null
    }
}