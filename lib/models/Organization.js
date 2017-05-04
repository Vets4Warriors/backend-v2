/**
 * Created by austin on 5/3/17.
 */

const mongoose = require('mongoose');
require('mongoose-schema-extend');
const version = require('mongoose-version');
const paginate = require('mongoose-paginate');
const UserCreatedSchema = require('./schemas/UserCreatedSchema');
const ContactSchema = require('./schemas/Contact');

const orgSchema = UserCreatedSchema.extend({
  branchIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }],
  hqBranchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  contact: ContactSchema,
  // createdOn, createdBy, lastModifiedOn, lastModifiedBy all filled in by UserCreatedSchema
});

// Save modifications
orgSchema.plugin(version, { collection: 'Organization_versions' });
orgSchema.plugin(paginate);

const Organization = mongoose.model('Organization', orgSchema);

module.exports = Organization;
