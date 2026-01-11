/*
This file is for the Express router for the /routes/earthquake endpoint. This tells Express which controller function runs when an request comes in.
*/

// Create Express app
import express from "express";
// Get the getEarthquakes function from the controller file
import { getEarthquakes } from "../controllers/earthquakes.js";

// Create a router object to handle only earthquake related routes
const router = express.Router();

// Define the route this connects the URL to the controller logic
router.get("/", getEarthquakes);

// Export the router for the rest of the app to be used globally
export default router;