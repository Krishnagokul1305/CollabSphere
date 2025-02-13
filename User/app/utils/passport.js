const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const prisma = require("../../DB/prisma");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        console.log(req, accessToken, refreshToken, profile);

        // let user = await prisma.user.findUnique({
        //   email: profile.emails[0].value,
        // });
        // if (!user) {
        //   user = new User({
        //     name: profile.displayName,
        //     email: profile.emails[0].value,
        //     googleId: profile.id,
        //     avatar: profile.photos[0].value,
        //   });
        //   await user.save();
        // } else if (!user.googleId) {
        //   user.googleId = profile.id;
        //   await user.save();
        // }

        return done(null, "hello");
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
