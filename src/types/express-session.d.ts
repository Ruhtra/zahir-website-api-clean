// types/express-session.d.ts
import "express-session";
import { SessionData as SessionDataType } from "express-session";

declare module "express-session" {
  interface SessionData {
    passport?: {
      user?: {
        id: string;
        token: string;
      };
    };
  }
}
