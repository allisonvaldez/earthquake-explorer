<!--
File is in charge of the user interaction with the front end. This file controls for user interaction and other needed actions for the app to work properly.
-->

<!-- set the Port where the app will run for easy calling -->
const API_BASE = "http://localhost:3000";

<!-- Create the feeds with an eventlistener, run when the form is submitted -->
document.getElementById("feedForm").addEventListener("submit", async (e) => {
<!-- Don't allow for default browser behavior of reloading on form submission -->
e.preventDefault();

<!-- Get the value saved from the input box -->
const name = document.getElementById("feedName").value;

<!-- Get the value saved from the input box -->
const minMagnitude = document.getElementById("minMagnitude").value;

<!-- Make a HTTP POST request from the browser to the backend of the app -->
const res = await fetch(`${API_BASE}/api/feeds`, {
method: "POST",
<!-- Alert the server we are sending JSON data -->
headers: {"Content-Type": "application/json"},
<!-- Convert the JS object into a JSON string -->
body: JSON.stringify({name, minMagnitude}),
});

<!-- Wait for the serve to respond back then read the data and save it -->
const data = await res.json();
<!-- Display the feed and if one is not returned state it was created -->
document.getElementById("feedMessage").textContent = data.message || "Feed created";
});

<!-- Load the feeds -->
document.getElementById("loadFeedsBtn").addEventListener("click", async () => {

<!-- Send a GET request to the server, wait for a response -->
const res = await fetch(`${API_BASE}/api/feeds`);

<!--  Parse the response to JSON -->
const feeds = await res.json();

<!-- Get the element that will display-->
const list = document.getElementsById("feedsList");

<!-- Clear the content -->
list.innerHTML = "";

<!-- Create a for loop to go through each feed that populates the data -->
feeds.forEach((feed) => {
<!-- Create an element to hold the data -->
const li = document.createElement("li");
<!-- Create the content to populate -->
li.textContent = `${feed.name} (Min Magnitude: ${feed.minMagnitude})`;
<!-- Populate the element with the data-->
list.appendChild.(li);
});
});

<!-- Create an element to hold the data Fetch earthquake data -->
document.getElementById("loadQuakesBtn").addEventListener("click", async () ={

<!--  GET request to the USGS API via the PORT -->
const res = await fetch(`${API_BASE}/earthquakes?minmagnitude=4`);

<!-- Store the array of objects  -->
const quakes = await res.json();

<!-- Select the tbody  -->
const tbody = document.querySelector("#quakesTable tbody");

<!-- Clear the rows  -->
tbody.innerHTML = "";

<!-- Loop through the earthquake data -->
quakes.forEach((q) => {
<!-- Create an element for each earthquake -->
const row = document.createElement("tr");

<!-- Set the row contents with the data needed -->
row.innerHTML = `
<td>${q.properties.place}</td>
<td>${q.properties.mag}</td>
<td>${new Date(q.properties.time).toLocaleString()}</td>
`;
});
});