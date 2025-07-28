const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/user-model');
require('dotenv').config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.getUserById(id).then((user) => {
    done(null, user);
  });
});
 
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/redirect"
  },
  (accessToken, refreshToken, profile, done) => {
    data = {};
    userModel.getUserByCustomKey("googleId", profile.id).then((currentUser) => {
      if (currentUser) {
        done(null, currentUser);
      } else {
        const user = profile._json;
        userModel.createUser(user.name, user.email, 'utilisateur', user.sub, 'fr', null).then((newUser) => {
           done(null, newUser);
        });
      }
    });
  }
));