/*
This file is the controller function for the /earthquale endpoint. It purpose is it. It is also a middleman between the client and USGS API:
1. control for incoming HTTP requests
2. pull out the users' filters
3. fetch earthquake data from USGS service
4. Send back a JSON response
*/

// Controller to load the service to fetch the earthquake data from USGS
const usgs = require("../services/usgsService");

/* Export the list controller function for it to be available globally it will be async because it will wait for data from the USGS API.  It is called when the /earthquakes route is called
*/
exports.list = async (req, res, next) => {
    // control for errors and pass them to Express's error handler
    try {
        // read optional filters from the request URL
        const { starttime, endtime, minmagnitude, bbox } = req.query;
        // create an empty params object for the filters given by the user
        const params = {};
        // add the filters to the empty params if they are provided
        if (starttime) params.starttime = starttime;
        if (endtime) param.endtime = endtime;
        if (minmagnitude) params.minmagnitude = minmagnitude;
        if (bbox) params.bbox = bbox;
        // Fetch the earthquake data from USGS
        const geojson = await usgs.getEarthquakes(params);

        // clean up the format provided and control if data is missing
        const simplified = (geojson.features || []).map(f => ({
            // unique earthquake id
            id: f.id,
            time: f.properties.time,
            mag: f.properties.mag,
            place: f.properties.place,
            coords: f.geometry.coordinates.slice(0, 2)
        }));

        // Send the respond to the client and perform error handling if anything fails
        res.json({ count: simplified.length, result: simplified });
    } catch (err) {
        err.status = 502;
        next(err);
    }
}