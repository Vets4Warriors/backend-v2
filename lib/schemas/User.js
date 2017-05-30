// getting-started.js
const mongoose = require('mongoose');
const GoogleProfileSchema = require('../schemas/GoogleProfile');

const UserSchema = mongoose.Schema({
  googleProfile: GoogleProfileSchema,
});

UserSchema.methods = {

};

module.exports = UserSchema;
