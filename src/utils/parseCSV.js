const fs = require('fs');

function setNestedValue(obj, key, value) {
  const keys = key.split('.');
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }

  current[keys[keys.length - 1]] = value;
}

function parseCSV(filePath) {
  const csv = fs.readFileSync(filePath, 'utf-8');
  const lines = csv.trim().split('\n');

  const headers = lines[0].split(',').map(h => h.trim());
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const obj = {};

    for (let j = 0; j < headers.length; j++) {
      const key = headers[j];
      const value = values[j] ?? '';
      setNestedValue(obj, key, value);
    }

    data.push(obj);
  }

  return data;
}

module.exports = parseCSV;
