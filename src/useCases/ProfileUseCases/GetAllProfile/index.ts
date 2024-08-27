import { ProfileRepositoryPrisma } from "../../../repositories/implementations/ProfileRepositoryPrisma";
import { GetAllprofileController } from "./GetAllProfileController";

const profileRepositoryPrisma = new ProfileRepositoryPrisma();

const getAllprofileController = new GetAllprofileController(
  profileRepositoryPrisma
);

export { getAllprofileController };
