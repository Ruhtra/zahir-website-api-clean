import { IGoogleUserRepository } from "../../../repositories/IGoogleUserRepository";
import { ICreateUserRequestDto } from "./CreateUserDto";

export class CreateUserUseCase {
    constructor(
        private usersRepository: IGoogleUserRepository
    ) {}

    async execute({ email, name, picture, role }: ICreateUserRequestDto) {
        const userExist = await this.usersRepository.findByEmail(email)
        if (userExist) throw new Error("Usuário ja existe");

        await this.usersRepository.save({
            email,
            name,
            picture,
            role
        })
    }
}