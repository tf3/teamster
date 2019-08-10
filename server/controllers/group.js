// eslint-disable-next-line no-unused-vars
const db = require('../db.js');
const Group = require('../models/group.js');

module.exports.add = newGroup => (
  Group.create(newGroup)
);

module.exports.find = (groupId) => {
  if (groupId) {
    return Group.findById(groupId);
  }
  return Group.find();
};

module.exports.update = (groupId, changes) => (
  Group.findByIdAndUpdate(groupId, changes, { new: true, useFindAndModify: false })
);

module.exports.delete = groupId => (
  Group.findByIdAndDelete(groupId, { useFindAndModify: false })
);
