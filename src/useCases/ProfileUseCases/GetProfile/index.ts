import { ProfileRepository } from "../../../repositories/implemetations/ProfileRepository";
import { GetProfileController } from "./GetProfileController";

const profileRepository = new ProfileRepository()

const getProfileController = new GetProfileController(profileRepository)

export {
    getProfileController
}