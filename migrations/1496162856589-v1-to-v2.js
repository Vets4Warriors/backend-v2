const appConfig = require('../lib/utils/config');
const { logger } = require('../lib/utils/loggers');
const mongoSetup = require('../lib/utils/mongo');

exports.up = async function(next) {
  await mongoSetup.connect();
  logger.log('database', 'migration: UP v1->v2');

  // Find Branches with common names -> create organization


  await mongoSetup.disconnect();
  next();
};

exports.down = async function(next) {
  await mongoSetup.connect();
  logger.log('database', 'migration: DOWN v2->v1');

  // Drop organizations

  // Turn each branch into a location

  await mongoSetup.disconnect();
  next();
};
