import { GoogleUserRepository } from "../../../repositories/implemetations/GoogleUserRepository";
import { GetGoogleUserController } from "./GetGoogleUserController";

const googleUserRepository = new GoogleUserRepository()

const getGoogleUserController = new GetGoogleUserController(googleUserRepository)

export {
    getGoogleUserController
}