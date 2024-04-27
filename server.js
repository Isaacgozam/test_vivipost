// Prepare the needed libraries for the server
const express = require('express');
const app = express();
const port = 3000; // Choose any port you prefer
const path = require('path');

// to parse the requests
app.use(express.json());

// To load all env variables in the sub folder
require('dotenv').config({ path: "resources/.env"})

// bring middleware with the app
require('./middleware.js')(app)

// Home page
app.get('/', (req, res) => {
    const htmlPath = path.join(__dirname, 'templates/home.html');
    // Send the HTML for home as response
    res.sendFile(htmlPath);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


