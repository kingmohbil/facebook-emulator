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
        profileFields: ['displayName', 'id', 'photos', 'profileUrl'],
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
          const user = await users.findOne({ facebookId: profile.id });
          if (!user) {
            const user = await users.create({
              facebookId: profile.id,
              username: profile.displayName,
              profile: {
                picture: profile._json.picture.data.url,
              },
            });
            return done(null, user);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await users.findOne({ _id: id });
      return done(null, user);
    } catch (error) {
      return done(err);
    }
  });
};
module.exports = initializePassport;
