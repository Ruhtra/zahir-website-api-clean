import { Profile } from "../../../entities/Profile";

export interface GetRecentProfileResponseDto {
  id: string;
  movie?: string;
}

export function MappingRecentProfileResponseDto(
  profile: Profile
): GetRecentProfileResponseDto {
  return {
    id: profile.id,
    movie: profile.movie,
  };
}

export function MappingListRecentProfileResponseDto(
  profiles: Profile[]
): GetRecentProfileResponseDto[] {
  return profiles.map((e) => {
    return MappingRecentProfileResponseDto(e);
  });
}
