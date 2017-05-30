/**
 * Created by austin on 5/3/17.
 */
const mongoose = require('mongoose');
require('mongoose-schema-extend');
const UserCreatedSchema = require('./UserCreated');
/**
 * Embedded
 */
const reviewSchema = UserCreatedSchema.extend({
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
});

module.exports = reviewSchema;
