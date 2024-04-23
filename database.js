const sqlite3 = require('sqlite3').verbose();

let db;

const connectDB = () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database('./hadith_db.db', (err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Connected to SQLite database');
      resolve(db);
    });
  });
};

const disconnectDB = () => db.close((err) => {
  if (err) console.error('Error closing database connection:', err);
});

module.exports = { connectDB, disconnectDB };