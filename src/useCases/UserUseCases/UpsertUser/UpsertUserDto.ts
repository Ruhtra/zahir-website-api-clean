import { $Enums, GoogleUser } from "@prisma/client"

export interface IUpsertUserRequestDto extends Pick<
    GoogleUser,
    'name' |
    'email' |
    'picture' 
> {
    role?: $Enums.Role
}