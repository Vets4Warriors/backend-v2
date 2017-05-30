/**
 *
 */

const mongoose = require('mongoose');
const schema = require('../schemas/User');

const Branch = mongoose.model('User', schema);
module.exports = Branch;

