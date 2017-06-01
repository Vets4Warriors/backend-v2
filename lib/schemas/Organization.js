/**
 * Created by austin on 5/3/17.
 */

const mongoose = require('mongoose');
require('mongoose-schema-extend');
const version = require('mongoose-version');
const paginate = require('mongoose-paginate');
const UserCreatedSchema = require('../schemas/UserCreated');
const ContactSchema = require('../schemas/Contact');

const OrgSchema = UserCreatedSchema.extend({
  branchIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }],
  hqBranchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
  name: String,
  contact: ContactSchema,
  // createdOn, createdBy, lastModifiedOn, lastModifiedBy all filled in by UserCreatedSchema
});

// Save modifications
OrgSchema.plugin(version, { collection: 'Organization_versions' });
OrgSchema.plugin(paginate);

OrgSchema.methods = {
  setHQ(branch) {
    this.hqBranchId = branch._id;
  },
  addBranch(branch) {
    branch.organizationId = this._id;
    this.branchIds.push(branch._id);
  }
};
Object.assign(OrgSchema.methods, UserCreatedSchema.methods);

module.exports = OrgSchema;
