/**
 * Created by austin on 3/3/17.
 * Each model is a collection in the database
 */

const reqDir = require('require-directory');

const models = reqDir(module);

module.exports = models;
