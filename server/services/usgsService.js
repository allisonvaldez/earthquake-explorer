/*
This file is for the Earthquake Service Layer, it is the middleman between the controller and external USGS API.

It is repsonsible for:
1. Fetching the earthquake data from the USGS API
2. Cathcing results to avoid unnessary API calls
3. Returns clean GeoJSON data to my controller
*/

// Import the axios library since this is responsible to make HTTP requests
const axios = require("axios");

// Import Nodes querystring module for converting objects of parameters into query string
const qs = require("querystring");

// Set 60s as the timeout for cache responses
const CACHE_TTL = Number(process.env.CACHE_TTL_SECONDS || 60);

// Create a new map object for in memory cache
const cache = new Map();

/*
Create a unique and repeatable string key for a set of parameters to the catch can recognize if a request was placed before
*/
function cacheKey(params) {
    // If params if falsy use {} instead
    return qs.stringify(params || {});
}

/*
This block of code is responsible to making the HTTP request to the USGS API. It starts by defining the URL and the the response.
*/
async function fetchFromUsgs(params) {
    const url = "https://earthquake.usgs.gov/fdsnws/event/1/query";
    // send the GET request to the URL
    const res = await axios.get(url, { params: { format: "geojson", ...params }, timeout: 5000 });
    // hide unnecessary data only return GeoJSON data
    return res.data;
}

/*
This block of code is the main function to gather earthquake data to be made available globally accross the app.
*/
exports.getEarthquakes = async (params) => {
    // create a cache key string from the param object
    const key = cacheKey(params);
    // Time is in miliseconds
    const now = Date.now();
    // Check for previously fetched data for the same request for the key
    const cached = cache.get(key);

    // If there is cached data and its not too old return it prevents calling the external API too soon
    if (cached && (now - cached.ts) < CACHE_TTL * 1000) {
        return cached.data;
    }

    // Get new data when the cache is empty or otherwise expired
    const data = await fetchFromUsgs(params);
    // Store fetched data in the cache Map under the proper key to keep from using the API again
    cache.set(key, { ts: now, data });
    return data;
}


