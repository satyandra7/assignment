require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const crypto = require('./crypto/routes');
const { fetchCryptoData } = require('./fetchCryptoData');

const app = express();


const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;
const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY;

//Middleware
app.use(express.json());


// Connect to the MongoDB database
mongoose.connect(DB_URI)
  .then(() => {
    console.log('Connected to the MongoDB database');
  }).catch((err) => {
    console.error('Failed to connect to the MongoDB database', err.message);
  });

const job = cron.schedule('0 */2 * * *', async () => {
    console.log('Running the cron job...');
    await fetchCryptoData(COINGECKO_API_KEY);
    });


job.start();

app.use('/crypto', crypto);

app.get('/', (req, res) => {
  res.send('Home page');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});