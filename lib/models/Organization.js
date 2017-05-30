/**
 * Created by austin on 5/3/17.
 */

const mongoose = require('mongoose');
const schema = require('../schemas/Organization');

const Branch = mongoose.model('Organization', schema);
module.exports = Branch;
