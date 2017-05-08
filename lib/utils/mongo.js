/**
 * Created by austin on 5/1/17.
 */
const mongoose = require('mongoose');
const config = require('./config');
const { logger } = require('./loggers');

const { serverUri, database } = config.mongo;
const fullDbUri = `${serverUri}/${database}`;
const options = {};

// Todo: add user / pass for production
// Just use native promises
mongoose.Promise = Promise;

// Compile all models
require('../models');

function connect() {
// Event callbacks
  mongoose.connection.on('error', (err) => {
    // Fatal error
    logger.log('database', `ERROR: ${err}`);
    throw err;
  });

  mongoose.connection.once('open', () => {
    logger.log('database', `Connection to ${fullDbUri} successful.`);
  });

  return mongoose.connect(fullDbUri, options);
}

function disconnect() {
  return mongoose.connection.close();
}

function drop() {
  return mongoose.connection.dropDatabase();
}

module.exports = connect;
module.exports.disconnect = disconnect;
module.exports.connect = connect;
module.exports.drop = drop;
