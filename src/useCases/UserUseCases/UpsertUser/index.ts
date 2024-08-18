import { GoogleUserRepository } from "../../../repositories/implemetations/GoogleUserRepository";
import { UpsertUserUseCase } from "./UpsertUserUseCase";

const googleUserRepository = new GoogleUserRepository()

const upsertUserUseCase = new UpsertUserUseCase(
    googleUserRepository
)

export {
    upsertUserUseCase
}