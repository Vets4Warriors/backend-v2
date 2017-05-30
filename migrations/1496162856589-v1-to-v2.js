const mongoose = require('mongoose');
const appConfig = require('../lib/utils/config');
const { logger } = require('../lib/utils/loggers');
const mongoSetup = require('../lib/utils/mongo');
const LocationSchema = require('./schemas/v1/Location');

exports.up = async function(next) {
  await mongoSetup.connect();
  logger.log('database', 'migration: UP v1->v2');

  // Find Locations Branches with common names -> create organization
  const Location = mongoose.model('Location', LocationSchema);
  const test = new Location({});
  await test.save();

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
