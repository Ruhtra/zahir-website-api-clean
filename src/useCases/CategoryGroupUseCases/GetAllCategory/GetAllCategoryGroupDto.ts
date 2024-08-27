import { CategoryGroup } from "../../../entities/CategoryGroup";

export interface GetAllCategoryGroupResponseDto {
  id: string;
  name: string;
}

export function MappingCategoryGroupResponseDto(
  categoryGroup: CategoryGroup
): GetAllCategoryGroupResponseDto {
  return {
    id: categoryGroup.id,
    name: categoryGroup.name,
  };
}
export function MappingListCategoryGroupResponseDto(
  categoryGroup: CategoryGroup[]
): GetAllCategoryGroupResponseDto[] {
  return categoryGroup.map((e) => {
    return MappingCategoryGroupResponseDto(e);
  });
}
