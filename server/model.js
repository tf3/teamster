const { ObjectID } = require('mongodb');
const performOperation = require('./db.js');

module.exports.add = group => (
  performOperation(collection => collection.insertOne(group))
    .then(res => res.ops[0])
);

module.exports.find = (groupId) => {
  if (groupId) {
    return performOperation(collection => (
      collection.findOne({ _id: ObjectID(groupId) })
    ));
  }
  return performOperation(collection => collection.find().toArray());
};

module.exports.update = (groupId, updatedGroup) => (
  performOperation(collection => (
    collection.findOneAndUpdate({ _id: ObjectID(groupId) }, { $set: updatedGroup },
      { returnOriginal: false })
  ))
    .then(res => res.value)
);

module.exports.delete = groupId => (
  performOperation(collection => collection.findOneAndDelete({ _id: ObjectID(groupId) }))
    .then(res => res.value)
);
