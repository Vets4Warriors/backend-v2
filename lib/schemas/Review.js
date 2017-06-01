/**
 * Created by austin on 5/3/17.
 */
require('mongoose-schema-extend');
const UserCreatedSchema = require('./UserCreated');
/**
 * Embedded
 */
const ReviewSchema = UserCreatedSchema.extend({
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
});
Object.assign(ReviewSchema.methods, UserCreatedSchema.methods);

module.exports = ReviewSchema;
