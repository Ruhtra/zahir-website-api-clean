import { GoogleUser } from "@prisma/client";

export interface IGoogleUserRepository {
  get: (id: string) => Promise<GoogleUser>;
}
