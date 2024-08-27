import { GoogleuserRepositoryPrisma } from "../../../repositories/implementations/GoogleUserRepositoryPrisma";
import { GetGoogleUserController } from "./GetGoogleUserController";

const googleuserRepositoryPrisma = new GoogleuserRepositoryPrisma();

const getGoogleUserController = new GetGoogleUserController(
  googleuserRepositoryPrisma
);

export { getGoogleUserController };
