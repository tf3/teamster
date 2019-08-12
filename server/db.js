const mongoose = require('mongoose');

const host = process.env.HOST || 'localhost';
const port = process.env.DB_PORT || '27017';
const user = process.env.DB_USER || 'admin';
const password = process.env.DB_PASSWORD || '';

mongoose.connect(`mongodb://${user}:${password}@${host}:${port}/team-builder?authSource=admin`,
  { useNewUrlParser: true });
const db = mongoose.connection;
db.disconnect = mongoose.disconnect;

db.on('connect', () => {
  console.log('Connected to MongoDB successfully.');
});

db.on('error', (err) => {
  console.log('Error connecting to MongoDB:', err);
});

module.exports = db;
