/**
 * Created by austin on 4/17/17.
 * Embedded Document
 */
const mongoose = require('mongoose');
require('mongoose-type-url');
const logger = require('../utils/loggers').logger;

/**
 * Holds information from Google
 * A dumbed down version
 */
const GoogleProfileSchema = mongoose.Schema({
  id: String,
  displayName: String,
  photoURL: mongoose.SchemaTypes.Url,
});

const model = mongoose.model('GoogleProfile', GoogleProfileSchema);

module.exports = model;
module.exports.schema = GoogleProfileSchema;
