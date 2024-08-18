import { Profile } from "../../../entities/Profile";

export interface GetRecentProfileResponseDto extends Pick<
    Profile,
    'id' |
    'movie'
> { }

export function MappingRecentProfileResponseDto(profile: Profile): GetRecentProfileResponseDto {
    return {
        id: profile.id,
        movie: profile.movie
    }
}

export function MappingListRecentProfileResponseDto(profiles: Profile[]): GetRecentProfileResponseDto[] {
    return profiles.map(e => {
        return MappingRecentProfileResponseDto(e)
    }) 
}