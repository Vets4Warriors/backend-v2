// getting-started.js
const mongoose = require('mongoose');
const version = require('mongoose-version');
const GoogleProfileSchema = require('./schemas/GoogleProfile');

const userSchema = mongoose.Schema({
  profile: GoogleProfileSchema,
});
userSchema.plugin(version);

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
userSchema.methods = {

};

const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.schema = userSchema;
