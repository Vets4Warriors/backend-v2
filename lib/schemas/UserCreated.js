/**
 * Created by austin on 5/3/17.
 */
const mongoose = require('mongoose');

/**
 * For extending
 */
const UserCreatedSchema = new mongoose.Schema({
  createdOn: {
    type: Date,
    default: Date.now,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastModifiedOn: {
    type: Date,
    default: Date.now,
  },
  lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const methods = {
  addCreatedBy(user) {
    if (this.createdBy) {
      // Todo: more specific error
      throw new Error('Cannot overwrite creator!')
    }
    this.createdOn = new Date();
    this.createdBy = user._id;
    // Default
    this.modifiedBy(user);
  },
  modifiedBy(user) {
    this.lastModifiedOn = new Date();
    this.lastModifiedBy = user._id;
  }
};

module.exports = UserCreatedSchema;
module.exports.methods = methods;
