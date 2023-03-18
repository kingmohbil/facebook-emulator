require('dotenv').config();
const FacebookStrategy = require('passport-facebook').Strategy;
const users = require('./models/user');
const initializePassport = (passport) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: '/auth/facebook/redirect',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await users.findOne({ facebookId: profile.id });
          if (!user) {
            const user = await users.create({
              id: profile.id,
              accessToken,
              refreshToken,
              profile,
            });
            return done(null, user);
          }
          return done(null, user);
        } catch (error) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = users.findOne({ _id: id });
      return done(null, user);
    } catch (error) {
      return done(err);
    }
  });
};
module.exports = initializePassport;
