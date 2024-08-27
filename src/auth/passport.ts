import {
  Strategy as GoogleStrategy,
  VerifyCallback,
} from "passport-google-oauth2";
import jwt from "jsonwebtoken";
import { PassportStatic, Profile as PassportProfile } from "passport";
import { prismaClient } from "../prismaClient";

interface GoogleUser {
  id: string;
  googleId: string;
  email: string;
  picture: string;
  name: string;
}
interface SessionData {
  user: GoogleUser;
  token: string;
}
interface GoogleProfile extends PassportProfile {
  id: string;
  emails: { value: string }[];
  picture: string;
  displayName: string;
}

export const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_REDIRECT_URL!,
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: GoogleProfile,
        done: VerifyCallback
      ) => {
        try {
          let user = await prismaClient.googleUser.findUnique({
            where: { googleId: profile.id },
          });

          if (!user) {
            user = await prismaClient.googleUser.create({
              data: {
                googleId: profile.id,
                email: profile.emails[0].value,
                picture: profile.picture,
                name: profile.displayName,
              },
            });
          }

          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "1h",
          });

          return done(null, { user, token });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((sessionData: SessionData, done) => {
    done(null, sessionData.user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await prismaClient.googleUser.findUnique({
        where: { id },
      });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
