/* File is in charge of the user interaction with the front end.This file controls for user interaction and other needed actions for the app to work properly.
*/

// Declare variables to link to the front end
const magInput = document.getElementById("magInput");
const searchBtn = document.getElementById("searchBtn");
const loadingElement = document.getElementById("loading");
const errorElement = document.getElementById("error");
const resultsElement = document.getElementById("results");

// Leaflet map variables
let map;
let markersLayer;

// Initialize the map
function initMap() {
    map = L.map("map").setView([20, 0], 2);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 10,
        attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    markersLayer = L.layerGroup().addTo(map);
}
// Function to control for earthquake magnitude
function getColorForMagnitude(mag) {
    if (mag >= 7) return "#d73027";
    if (mag >= 5) return "#fc8d59";
    if (mag >= 3) return "#fee08b";
    return "#91cf60";
}

// Declare an async function to work with the data from the API for the front end
async function fetchEarthquakes(minMagnitude, timeRange, region, depthRange, sortBy) {
    // Clear the text for the display elements
    errorElement.textContent = "";
    resultsElement.innerHTML = "";
    loadingElement.textContent = "Loading...";

    // Perform error handling for working with the API
    try {
        // Declare the response for a fetch
        const response = await fetch(
            `http://localhost:5050/api/earthquakes?minMagnitude=${minMagnitude}&timeRange=${timeRange}&region=${region}&depthRange=${depthRange}&sortBy=${sortBy}`
        );

        // Control if there is no response from the API
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        // Get the data from the API and convert it to JSON
        const data = await response.json();
        renderEarthquakes(data);

        // Clear the text for the display elements
        loadingElement.textContent = "";
    } catch (err) {
        console.error(err);
        loadingElement.textContent = "";
        errorElement.textContent = "Unable to load the earthquake data, try again!";
    }
}

// Function to control for working with the USGS API and displaying to the front end
function renderEarthquakes(data) {
    // Perform error handling for working with the API prevents the app from crashing
    if (!data || !Array.isArray(data)) {
        resultsElement.textContent = "No data to display!";
        if (markersLayer) markersLayer.clearLayers();
        return;
    }

    if (data.length === 0) {
        resultsElement.textContent = "No earthquakes found!";
        if (markersLayer) markersLayer.clearLayers();
        return;
    }

    // Clears previous results and creates a list container
    resultsElement.innerHTML = "";
    const list = document.createElement("ul");
    resultsElement.appendChild(list);

    if (!map || !markersLayer) return;

    // Clear previos markers
    markersLayer.clearLayers();
    const markers = [];
    const bounds = [];

    // Display the data gathered
    data.forEach((eq) => {
        // Error handling for wrong coordinates
        if (typeof eq.latitude !== "number" || typeof eq.longitude !== "number") {
            return;
        }
        const date = new Date(eq.time);

        // Create list items
        const li = document.createElement("li");
        li.textContent = `Time: ${date.toLocaleString()}, Magnitude: ${eq.magnitude}, Location: ${eq.place}`;
        li.style.borderLeftColor = getColorForMagnitude(eq.magnitude); list.appendChild(li);
        list.appendChild(li);

        // Create markers
        const marker = L.circleMarker([eq.latitude, eq.longitude], {
            radius: Math.max(eq.magnitude * 1.5, 4),
            color: getColorForMagnitude(eq.magnitude),
            fillColor: getColorForMagnitude(eq.magnitude),
            fillOpacity: 0.7
        });

        marker.bindPopup(
            `<strong>Magnitude:</strong> ${eq.magnitude}<br>
             <strong>Location:</strong> ${eq.place}<br>
             <strong>Time:</strong> ${date.toLocaleString()}<br>
             <strong>Depth:</strong> ${eq.depth} km`
        );

        marker.addTo(markersLayer);
        markers.push(marker);
        bounds.push([eq.latitude, eq.longitude]);

        // Wire the list items to marker for the click to zoom feature set to 7
        li.addEventListener("click", () => {
            map.setView([eq.latitude, eq.longitude], 7);
            marker.openPopup();
        });
    });

    if (bounds.length > 0) {
        map.fitBounds(bounds, { padding: [20, 20] });
    }
}

// Add event for when search is clicked
searchBtn.addEventListener("click", () => {
    const value = magInput.value.trim();
    const minMagnitude = Number(value);
    const timeRange = document.getElementById("timeRange").value;
    const region = document.getElementById("region").value;
    const depthRange = document.getElementById("depthRange").value;
    const sortBy = document.getElementById("sortBy").value;

    if (Number.isNaN(minMagnitude) || minMagnitude < 0) {
        errorElement.textContent = "Please enter a valid magnitude value.";
        return;
    }

    fetchEarthquakes(minMagnitude, timeRange, region, depthRange, sortBy);
});

document.addEventListener("DOMContentLoaded", () => {
    initMap();
    fetchEarthquakes(4, "week", "worldwide", "all");
});

