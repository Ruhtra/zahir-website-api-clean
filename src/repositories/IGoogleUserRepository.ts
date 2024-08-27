import { GoogleUser } from "../entities/GoogleUser";

export interface IGoogleUserRepository {
  get: (id: string) => Promise<GoogleUser>;
}
