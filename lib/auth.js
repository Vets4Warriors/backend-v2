/**
 * Created by austin on 4/9/17.
 */
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const ensuredAuthenticated = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://vets4warriors.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://clr.vets4warriors.com/api',
  issuer: 'https://vets4warriors.auth0.com/',
  algorithms: ['RS256']
});

module.exports = ensuredAuthenticated;
