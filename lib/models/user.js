// getting-started.js
const mongoose = require('mongoose');
const GoogleProfile = require('./GoogleProfile');
const { logger } = require('../utils/loggers');

const userSchema = mongoose.Schema({
  profile: GoogleProfile.schema,
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
userSchema.methods.addSchedule = function addSchedule(newScheduleData) {
  return new Promise((resolve, reject) => {
    const newSchedule = new Schedule(newScheduleData);
    this.schedules.push(newSchedule);
    resolve(newSchedule);
  });
};

userSchema.methods.getScheduleById = function getScheduleById(id) {
  return new Promise((resolve, reject) => {
    const schedule = this.schedules.id(id);
    // null if not found
    if (schedule) {
      resolve(schedule);
    } else {
      reject();
    }
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
module.exports.schema = userSchema;
