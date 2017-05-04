/**
 * Created by austin on 5/3/17.
 */
const mongoose = require('mongoose');
const version = require('mongoose-version');
const paginate = require('mongoose-paginate');
require('mongoose-schema-extend');
const UserCreatedSchema = require('./schemas/UserCreatedSchema');
const ReviewSchema = require('./schemas/Review');
const AddressSchema = require('./schemas/Address');
const ContactSchema = require('./schemas/Contact');

const branchSchema = UserCreatedSchema.extend({
  name: { type: String, required: true },
  coverages: [{ type: String, enum: ['Local', 'State', 'Regional', 'National', 'International'] }],
  reviews: ReviewSchema,
  address: AddressSchema,
  organizationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  contact: ContactSchema,
  tags: [String],
});
// Save modifications
branchSchema.plugin(version, { suppressRefIdIndex: false, maxVersions: 10, collection: 'Branch_versions' });
branchSchema.plugin(paginate);

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
