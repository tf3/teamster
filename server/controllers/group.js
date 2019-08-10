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
  Group.findByIdAndUpdate(groupId, changes, { new: true })
);

module.exports.delete = groupId => (
  Group.findByIdAndDelete(groupId)
);
