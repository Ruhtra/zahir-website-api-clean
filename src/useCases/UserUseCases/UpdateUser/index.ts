import { GoogleUserRepository } from "../../../repositories/implemetations/GoogleUserRepository"
import { UpdateUserUseCase } from "./UpdateUserUseCase"

const googleUserRepository = new GoogleUserRepository()

const updateUserUseCase = new UpdateUserUseCase(googleUserRepository)

export {
    updateUserUseCase
}