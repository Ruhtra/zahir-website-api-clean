import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

import { env } from "../../env";
import { prismaClient } from "../../prismaClient";

export const googleStrategy = () => {
  const googleLogin = new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_REDIRECT_URL,
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await prismaClient.googleUser.upsert({
          create: {
            provider: "google",
            googleId: profile.id,
            username: `user${profile.id}`,
            email: profile.email,
            name: profile.displayName,
            avatar: profile.picture,
          },
          update: {
            provider: "google",
            googleId: profile.id,
            username: `user${profile.id}`,
            email: profile.email,
            name: profile.displayName,
            avatar: profile.picture,
          },
          where: {
            email: profile.email,
          },
        });

        done(null, user);
      } catch (err) {
        console.log(err);
      }
    }
  );

  passport.use(googleLogin);
};
