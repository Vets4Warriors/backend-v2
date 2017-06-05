/**
 * The first version: All Branches are just locations
 */

const mongoose = require('mongoose');
const RatingSchema = require('./Rating');
const AddressSchema = require('./Address');

const locationSchema = new mongoose.Schema({
  name: String,
  address: AddressSchema,
  hqAddress: AddressSchema,
  website: String,
  email: String,
  phone: String,
  ratings: [RatingSchema],
  locationType: String,
  coverages: [String],
  services: [String],
  tags: [String],
  comments: String,
  addedBy: String,
  addedOn: Date,
}, { collection: 'location' }); // v1 wasn't plural

module.exports = locationSchema;