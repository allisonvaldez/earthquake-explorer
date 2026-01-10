// Load .env file
require("dotenv").config();

// Create Express app
const express = require("express");
const app = express();

// Import the logger middleware function from the logger.js file to plug into express
const logger = require("./server/middleware/logger");

// Import error handling middleware to catch and respond to errors consistently
const errorHandler = require("./server/middleware/errorHandler");

// Allow for the Express server to understand incoming JSON data coming from Postman
app.use(express.json());

// For each incoming request run the middleware function for troubleshooting
app.use(logger);

//  For all requests starting with /api/feeds connect it to the feeds router
app.use("/api/feeds", require("./server/routes/feeds"));

//  For all requests starting with /earthquakes connect it to  the earthquake router
app.use("earthquakes", require("./server/routes/earthquakes"));

// Catch and respond to thrown errors
app.use(errorHandler);

// Set the Port to listen on 3000 and start the server locally and in production
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});