const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../models/user-model');
require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

const callbackURL = isProduction
  ? 'https://ivonutri-backend.onrender.com/auth/google/redirect'
  : 'http://localhost:3001/auth/google/redirect';


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  userModel.getUserById(id).then((user) => {
    done(null, user);
  }).catch((error) => {
    console.error('Error during deserializeUser', error);
    done(error, null);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL
  },
  (accessToken, refreshToken, profile, done) => {
    userModel.getUserByCustomKey("googleId", profile.id).then((currentUser) => {
      if (currentUser) {
        done(null, currentUser);
      } else {
        const user = profile._json;
        userModel.createUser(user.name, user.email, 'utilisateur', user.sub, 'fr', null).then((newUser) =>
          done(null, newUser)
        );
      }
    }).catch((error) => {
      console.error('Google Strategy error:', error);
      done(error, null);
    });
  }
));