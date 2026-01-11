/* File is in charge of the user interaction with the front end.This file controls for user interaction and other needed actions for the app to work properly.
*/

// Declare variables to link to the front end
const magInput = document.getElementById("magInput");
const searchBtn = document.getElementById("searchBtn");
const loadingElement = document.getElementById("loading");
const errorElement = document.getElementById("error");
const resultsElement = document.getElementById("results");

// Declare an async function to work with the data from the API for the front end
async function fetchEarthquakes(minMagnitude) {
    // Clear the text for the display elements
    errorElement.textContent = "";
    resultsElement.innerHTML = "";
    loadingElement.textContent = "Loading...";

    // Perform error handling for working with the API
    try {
        // Declare the response
        const response = await fetch(`/api/earthquakes?minMagnitude=${minMagnitude}`);

        // Control if there is no response from the API
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        // Get the data from the API and convert it to JSON
        const data = await response.json();
        //Utilized hoisting the function is below
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
        return;
    }

    if (data.length === 0) {
        resultsElement.textContent = "No earthquakes found!";
        return;
    }

    // Create the parent element to display quake data
    const list = document.createElement("ul");

    // Display the data gathered
    data.forEach((eq) => {
        const li = document.createElement("li");
        li.textContent = `Magnitude: ${eq.magnitude}, Location: ${eq.place}, Time: ${eq.time}`;
        list.appendChild(li);
    });

    // Clear the element before displaying
    resultsElement.innerHTML = "";
    // Display gathered data
    resultsElement.appendChild(list);
}

// Add event for when search is clicked
searchBtn.addEventListener("click", () => {
    const value = magInput.value;
    const minMagnitude = value ? Number(value) : 4;

    // Control if wrong input is given
    if (Number.isNaN(minMagnitude) || minMagnitude < 0) {
        errorElement.textContent = "Please enter a valid magnitude value."
        return;
    }

    fetchEarthquakes(minMagnitude);
});

document.addEventListener("DOMContentLoaded", () => {
    fetchEarthquakes(4);
});

