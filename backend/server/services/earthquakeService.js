/*
This file is for the Earthquake Service Layer, it is the middleman between the controller and external USGS API. This is where we transform and filter the USGS data.
*/

// Import fetch
import fetch from "node-fetch";

//  Time range and USGS feed mapping
const feedMap = {
    day: "all_day",
    week: "all_week",
    month: "all_month"
};

// Add region bounding boxes from the backend
const regionBounds = {
    worldwide: null,
    california: { minLat: 32, maxLat: 42, minLon: -125, maxLon: -114 },
    japan: { minLat: 30, maxLat: 46, minLon: 129, maxLon: 146 },
    alaska: { minLat: 51, maxLat: 72, minLon: -170, maxLon: -129 }
};

/*
This block of code is responsible for making the HTTP request to the USGS API global. It starts by defining the URL and the the response.
*/
export async function fetchEarthquakeData(minMagnitude, timeRange, region, depthRange, sortBy) {
    try {
        const feed = feedMap[timeRange] || "all_week";
        const bounds = regionBounds[region];

        const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${feed}.geojson`;

        // Save the response from the API
        const response = await fetch(url);

        // If there is no response display why
        if (!response.ok) {
            throw new Error(`USGS API Error: ${response.status}`)
        }

        // Get the data from the API and make it into JSON
        const json = await response.json()

        const features = json.features;

        // Convert USGS features into my earthquake objects
        let earthquakes = features.map(f => ({
            time: f.properties.time,
            magnitude: f.properties.mag,
            place: f.properties.place,
            latitude: f.geometry.coordinates[1],
            longitude: f.geometry.coordinates[0],
            depth: f.geometry.coordinates[2],
        }));

        // Apply region filters
        if (bounds) {
            earthquakes = earthquakes.filter(eq =>
                eq.latitude >= bounds.minLat &&
                eq.latitude <= bounds.maxLat &&
                eq.longitude >= bounds.minLon &&
                eq.longitude <= bounds.maxLon
            );
        }

        // Apply magnitude filter
        earthquakes = earthquakes.filter(eq => eq.magnitude >= minMagnitude);

        // Apply sorting
        if (sortBy === "time_desc") {
            earthquakes.sort((a, b) => b.time - a.time);
        } else if (sortBy === "time_asc") {
            earthquakes.sort((a, b) => a.time - b.time);
        } else if (sortBy === "mag_desc") {
            earthquakes.sort((a, b) => b.magnitude - a.magnitude);
        } else if (sortBy === "mag_asc") {
            earthquakes.sort((a, b) => a.magnitude - b.magnitude);
        }

        return earthquakes;

    } catch (err) {
        console.error("Service error:", err);
        throw err;
    }
}