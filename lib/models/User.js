// getting-started.js
const mongoose = require('mongoose');
const version = require('mongoose-version');
const GoogleProfileSchema = require('./schemas/GoogleProfile');

const userSchema = mongoose.Schema({
  googleProfile: GoogleProfileSchema,
});
userSchema.plugin(version);

userSchema.methods = {

};

const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.schema = userSchema;
