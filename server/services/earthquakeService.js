/*
This file is for the Earthquake Service Layer, it is the middleman between the controller and external USGS API.
*/

// Import fetch
import fetch from "node-fetch";
/*
This block of code is responsible for making the HTTP request to the USGS API global. It starts by defining the URL and the the response.
*/
export async function fetchEarthquakeData(minMagnitude) {
    const url = `https://earthquake.usgs.gov/fdsnws/event/1/query` + `?format=geojson&minmagnitude=${minMagnitude}`;

    // Control for error handling
    try {
        // Save the response from the API
        const response = await fetch(url);

        // If there is no response display why
        if (!response.ok) {
            throw new Error(`USGS API Error: ${response.status}`)
        }

        // Get the data from the API and make it into JSON
        const json = await response.json()

        // clean up the format and control if theres missing data
        return json.features.map((eq) => ({
            time: new Date(eq.properties.time).toLocaleString(),
            id: eq.id,
            magnitude: eq.properties.mag,
            place: eq.properties.place,
        }));

    } catch (err) {
        console.error("Service error:", err);
        throw err;
    }
}


