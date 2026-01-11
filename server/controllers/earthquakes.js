/*
This file is the controller function for the /earthquake endpoint.
*/

/* Export the list controller function for it to be available globally it will be async because it will wait for data from the USGS API.  It is called when the /earthquakes route is called
*/
export async function getEarthquakes(req, res) => {
    // control for errors and pass them to Express's error handler
    try {
        // Convert the request for the minMagnitude to a number otherwise set it to 4 if nothing was returned
        const minMagnitude = Number(req.query.minMagnitude) || 4;
        // Call the function to fetch the min magnitude and store the result
        const data = await fetchEarthquakeData(minMagnitude);
        // Convert the response data to JSON
        res.json(data);
    } catch (err) {
        console.error("Controller error:", err);
        res.status(500).json({ error: "Failed to fetch earthquake data" });
    }
}