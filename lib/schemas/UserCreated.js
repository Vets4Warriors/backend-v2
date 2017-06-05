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
  lastModifiedOn: {
    type: Date,
    default: Date.now,
  },
  // Auth0 user ids
  createdBy: { type: String, required: true },
  lastModifiedBy: { type: String },
});

// Methods exported separately as extend schema doesn't support
// method inheritance
// Meant to be bound to a sub or inherited with Object.assign
const methods = {
  /**
   *
   * @param {User} user
   */
  addCreatedBy(user) {
    if (this.createdBy) {
      // Todo: more specific error
      throw new Error('Cannot overwrite creator!')
    }
    this.createdOn = new Date();
    this.createdBy = user.id;
    // Default
    this.modifiedBy(user);
  },
  /**
   *
   * @param user
   */
  modifiedBy(user) {
    this.lastModifiedOn = new Date();
    this.lastModifiedBy = user.id;
  }
};

module.exports = UserCreatedSchema;
module.exports.methods = methods;
