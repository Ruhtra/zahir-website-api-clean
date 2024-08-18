import { HomePageWithProfile } from "../../../entities/HomePage.ts";

export interface GetAllHomePageResponseDto
  extends Pick<HomePageWithProfile, "order"> {
  profile: Pick<
    HomePageWithProfile["profile"],
    "id" | "picture" | "name" | "promotion"
  > & {
    local: Pick<HomePageWithProfile["profile"]["local"], "uf" | "city">;
  };
}

export function MappingHomePageResponseDto(
  homePage: HomePageWithProfile
): GetAllHomePageResponseDto {
  return {
    order: homePage.order,
    profile: {
      id: homePage.profile.id,
      picture: homePage.profile.picture,
      name: homePage.profile.name,
      local: {
        city: homePage.profile.local.city,
        uf: homePage.profile.local.uf,
      },
      promotion: homePage.profile.promotion,
    },
  };
}

export function MappingListHomePageResponseDto(
  homePage: HomePageWithProfile[]
): GetAllHomePageResponseDto[] {
  return homePage.map((e) => {
    return MappingHomePageResponseDto(e);
  });
}
