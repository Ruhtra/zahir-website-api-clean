import { GoogleUser } from "../../../entities/GoogleUser";

export interface ICreateUserRequestDto extends Pick<
    GoogleUser,
    'name' |
    'email' |
    'picture' |
    'role'
> {}