/**
 * Created by austin on 5/3/17.
 */
const mongoose = require('mongoose');
const schema = require('../schemas/Branch');

const Branch = mongoose.model('Branch', schema);
module.exports = Branch;
