const mongo = require('mongodb').MongoClient;

const host = process.env.HOST || 'localhost';
const port = process.env.DB_PORT || '27017';

const performOperation = operation => (
  mongo.connect(`mongodb://${host}/${port}`, { useNewUrlParser: true })
    .then(client => client.db('team-builder'))
    .then(db => db.collection('groups'))
    .then(operation)
);

module.exports = performOperation;
