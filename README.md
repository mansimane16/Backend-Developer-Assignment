📊 CSV to JSON API – Backend Developer Assignment

A Node.js backend application built as part of a backend coding challenge.  
This project reads a CSV file, parses it into nested JSON objects (without using CSV-to-JSON libraries), inserts the data into a PostgreSQL database, and prints age group distribution to the console.

---

✅ Features

- Converts CSV to deeply nested JSON
- Handles dot notation keys like `name.firstName` → `{ name: { firstName: "" } }`
- Uploads parsed records to PostgreSQL
- Calculates and prints age group percentage report
- Uses environment variables for config
- No CSV-parsing npm packages used (custom logic)

---
🧪 Sample CSV Format

name.firstName,name.lastName,age,address.line1,address.city,address.state,gender
Rohit,Prasad,35,A-563,Pune,Maharashtra,male
Mansi,Mane,24,B-202,Mumbai,Maharashtra,female

📁 Project Structure

csv-to-json-api/
├── data/ → Sample CSV files
│ └── users.csv
├── src/
│ ├── config/ → DB connection (PostgreSQL)
│ ├── services/ → Upload to DB and age group reporting
│ ├── utils/ → Custom CSV parser
│ └── index.js → Main Express server
├── .env.example → Environment variable template
├── .gitignore
├── README.md

🛠️ Setup Instructions

1. Clone the repository
git clone https://github.com/your-username/csv-to-json-api.git
cd csv-to-json-api

2. Install dependencies
npm install

3. Configure environment
Create a .env file (use .env.example as reference):

PORT=3000
CSV_FILE_PATH=./data/users.csv
DB_URL=postgresql://postgres:yourpassword@localhost:5434/csvdb

4. Create PostgreSQL table
Make sure PostgreSQL is running and execute the following:

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR NOT NULL,
    age INT NOT NULL,
    address JSONB,
    additional_info JSONB
);

🚀 How to Use
Start the server
npm run dev 

Upload and process the CSV
Visit this URL in your browser :
http://localhost:3000/upload

It will:
Parse the CSV file
Transform and insert records into PostgreSQL
Print the age distribution report to the console

📊 Age Group Report Output (in terminal)

📊 Age Group Distribution Report:
+-----------+------------+
| Age Group | Percentage |
+-----------+------------+
| <20       | 20.00%     |
| 20-40     | 50.00%     |
| 40-60     | 20.00%     |
| >60       | 10.00%     |
+-----------+------------+

🔍 Assumptions
First row of the CSV is the header
Fields name.firstName, name.lastName, and age are always present
Dot-separated keys are converted into nested JSON
All fields starting with address. are grouped under the address field
All other extra fields go under additional_info
