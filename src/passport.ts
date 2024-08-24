import passportGoogle from "passport-google-oauth2";
const GoogleStrategy = passportGoogle.Strategy;
import { Prisma, PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
export const passportConfig = (passport: any) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/redirect",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await prisma.googleUser.findUnique({
            where: { googleId: profile.id },
          });

          if (!user) {
            user = await prisma.googleUser.create({
              data: {
                googleId: profile.id,
                email: profile.emails[0].value,
                picture: profile.picture,
                name: profile.displayName,
              },
            });
          }

          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          // Passar o usuário e o token no callback
          return done(null, { user, token });
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  passport.serializeUser((sessionData, done) => {
    // Armazena o ID do usuário na sessão
    done(null, sessionData.user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      // Recupera o usuário pelo ID da sessão
      const user = await prisma.googleUser.findUnique({
        where: { id },
      });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
