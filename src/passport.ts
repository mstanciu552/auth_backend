import { Error } from "mongoose";
import { PassportStatic, Profile } from "passport";
import oauth, { VerifyCallback } from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "./schema/User.js";

dotenv.config();

const GoogleStrategy = oauth.Strategy;

export const passportConfig = (passport: PassportStatic) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: <string>process.env.GOOGLE_CLIENT_ID,
        clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (
        _accessToken: string,
        _refreshToken: string,
        profile: Profile,
        done: VerifyCallback
      ) => {
        try {
          let user = await User.findOne({ googleID: profile.id });

          if (user) done(undefined, user);
          else {
            user = await User.create({
              googleID: profile.id,
              displayName: profile.displayName,
              firstName: profile.name?.givenName,
              lastName: profile.name?.familyName,
              photo: profile.photos ? profile.photos[0].value : "",
            });
            done(undefined, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
  passport.serializeUser((user: any, done) => {
    return done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err: Error, user: any) => done(err, user));
  });
};
