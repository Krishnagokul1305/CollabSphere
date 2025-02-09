const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const prisma = require("../DB/prisma");

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      return req?.cookies?.token;
    },
  ]),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log(jwt_payload);
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.id },
      });
      if (!user) return done(null, false);
      if (user.updatedAt.getTime() > jwt_payload.iat * 1000) {
        throw new Error(
          "Unauthorized: Password has changed recently. Please log in again!"
        );
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

module.exports = passport;
