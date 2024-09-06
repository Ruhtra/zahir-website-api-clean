import { GoogleUser } from "@prisma/client";

declare global {
  namespace Express {
    interface User extends GoogleUser {}
  }
}
