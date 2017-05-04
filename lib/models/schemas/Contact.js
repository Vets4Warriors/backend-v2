/**
 * Created by austin on 5/3/17.
 */
const mongoose = require('mongoose');
require('mongoose-type-url');
require('mongoose-type-email');

/**
 * Embedded
 */
const contactSchema = new mongoose.Schema({
  email: mongoose.SchemaTypes.Email,
  phone: String, // Validate on frontend? Or make better validator
  website: mongoose.SchemaTypes.Url,
});

module.exports = contactSchema;
