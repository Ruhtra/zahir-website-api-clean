import { Application } from "express";
import session from "express-session";
import passport from "passport";

import { PrismaSessionStore } from "./prismaSession";
import { passportConfig } from "./passport";
import { router as authRoutes } from "../auth/authRoute";
import { env } from "../env";

const Session = (app: Application) => {
  app.set("trust proxy", 1); // trust first proxy
  app.use(
    session({
      secret: env.SECRET,
      resave: false,
      saveUninitialized: true,
      store: new PrismaSessionStore(),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        domain: env.DOMAIN,
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "none",
      },
    })
  );
};

const Auth = (app: Application) => {
  passportConfig(passport);
  app.use(passport.initialize());
  app.use(passport.session());
};
const Route = (app: Application) => {
  app.use("/auth", authRoutes);
};

export const configAuth = (app: Application) => {
  Session(app);
  Auth(app);
  Route(app);
};
