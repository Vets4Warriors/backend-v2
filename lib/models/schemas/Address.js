/**
 * Created by austin on 5/3/17.
 */
const mongoose = require('mongoose');
require('mongoose-geojson-schema');

/**
 * Embedded
 */
const addressSchema = new mongoose.Schema({
  coordinates: mongoose.Schema.Types.Point,
  country: String,
  locality: String,
  region: String,
  postOfficeBoxNumber: String,
  streetAddress: String,
  postalCode: String,
});

module.exports = addressSchema;
