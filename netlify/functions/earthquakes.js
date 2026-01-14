// netlify/functions/earthquakes.js

// This replaces Express server + routes
// It handles: CORS, query params, USGS fetch, and returns JSON

export async function handler(event, context) {
    console.log(">>> NETLIFY FUNCTION LOADED <<<");

    // CORS headers (Netlify requires manual return)
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET",
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers,
            body: "OK",
        };
    }

    // Equivalent of your Express route: /api/earthquakes
    try {
        // Read query parameters 
        const {
            minMagnitude = "4",
            timeRange = "week",
            region = "worldwide",
            depthRange = "all",
            sortBy = "recent",
        } = event.queryStringParameters || {};

        // Build USGS URL based on timeRange
        const timeMap = {
            hour: "all_hour",
            day: "all_day",
            week: "all_week",
            month: "all_month",
        };

        const usgsFeed = timeMap[timeRange] || "all_week";
        const usgsUrl = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${usgsFeed}.geojson`;

        const response = await fetch(usgsUrl);
        if (!response.ok) {
            return {
                statusCode: response.status,
                headers,
                body: JSON.stringify({ error: "Error fetching USGS data" }),
            };
        }

        const usgsData = await response.json();
        const features = usgsData.features || [];

        // Convert USGS data into proper format
        let quakes = features.map((f) => ({
            magnitude: f.properties.mag,
            place: f.properties.place,
            time: f.properties.time,
            depth: f.geometry.coordinates[2],
            latitude: f.geometry.coordinates[1],
            longitude: f.geometry.coordinates[0],
        }));

        // Apply  filters
        quakes = quakes.filter((q) => q.magnitude >= Number(minMagnitude));

        if (depthRange !== "all") {
            const [minD, maxD] = depthRange.split("-").map(Number);
            quakes = quakes.filter((q) => q.depth >= minD && q.depth <= maxD);
        }

        // Sorting
        if (sortBy === "magnitude") {
            quakes.sort((a, b) => b.magnitude - a.magnitude);
        } else {
            quakes.sort((a, b) => b.time - a.time);
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(quakes),
        };
    } catch (err) {
        console.error("Function error:", err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Server error fetching earthquakes" }),
        };
    }
}
