# Country Search Application

This is a simple country search application built with **React** for the frontend and **Node.js** with **MySQL** for the backend. Users can search for countries dynamically, and the application retrieves data from a MySQL database.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for countries in real-time.
- Dynamic retrieval of country data from a MySQL database.
- User-friendly interface with error handling and loading states.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MySQL
- **Package Management:** npm
- **CORS:** Middleware for enabling cross-origin requests

## Setup Instructions

To set up this project on your local machine, follow these steps:

### Prerequisites

- **Node.js** (v14 or higher): [Download Node.js](https://nodejs.org/)
- **MySQL**: [Download MySQL](https://dev.mysql.com/downloads/mysql/)
- **npm**: Comes bundled with Node.js

### 1. Clone the Repository

Open your terminal and run the following command to clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/country-search.git
cd country-search

#2. Set Up the Database
Open your MySQL Workbench (or any MySQL client).  
Create a new database and run the following SQL commands:

```sql
CREATE DATABASE country_search;
USE country_search;

CREATE TABLE countries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO countries (name) VALUES
('Albania'), ('Andorra'), ('Australia'), ('Brazil'), ('Belgium'), ('Canada'), 
('China'), ('France'), ('Germany'), ('India'), ('Indonesia'), ('Ireland'), 
('Italy'), ('Japan'), ('Kenya'), ('Luxembourg'), ('Mexico'), ('New Zealand'), 
('Nigeria'), ('Portugal'), ('Russia'), ('South Africa'), ('South Korea'), 
('Spain'), ('Sweden'), ('Thailand'), ('Ukraine'), ('United Kingdom'), 
('United States of America'), ('Vietnam'), ('Zambia');
### 3.Set Up the Backend
Navigate to the backend directory (if separated) or ensure you're in the main project directory.
Install the necessary packages:

npm install express mysql2 cors
Create a file named server.js (or similar) and add the following code:
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());  // Enable CORS for frontend-backend communication
app.use(express.json());  // Parse JSON request bodies

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'YOUR_MYSQL_PASSWORD',  // Replace with your MySQL root password
  database: 'country_search'
});

// Connect to the MySQL database
db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Route to get countries based on search query
app.get('/countries', (req, res) => {
  const search = req.query.search || '';  // Get the search term from query
  const query = 'SELECT name FROM countries WHERE name LIKE ?';

  console.log(`Executing query: ${query} with search term: %${search}%`);  // Log the query for debugging

  // Execute the SQL query with wildcard search
  db.query(query, [`%${search}%`], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json({ countries: results.map(row => row.name) });
  });
});

// Start the server on port 3006
const PORT = 3006;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
}

### 4.Set Up the Frontend

Navigate to the frontend directory (if separated) or stay in the main project directory.
Install the React application (if not created):
npx create-react-app frontend
cd frontend

### 5.Run the Application

Start the backend server:
node server.js

API Endpoints
GET /countries?search=QUERY: Retrieves a list of country names matching the search query.
Usage
Enter a country name in the search bar to see the results dynamically.
Click the "Remove" button to clear the search input and results.

