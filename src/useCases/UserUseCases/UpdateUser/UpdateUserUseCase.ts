import { IGoogleUserRepository } from "../../../repositories/IGoogleUserRepository";
import { IUpdateUserDto } from "./UpdateUserDto";

export class UpdateUserUseCase {
    constructor(
        private userRepository: IGoogleUserRepository
    ) {}

    async execute({ id, user }: IUpdateUserDto) {
        const userExist = await this.userRepository.findById(id)
        if (!userExist) throw new Error("Usuário não existe");

        await this.userRepository.update(id, {
            email: user.email,
            name: user.name,
            picture: user.picture,
            role: user.role
        })
    }
}