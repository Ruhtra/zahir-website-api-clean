import express from "express";
import { router } from "./router";
import cors from "cors";
import passport from "passport";
const app = express();

app.use(express.json());

import "./passport";

// Configure CORS para permitir de qualquer origem
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    origin: true,
  })
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/auth/google/redirect",
  passport.authenticate("google"),
  (req, res) => {
    return res.send("This is the callback route");
  }
);

app.use("/api", router);

export { app };
