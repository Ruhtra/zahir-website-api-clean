import passportGoogle from "passport-google-oauth2";
const GoogleStrategy = passportGoogle.Strategy;
import passport from "passport";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      console.log(profile);

      //EXEMPLO TUTORIAL
      //https://samippoudel.hashnode.dev/google-oauth-using-typescript-expressjs-passportjs-and-mongodb-ckvatnioy0hsu45s1db0r3qoy
      try {
        let user = await prisma.googleUser.findUnique({
          where: { googleId: profile.id },
        });
        if (!user) {
          user = await prisma.googleUser.create({
            data: {
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
              picture: profile.picture,
            },
          });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
      //EXEMPLO SITE
      //https://www.passportjs.org/packages/passport-google-oauth2/
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return done(err, user);
      // });
    }
  )
);

//EXEMPLO GPT
// const prisma = new PrismaClient();

// module.exports = (passport) => {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: '/auth/google/callback',
//       },
//       async (accessToken, refreshToken, profile, done) => {

//       }
//     )
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser(async (id, done) => {
//     try {
//       const user = await prisma.user.findUnique({
//         where: { id },
//       });
//       done(null, user);
//     } catch (err) {
//       done(err);
//     }
//   });
// };
