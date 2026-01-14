/*
This file is the controller function for the /earthquake endpoint.
*/

//Import necessary functions for program to run
import { fetchEarthquakeData } from "../services/earthquakeService.js";

/* Export the list controller function for it to be available globally it will be async because it will wait for data from the USGS API.  It is called when the /earthquakes route is called
*/
export async function getEarthquakes(req, res) {
    // control for errors and pass them to Express's error handler
    try {
        const minMagnitude = Number(req.query.minMagnitude) || 4;
        const timeRange = req.query.timeRange || "week";
        const region = req.query.region || "worldwide";
        const depthRange = req.query.depthRange || "all";
        const sortBy = req.query.sortBy || "time_desc";

        // Call the function to fetch the min magnitude and store the result
        const data = await fetchEarthquakeData(minMagnitude, timeRange, region, depthRange, sortBy);

        // Convert the response data to JSON
        res.json(data);

    } catch (err) {
        console.error("Controller error:", err);
        res.status(500).json({ error: "Failed to fetch earthquake data" });
    }
}