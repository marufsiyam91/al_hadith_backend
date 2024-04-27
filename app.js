const express = require('express');
const cors = require('cors');
const { connectDB, disconnectDB } = require('./database');

const app = express();
const port = 8800; // Adjust port number as needed
app.use(express.json())

// Connect to the database
connectDB()
  .then((db) => {
    console.log('Database connection established');

    app.use(cors());

    // Define API endpoints here (assuming a table named 'data')

    app.get('/api/books', async (req, res) => {
      try {
        const books = await new Promise((resolve, reject) => {
          db.all('SELECT * FROM books', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
          });
        });
        res.json(books);
      } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
    app.get('/api/chapters', async (req, res) => {
      try {
        const chapters = await new Promise((resolve, reject) => {
          db.all('SELECT * FROM chapter', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
          });
        });
        res.json(chapters);
      } catch (err) {
        console.error('Error fetching chapters:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
    app.get('/api/hadiths', async (req, res) => {
      try {
        const hadiths = await new Promise((resolve, reject) => {
          db.all('SELECT * FROM hadith', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
          });
        });
        res.json(hadiths);
      } catch (err) {
        console.error('Error fetching hadiths:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    
    app.get('/api/sections', async (req, res) => {
      try {
        const sections = await new Promise((resolve, reject) => {
          db.all('SELECT * FROM section', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
          });
        });
        res.json(sections);
      } catch (err) {
        console.error('Error fetching sections:', err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    

    // Add more API endpoints based on your requirements

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
    process.exit(1); // Exit on connection error
  });

// Handle graceful termination (optional)
process.on('SIGINT', () => {
  disconnectDB().then(() => {
    console.log('Database connection closed');
    process.exit(0);
  });
});