/*
This file is for the Express router for the /earthquake endpoint. This tells Express which controller function runs when an request comes in.
*/

// Load express by creating a router object to handle only earthquake related routes
const router = require("express").Router();

// Import the earthquakes controller from the proper file for handling requests. Remember this function fetches and simplifies earthquake data
const ctrl = require("../controllers/earthquakesController");

// Define the route this connects the URL to the controller logic
router.get("/", ctrl.list);

// Export the router for the rest of the app to be used globally
module.exports = router;