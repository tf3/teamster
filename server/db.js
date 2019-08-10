const mongoose = require('mongoose');

const host = process.env.HOST || 'localhost';
const port = process.env.DB_PORT || '27017';

mongoose.connect(`mongodb://${host}:${port}/team-builder`, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('connect', () => {
  console.log('Connected to MongoDB successfully.');
});

db.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err);
});

module.exports = db;
