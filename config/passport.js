const { User } = require("../models/User");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

require("dotenv").config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  issuer: "",
  audience: "",
};

passport.use(
  new JwtStrategy(options, async (jwt_payload, done) => {
    console.log(jwt_payload.sub)
    try {
      const user = await User.findOne({ _id: jwt_payload.sub });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      console.log(err)
      return done(err, false);
    }
  })
);

module.exports = passport;
