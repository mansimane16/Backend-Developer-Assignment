const express = require('express');
const dotenv = require('dotenv');
const parseCSV = require('./utils/parseCSV');
const uploadUsers = require('./services/uploadService');
const generateAgeReport = require('./services/ageReportService');
require('./config/db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('CSV to JSON API is running!');
});

app.get('/upload', async (req, res) => {
  try {
    const records = parseCSV(process.env.CSV_FILE_PATH);
    await uploadUsers(records);
    await generateAgeReport(); // 📊 Call the age report function here
    res.send('✅ Upload complete and age report generated');
  } catch (err) {
    console.error('❌ Upload or reporting failed:', err);
    res.status(500).send('❌ Upload failed');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
