import { GoogleUser } from "../../../entities/GoogleUser";

export interface IGetGoogleUserRequestDto {
  id: string;
}

export interface IGetGoogleUseRespondeDto {
  id: string;
  email: string;
  name?: string;
  picture: string;
  googleId: string;
}
export function MappingGetGoogleUserResponseDto(
  googleUser: GoogleUser
): IGetGoogleUseRespondeDto {
  return {
    id: googleUser.id,
    email: googleUser.email,
    name: googleUser.name,
    picture: googleUser.picture,
    googleId: googleUser.googleId,
  };
}
