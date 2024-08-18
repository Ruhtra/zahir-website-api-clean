import { ProfileRepository } from "../../../repositories/implemetations/ProfileRepository";
import { GetRecentProfileController } from "./GetRecentProfileController";

const profileRepository = new ProfileRepository()

const getRecentProfileController = new GetRecentProfileController(profileRepository)

export {
    getRecentProfileController
}
