/**
 * Created by austin on 5/3/17.
 */
const mongoose = require('mongoose');
const version = require('mongoose-version');
const paginate = require('mongoose-paginate');
require('mongoose-schema-extend');
const UserCreatedSchema = require('./UserCreated');
const ReviewSchema = require('./Review');
const AddressSchema = require('./Address');
const ContactSchema = require('./Contact');

const BranchSchema = UserCreatedSchema.extend({
  name: { type: String, required: true },
  coverages: [{ type: String, enum: ['Local', 'State', 'Regional', 'National', 'International'] }],
  reviews: ReviewSchema,
  address: AddressSchema,
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  contact: ContactSchema,
  tags: [String],
});
// Save modifications
BranchSchema.plugin(version, { suppressRefIdIndex: false, maxVersions: 10, collection: 'Branch_versions' });
BranchSchema.plugin(paginate);

module.exports = BranchSchema;
