/**
 * Created by austin on 5/1/17.
 */
const mongoose = require('mongoose');
const config = require('./config');
const { logger } = require('./loggers');

const { serverUri, database } = config.mongo;
const fullDbUri = `${serverUri}/${database}`;
// Todo: add user / pass for production
const options = {};

// Just use native promises
mongoose.Promise = Promise;

/**
 *
 * @param [dbUri] - the full database uri
 * @param [opts] - mongoose connection options
 * @return {MongooseThenable}
 */
function connect(dbUri = fullDbUri, opts = options) {
  // Event callbacks
  mongoose.connection.on('error', (err) => {
    // Fatal error
    logger.log('database', `ERROR: ${err}`);
    throw err;
  });

  mongoose.connection.once('open', () => {
    logger.log('database', `Connection to ${dbUri} successful.`);
  });

  return mongoose.connect(dbUri, opts);
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
// Export store options to use in production with mongostore
module.exports.storeOptions = {
  url: fullDbUri,
};