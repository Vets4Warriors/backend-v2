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
  mongoose.connect(fullDbUri, options);
// Event callbacks
  const db = mongoose.connection;
  db.on('error', (err) => {
    // Fatal error
    logger.log('database', `ERROR: ${err}`);
    process.exit(1);
  });
  db.once('open', () => {
    logger.log('database', `Connection to ${fullDbUri} successful.`);
  });
}

function disconnect() {
  mongoose.connection.close();
}

module.exports = connect;
module.exports.disconnect = disconnect;
module.exports.connect = connect;
