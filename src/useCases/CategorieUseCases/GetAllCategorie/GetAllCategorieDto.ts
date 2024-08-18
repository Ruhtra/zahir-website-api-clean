import { Categorie } from "../../../entities/Categorie";

export interface GetAllCategorieResponseDto extends Pick<
    Categorie,
    'id' |
    'name'
> { }

export function MappingCategorieResponseDto(categorie: Categorie): GetAllCategorieResponseDto {
    return {
        id: categorie.id,
        name: categorie.name
    }
}
export function MappingListCategorieResponseDto(categories: Categorie[]): GetAllCategorieResponseDto[] {
    return categories.map(e => {
        return MappingCategorieResponseDto(e)
    })
}