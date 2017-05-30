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

module.exports = UserCreatedSchema;
