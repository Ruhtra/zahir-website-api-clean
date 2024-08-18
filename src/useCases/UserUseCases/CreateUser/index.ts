import { GoogleUserRepository } from "../../../repositories/implemetations/GoogleUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";



const googleUserRepository = new GoogleUserRepository()

const createUserUseCase = new CreateUserUseCase(googleUserRepository)

export {
    createUserUseCase
}