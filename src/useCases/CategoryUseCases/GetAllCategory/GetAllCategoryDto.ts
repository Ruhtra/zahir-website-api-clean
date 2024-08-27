import { Category } from "../../../entities/Category";

export interface GetAllCategoryResponseDto {
  id: string;
  name: string;
}

export function MappingCategoryResponseDto(
  category: Category
): GetAllCategoryResponseDto {
  return {
    id: category.id,
    name: category.name,
  };
}
export function MappingListCategoryResponseDto(
  category: Category[]
): GetAllCategoryResponseDto[] {
  return category.map((e) => {
    return MappingCategoryResponseDto(e);
  });
}
