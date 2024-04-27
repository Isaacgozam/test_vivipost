const express = require('express');
const app = express();
const port = 3000; // Choose any port you prefer
// To load all env variables in the sub folder
require('dotenv').config({ path: "resources/.env"})
require('./orders.js')
// Define a route for the homepage
app.get('/', (req, res) => {
    // res.send('Welcome to my backend server!');
    res.json(require('./orders.js'));
});


// Define a route for a sample API endpoint
app.get('./orders', (req, res) => {
    res.json(require('./orders.js'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


