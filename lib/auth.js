/**
 * Created by austin on 4/9/17.
 */
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const { auth0 } = require('./utils/config')

const ensuredAuthenticated = jwt({
  secret: jwks.expressJwtSecret(auth0.jwks),
  audience: auth0.audience,
  issuer: auth0.issuer,
  algorithms: auth0.algorithms,
});

module.exports = ensuredAuthenticated;
