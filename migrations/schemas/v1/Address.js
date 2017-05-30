/**
 * Created by austin on 5/3/17.
 */
const mongoose = require('mongoose');
require('mongoose-geojson-schema');

/**
 * Embedded
 */
const addressSchema = new mongoose.Schema({
  address1: String,
  address2: String,
  city: String,
  state: String,
  zipcode: String,
  latLng: mongoose.Schema.Types.Point,
});

module.exports = addressSchema;
