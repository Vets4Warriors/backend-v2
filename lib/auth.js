/**
 * Created by austin on 4/9/17.
 */
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const { AuthenticationClient } = require('auth0');
const createError = require('http-errors');
const HttpStatus = require('http-status-codes');
const config = require('./utils/config');

/* Classes for wrapping function around Auth0 user data */

/**
 * @class UserProfile
 */
class UserProfile {
  constructor(auth0ProfileData) {
    Object.assign(this, auth0ProfileData);
  }
}

/**
 * @class User
 */
class User {
  constructor(auth0Data) {
    Object.assign(this, auth0Data);
    this.profile = new UserProfile(this.profile);
  }

  get id() {
    return this.sub || this.user_id;
  }
}


/**
 * @see https://auth0.com/forum/t/best-way-to-get-profile-data-on-nodejs-server/2689/4
 * @param req
 * @return {String|null}
 */
function getTokenFromHeader(req) {
  if (req.headers.authorization
      && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

/**
 * NOTE: Assumes ensureAuth already passed, thus req.user exists
 * @param req
 * @param res
 * @param next
 * @return {Promise.<void>}
 */
async function profileMiddleware(req, res, next) {
  const token = getTokenFromHeader(req);
  const profileJSON = await authClient.users.getInfo(token);
  req.user.profile = JSON.parse(profileJSON);
  req.user = new User(req.user);
  next();
}


/**
 * @type {AuthenticationClient}
 */
const authClient = new AuthenticationClient({
  domain: config.auth0.domain,
  clientId: config.auth0.clientId,
});

/**
 * Authentication middleware
 * @type {middleware}
 */
const ensureAuth = jwt({
  secret: jwks.expressJwtSecret(config.auth0.jwks),
  audience: config.auth0.audience,
  issuer: config.auth0.issuer,
  algorithms: config.auth0.algorithms,
});

module.exports = {
  User,
  UserProfile,
  getTokenFromHeader,
  profileMiddleware,
  authClient,
  ensureAuth,
};
