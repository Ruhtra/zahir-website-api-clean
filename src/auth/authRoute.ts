import { response, Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { env } from "../env";
import { requireJwtAuth } from "./RequiredJwtAuth";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    session: false,
  }),
  async (req, res) => {
    const token = jwt.sign(
      {
        id: req.user.id,
        provider: req.user.provider,
        email: req.user.email,
      },
      env.JWT_SECRET,
      { expiresIn: "12h" } // Correção: 'expiresIn' deve estar fora do payload
    );

    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      domain: env.DOMAIN,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });
    res.redirect(`${env.URL_FRONTEND}/login/success`);
  }
);

router.get("/me", requireJwtAuth, (req, res) => {
  return res.status(200).json(req.user);
});

export { router };
