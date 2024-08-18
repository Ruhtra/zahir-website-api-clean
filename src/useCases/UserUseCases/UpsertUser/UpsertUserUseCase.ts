import { IGoogleUserRepository } from "../../../repositories/IGoogleUserRepository";
import { IUpsertUserRequestDto } from "./UpsertUserDto";
import { GoogleUser } from "@prisma/client";

export class UpsertUserUseCase {
    constructor(
        private repository: IGoogleUserRepository,
    ) { }

    async execute({ email, name, picture, role }: IUpsertUserRequestDto): Promise<GoogleUser> {
        await this.repository.upsert(email, {
            email,
            name,
            picture,
            role
        })

        return await this.repository.findByEmail(email)
    }
}