/**
 * Created by austin on 4/17/17.
 * Embedded Document
 */
const mongoose = require('mongoose');
require('mongoose-type-url');

/**
 * Embedded
 */
const googleProfileSchema = mongoose.Schema({
  id: String,
  displayName: String,
  photoUrl: mongoose.SchemaTypes.Url,
});

module.exports.schema = googleProfileSchema;
