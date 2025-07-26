const pool = require('../config/db');

async function generateAgeReport() {
  try {
    const result = await pool.query('SELECT age FROM users');
    const ages = result.rows.map(row => row.age);

    const total = ages.length;
    const groups = {
      '<20': 0,
      '20-40': 0,
      '40-60': 0,
      '>60': 0,
    };

    for (let age of ages) {
      if (age < 20) groups['<20']++;
      else if (age <= 40) groups['20-40']++;
      else if (age <= 60) groups['40-60']++;
      else groups['>60']++;
    }

    console.log('\n📊 Age Group Distribution Report:');
    console.log('+-----------+------------+');
    console.log('| Age Group | Percentage |');
    console.log('+-----------+------------+');

    for (let group in groups) {
        const percent = ((groups[group] / total) * 100).toFixed(2);
        const line = `| ${group.padEnd(9)} | ${percent.padEnd(10)} |`;
        console.log(line);
    }

    console.log('+-----------+------------+\n');
  } catch (err) {
    console.error('❌ Failed to generate age report:', err);
  }
}

module.exports = generateAgeReport;
