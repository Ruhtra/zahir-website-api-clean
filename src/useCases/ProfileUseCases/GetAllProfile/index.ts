import { ProfileRepository } from "../../../repositories/implemetations/ProfileRepository";
import { GetAllprofileController } from "./GetAllProfileController";

const profileRepository = new ProfileRepository()

const getAllprofileController = new GetAllprofileController(profileRepository)

export {
    getAllprofileController
}