/**
 * Created by austin on 3/6/17.
 */

const configJson = require('./../../config.json');

/**
 * Dynamically get all configuration file objects
 * @param {string|undefined} [env]
 * @returns {*} configuration object
 */
function configuration(env) {
  let config;
  // Defaults to using the env variable but allows dynamic loading
  if (!env) env = process.env.NODE_ENV || 'development';  // eslint-disable-line

  // Dynamically get the config off passed variable or environment
  switch (env) {
    case 'prod':
    case 'production':
      config = configJson.production;
      break;
    case 'testing':
      config = configJson.testing;
      break;
    case 'dev':
    case 'development':
    default:   // Default to dev mode
      config = configJson.development;
  }

  config.env = env;
  return config;
}

/**
 *
 * @type {object}
 */
module.exports = configuration();

/**
 * Gets the configuration based on the environment passed
 * @type {function}
 */
module.exports.configuration = configuration;

