/**
 * Created by austin on 4/9/17.
 */
const GoogleStrategy = require('passport-google-oauth20');
const createError = require('http-errors');
const HttpStatus = require('http-status-codes');
const config = require('./utils/config');
const User = require('./models/User');
const GoogleProfile = require('./models/schemas/GoogleProfile');

// Serialize and deserialize by Google UUID
function serializeUser(user, cb) {
  cb(null, user.googleUuid);
}

/**
 *
 * @param googleUuid - The Unique id provided by google
 * @param cb - Callback function to either report error or return user
 */
function deserializeUser(googleUuid, cb) {
  User.findOne({ googleUuid })
      .then((user) => {
        if (user === null) {
          cb(createError(HttpStatus.NOT_FOUND, `User with id: ${googleUuid} not found.`));
        }

        // Return the user with no error
        cb(null, user);
      })
      .catch((err) => {
        // Return the error
        cb(err);
      });
}

const strategy = new GoogleStrategy({
  clientID: config.auth.google.clientID,
  clientSecret: config.auth.google.clientSecret,
  callbackURL: `${config.server}/login/google/callback`,
}, (accessToken, refreshToken, profile, cb) => {
  // Should always be a success
  // If we can't find a user in our database, they must be new
  // --> create a new user with the google information
  User.findOne({ googleUuid: profile.id })
      .then((user) => {
        if (user === null) {
          let photoURL;
          if (profile.photos.length < 1) {
            // They don't have a photo?
            photoURL = null;
          } else {
            photoURL = profile.photos[0].value;
          }

          // Couldn't find
          const userProfile = new GoogleProfile({
            photoURL,
            displayName: profile.displayName,
            id: profile.id,
          });

          return User.create({ profile: userProfile })
              .then((newUser) => {
                cb(null, newUser);
              });
        }

        // Found
        cb(null, user);
      })
      .catch((err) => {
        // Some other error?
        cb(err);
      });
});

module.exports = {
  strategy,
  deserializeUser,
  serializeUser,
};
