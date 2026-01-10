const API_BASE = "http://localhost:3000";

// CREATE FEED
document.getElementById("feedForm").addEventListener("submit", async (e) => {
e.preventDefault();

const name = document.getElementById("feedName").value;
const minMagnitude = document.getElementById("minMagnitude").value;

const res = await fetch(`${API_BASE}/api/feeds`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ name, minMagnitude }),
});

const data = await res.json();
document.getElementById("feedMessage").textContent = data.message || "Feed created!";
});

// LOAD FEEDS
document.getElementById("loadFeedsBtn").addEventListener("click", async () => {
const res = await fetch(`${API_BASE}/api/feeds`);
const feeds = await res.json();

const list = document.getElementById("feedsList");
list.innerHTML = "";

feeds.forEach((feed) => {
const li = document.createElement("li");
li.textContent = `${feed.name} (Min Mag: ${feed.minMagnitude})`;
list.appendChild(li);
});
});

// FETCH EARTHQUAKES
document.getElementById("loadQuakesBtn").addEventListener("click", async () => {
const res = await fetch(`${API_BASE}/earthquakes?minmagnitude=4`);
const quakes = await res.json();

const tbody = document.querySelector("#quakesTable tbody");
tbody.innerHTML = "";

quakes.forEach((q) => {
const row = document.createElement("tr");

row.innerHTML = `
<td>${q.properties.place}</td>
<td>${q.properties.mag}</td>
<td>${new Date(q.properties.time).toLocaleString()}</td>
`;

tbody.appendChild(row);
});
});