import express from "express";
import { router } from "./router";
import cors from "cors";
const app = express();

app.use(express.json());

import passport from "passport";
import { passportConfig } from "./passport";

import "./passport";
import session from "express-session";
import { PrismaSessionStore } from "./prismaSessionStore";

// Configure CORS para permitir de qualquer origem
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    origin: true,
  })
);

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    name: "accessNewToken",
    secret: "your-session-secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
      // domain: process.env.production ? "https://zahir-website.onrender.com": "localhost",
      path: "/",
      sameSite: "none",
      secure: true,
    },
    store: new PrismaSessionStore(),
    saveUninitialized: false,
    resave: true,
  })
);

// app.use(
//   session({
//     secret: "your-session-secret",
//     resave: false,
//     saveUninitialized: true,
//     store: new PrismaSessionStore(),
//     cookie: {
//       domain: "." + process.env.DOMAIN_CLIENT,
//       secure: true,
//       httpOnly: true,
//       sameSite: "none",
//       maxAge: 1000 * 60 * 60 * 24, // 1 day
//     },
//   })
// );
// Configuração do Passport
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/auth/google/redirect",
  passport.authenticate("google", { failureRedirect: "/failure" }),
  (req, res) => {
    console.log(req.session);
    console.log(req.cookies);

    return res.redirect("https://" + process.env.DOMAIN_CLIENT + "/");
  }
);

app.use("/api", router);

export { app };
