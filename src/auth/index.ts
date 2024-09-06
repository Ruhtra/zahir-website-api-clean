import passport from "passport";
import { googleStrategy } from "./Strategys/GoogleStrategy";
import { JWTStrategy } from "./Strategys/jwtStrategy";
import { router } from "./AuthRouter";
import { Application } from "express";

const Auth = (app: Application) => {
  app.use(passport.initialize());
  JWTStrategy();
  googleStrategy();
};

const Route = (app: Application) => {
  app.use("/auth", router);
};

export const configAuth = (app: Application) => {
  Auth(app);
  Route(app);
};
