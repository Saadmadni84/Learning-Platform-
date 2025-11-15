const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());

// PostgreSQL connection
const pool = new Pool({
  user: 'postgres',     // use "postgres" (your default user)
  host: 'localhost',
  database: 'school',   // database you created
  password: '',         // leave blank if no password set
  port: 5432,
});

// API to get all students
app.get('/students', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM students');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching students");
  }
});

app.listen(3000, () => console.log('✅ API running at http://localhost:3000/students'));