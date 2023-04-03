import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/user.js";

const localstrategy = new LocalStrategy(
  {
    usernameField: "username",
    passwordField: "password",
    session: true,
  },
  async (username, password, done) => {
    const user = await User.findOne({ username: username });
    if (!user) {
      return done(null, false);
    }
    if (!user.verifyPassword(password)) {
      return done(null, false);
    }
    passport.serializeUser(user, (err, serializedUser) => {
      return done(err, serializedUser);
    });
  }
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(localstrategy);

export default passport;
