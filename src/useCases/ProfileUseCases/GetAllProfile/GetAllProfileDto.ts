import { ProfileWithCategorie } from "../../../entities/Profile";


export interface IGetAllProfileResposeDto extends Pick<
    ProfileWithCategorie,
    'id' |
    'name' |
    'picture' |
    'categoryType' |
    'promotion'
> {
    local: Pick<ProfileWithCategorie['local'], 'city' | 'uf'>
    categorie: Pick<ProfileWithCategorie['categorie'][number], 'id' | 'name'>[]
}


export function MappingListAllProfileResponseDto(profiles: ProfileWithCategorie[]): IGetAllProfileResposeDto[] {
    return profiles.map(profile => {
        return {
            local: {
                city: profile.local.city,
                uf: profile.local.uf
            },
            categorie: profile.categorie.map((c) => {
                return {
                    id: c.id,
                    name: c.name
                }
            }),
            id: profile.id,
            name: profile.name,
            picture: profile.picture ? {
                key: profile.picture.key,
                name: profile.picture.name,
                size: profile.picture.size,
                url: profile.picture.url
            }: null,
            categoryType: profile.categoryType,
            promotion: profile.promotion ? {
                description: profile.promotion.description,
                title: profile.promotion.title
            }: null
        }
    })
}