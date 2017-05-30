const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  value: Number,
  user: String,
  comment: String,
  ratedOn: Date,
});

module.exports = locationSchema;