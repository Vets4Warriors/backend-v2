const mongoose = require('mongoose');
const appConfig = require('../lib/utils/config');
const { logger } = require('../lib/utils/loggers');
const mongoSetup = require('../lib/utils/mongo');

exports.up = async function(next) {
  await mongoSetup.connect();
  await mongoSetup.disconnect();
  next();
};

exports.down = async function(next) {
  await mongoSetup.connect();
  await mongoSetup.disconnect();
  next();
};
