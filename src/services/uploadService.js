const pool = require('../config/db');

function extractFields(record) {
  const nameObj = record.name || {};
  const name = `${nameObj.firstName || ''} ${nameObj.lastName || ''}`.trim();
  const age = parseInt(record.age, 10);

  const address = record.address || {};

  const { name: _n, age: _a, address: _ad, ...additional_info } = record;

  return {
    name,
    age,
    address,
    additional_info
  };
}

async function uploadUsers(records) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const record of records) {
      const { name, age, address, additional_info } = extractFields(record);

      await client.query(
        `INSERT INTO users ("name", age, address, additional_info)
         VALUES ($1, $2, $3, $4)`,
        [name, age, address, additional_info]
      );
    }

    await client.query('COMMIT');
    console.log('✅ All records inserted successfully.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Error inserting records:', err);
  } finally {
    client.release();
  }
}

module.exports = uploadUsers;
