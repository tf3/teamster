const mongoose = require('mongoose');

const GroupSchema = mongoose.Schema({
  teams: Array,
  unassigned: Array,
});

const Group = mongoose.model('group', GroupSchema);

module.exports = Group;
