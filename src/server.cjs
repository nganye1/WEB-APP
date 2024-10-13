// Import necessary modules
const express = require('express'); // Express framework for building the server
const mysql = require('mysql2'); // MySQL driver for connecting to MySQL database
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing (CORS)

const app = express(); // Create an instance of an Express application

app.use(cors()); // Enable CORS for frontend-backend communication
app.use(express.json()); // Middleware to parse JSON request bodies

// Set up MySQL connection configuration
const db = mysql.createConnection({
  host: 'localhost', // Host where MySQL server is running
  user: 'root', // MySQL username
  password: 'yaksman101', // Replace with your MySQL root password
  database: 'country_search' // Name of the database to connect to
});

// Connect to the MySQL database
db.connect(err => {
  if (err) {
    // Log error message if connection fails
    console.error('Error connecting to MySQL:', err);
    return; // Exit if connection fails
  }
  console.log('Connected to MySQL database.'); // Log success message
});

// Route to handle GET requests for countries based on search query
app.get('/countries', (req, res) => {
  const search = req.query.search || ''; // Get the search term from query parameters (default to an empty string)
  const query = 'SELECT name FROM countries WHERE name LIKE ?'; // SQL query to fetch country names

  // Log the query and search term for debugging purposes
  console.log(`Executing query: ${query} with search term: %${search}%`);

  // Execute the SQL query with wildcard search
  db.query(query, [`%${search}%`], (err, results) => {
    if (err) {
      // If there is an error with the query, respond with a 500 status code and an error message
      return res.status(500).json({ error: 'Database query error' });
    }
    // Send the results back as a JSON response, mapping results to an array of country names
    res.json({ countries: results.map(row => row.name) });
  });
});

// Start the server on port 3006
const PORT = 3006;
app.listen(PORT, () => {
  // Log message indicating that the server is running
  console.log(`Server is running on http://localhost:${PORT}`);
});
