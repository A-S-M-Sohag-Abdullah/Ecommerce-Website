import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import User from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ["profile", "email"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        // 🔍 Find existing user by Google ID or email
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Try finding by email in case user signed up without Google
          user = await User.findOne({ email: profile.emails?.[0].value });

          if (user) {
            // Link Google account to existing user
            user.googleId = profile.id;
            await user.save();
          } else {
            // 🆕 Create a new user
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails?.[0].value,
              avatar: profile.photos?.[0].value,
              password: "GOOGLE_AUTH", // won't be used
              isGoogle: true,
            });
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
