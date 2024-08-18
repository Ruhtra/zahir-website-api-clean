import { ObjectId } from "mongodb";
import { GoogleUser } from "../../../entities/GoogleUser";

export interface IUpdateUserDto {
    id: ObjectId
    user: Pick<
        GoogleUser,
        'email' |
        'name' |
        'picture' |
        'role'
    >
}