/**
 * Created by austin on 5/3/17.
 */
const mongoose = require('mongoose');
require('mongoose-schema-extend');
const UserCreatedSchema = require('./UserCreatedSchema');
/**
 * Embedded
 */
const reviewSchema = UserCreatedSchema.extend({});

module.exports = reviewSchema;
