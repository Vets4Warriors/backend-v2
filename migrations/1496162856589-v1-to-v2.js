const mongoose = require('mongoose');
const appConfig = require('../lib/utils/config');
const { logger } = require('../lib/utils/loggers');
const mongoSetup = require('../lib/utils/mongo');
const LocationSchema = require('./schemas/v1/Location');
const BranchSchema = require('../lib/schemas/Branch');
const OrgSchema = require('../lib/schemas/Organization');
const UserSchema = require('../lib/schemas/User');

const Location = mongoose.model('Location', LocationSchema);
const Branch = mongoose.model('Branch', BranchSchema);
const Org = mongoose.model('Organization', OrgSchema);
const User = mongoose.model('User', UserSchema);

// Create the pseudo-admin user
const admin = new User({ displayName: 'Automated Admin'});

function v1AddressToV2(address) {
  return {
    streetAddress: `${address.address1} ${address.address2}`,
    locality: address.city,
    region: address.state,
    country: address.country ? address.country:'USA',
    postalCode: address.zipcode,
    coordinates: address.latLng,
  }
}

async function convertLocation(loc) {
  // Create an Org for each name
  const org = new Org({
    name: loc.name,
  });
  org.addCreatedBy(admin);

  // Create a Branch out of the rest and add under
  const branch = new Branch({
    name: loc.name,
    contact: {
      email: loc.email !== '' ? loc.email : undefined,
      phone: loc.phone,
      website: loc.website,
    },
    address: v1AddressToV2(loc.address),
    tags: loc.tags,
    services: loc.services,
    coverages: loc.coverages,
    createdOn: loc.addedOn,
    // Original data that doesn't map
    _orig_addedBy: loc.addedBy,
    _orig_locationType: loc.locationType,
  });
  branch.addCreatedBy(admin);
  // Ratings -> Reviews
  loc.ratings.forEach((rating) => {
    branch.addReview(rating.value, rating.comment, admin);
  });
  org.addBranch(branch);

  /* // Don't know if this is necessary
  if (loc.hqAddress) {
    // Make a new branch and set it as the hq branch
    const hqBranch = new Branch({
      name: `${loc.name}: HQ`,
      contact: branch.contact,
      address: v1AddressToV2(loc.hqAddress),
      tags: branch.tags,
      services: branch.services,
      coverages: branch.coverages,
      createdOn: branch.addedOn,
      reviews: branch.reviews,
      _orig_addedBy: branch.addedBy,
      _orig_locationType: branch.locationType,
    });
    hqBranch.addCreatedBy(admin);
    org.addBranch(hqBranch);
    org.setHQ(hqBranch);
    await hqBranch.save();
  }*/

  await org.save();
  await branch.save();
}

/**
 * Upgrade from v1 to v2 schema
 * @param next
 * @return {Promise.<void>}
 */
exports.up = async function(next) {
  await mongoSetup.connect();
  logger.log('database', 'migration: UP v1->v2');

  try {
    await admin.save();
    const locCursor = await Location.find({}).cursor();
    await locCursor.eachAsync(convertLocation);
  } catch (err) {
    logger.error('DATABASE:' + err);
    next(err);
  }


  // Finish by dropping the location collection
  await Location.collection.drop();
  await mongoSetup.disconnect();
  next();
};

/**
 * Drop down from v2 to v1
 * Todo!
 * @param next
 * @return {Promise.<void>}
 */
exports.down = async function(next) {
  await mongoSetup.connect();
  logger.log('database', 'migration: DOWN v2->v1');
  try {
    // Drop organizations
    await Org.collection.drop();
    // Turn each branch into a location

    // Drop Users
    await User.collection.drop();

    await Branch.collection.drop();

    // Drop version schemas
    await mongoose.connection.db.dropCollection('Organization_versions');
    await mongoose.connection.db.dropCollection('Branch_versions');

  } catch (err) {
    next(err);
  }

  await mongoSetup.disconnect();
  next();
};
