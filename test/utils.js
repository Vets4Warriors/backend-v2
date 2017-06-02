/**
 * Created by austin on 5/8/17.
 */
const request = require('request-promise-native');
const config = require('../lib/utils/config');

const options = {
  method: 'POST',
  url: 'https://vets4warriors.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    "client_id": config.auth0.clientId,
    "client_secret": config.auth0.clientSecret, // Configured in config module
    "audience": config.auth0.audience,
    "grant_type": config.auth0.grantType,
  })
};


/**
 *
 */
async function generateAuthToken() {
  const res = await request(options);
  return Promise.resolve(JSON.parse(res));
}

function makeAuthHeader(token) {
  return `${token.token_type} ${token.access_token}`
}


module.exports = {
  generateAuthToken,
  makeAuthHeader,
};