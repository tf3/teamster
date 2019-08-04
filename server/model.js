const { ObjectID } = require('mongodb');
const performOperation = require('./db.js');

module.exports.add = group => (
  performOperation(collection => collection.insertOne(group))
);

module.exports.find = (groupId) => {
  if (groupId) {
    return performOperation(collection => (
      collection.findOne({ _id: ObjectID(groupId) })
    ));
  }
  return performOperation(collection => collection.find().toArray());
};

module.exports.delete = groupId => (
  performOperation(collection => collection.findOneAndDelete({ _id: ObjectID(groupId) }))
    .then(res => res.value)
);
