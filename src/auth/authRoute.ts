import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect(`${process.env.URL_FRONTEND}/login/success`);
  }
);

router.post("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err)
        return res.status(500).json({ message: "Logout failed", error: err });
      return res.status(200).json({ message: "Logged out successfully" });
    });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

export { router };
