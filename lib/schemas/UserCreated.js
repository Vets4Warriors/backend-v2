/**
 * Created by austin on 5/3/17.
 */
const mongoose = require('mongoose');
require('mongoose-type-email');

/**
 * For extending
 */
const UserCreatedSchema = new mongoose.Schema({
  createdOn: {
    type: Date,
    default: Date.now,
  },
  createdBy: { type: String, required: true },
  lastModifiedOn: {
    type: Date,
    default: Date.now,
  },
  lastModifiedBy: { type: String },
});

// Methods exported separately as extend schema doesn't support
// method inheritance
// Meant to be bound or inherited
const methods = {
  addCreatedBy(user) {
    if (this.createdBy) {
      // Todo: more specific error
      throw new Error('Cannot overwrite creator!')
    }
    this.createdOn = new Date();
    this.createdBy = user.email;
    // Default
    this.modifiedBy(user);
  },
  modifiedBy(user) {
    this.lastModifiedOn = new Date();
    this.lastModifiedBy = user.email;
  }
};

module.exports = UserCreatedSchema;
module.exports.methods = methods;
