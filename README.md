# 🌎 Earthquake Explorer (Node.js + Express + Leaflet)

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express](https://img.shields.io/badge/Express.js-API-blue)
![Leaflet](https://img.shields.io/badge/Leaflet-Maps-brightgreen)
![Status](https://img.shields.io/badge/Status-Active-success)

A full‑stack earthquake visualization dashboard that displays real‑time seismic activity from the **USGS Earthquake API**.  
Users can filter, sort, and explore earthquakes on an interactive world map powered by **Leaflet.js**.

This project demonstrates backend API design, data transformation, service‑layer architecture, and interactive frontend mapping — ideal for showcasing full‑stack engineering skills.

---

## 🚀 Features

### 🌐 Frontend
- Interactive world map using **Leaflet.js**
- Dynamic earthquake markers sized and colored by magnitude
- Click‑to‑zoom from list → map
- Popups showing magnitude, depth, time, and location
- Clean UI for filtering and sorting:
  - Magnitude filter  
  - Time range (day, week, month)  
  - Region filter (California, Japan, Alaska, Worldwide)  
  - Depth filter (shallow, intermediate, deep)  
  - Sorting (largest first, most recent first)

### 🖥️ Backend
- Node.js + Express REST API
- Controller → Service architecture
- Fetches live data from the **USGS GeoJSON Feed**
- Applies:
  - Magnitude filtering  
  - Region bounding box filtering  
  - Depth filtering  
  - Sorting  
- Returns clean JSON for frontend consumption

### 🧰 Tooling
- Nodemon for development
- Modular, maintainable project structure

---

## 📁 Project Structure

```
earthquake-explorer/
│
├── server/
│   ├── controllers/
│   │   └── earthquakes.js
│   ├── routes/
│   │   └── earthquakes.js
│   └── services/
│       └── earthquakeService.js
│
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
└── index.js
```

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/allisonvaldez/earthquake-explorer.git
cd earthquake-explorer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the server
```bash
npm start
```

Server runs at:
```
http://localhost:5050
```

### 4. Open the frontend
Open `public/index.html` in your browser  
(or use VS Code Live Server)

---

## 📡 API Endpoint

### GET /api/earthquakes

Query parameters:

| Parameter | Example | Description |
|----------|----------|-------------|
| `minMagnitude` | `4` | Minimum magnitude |
| `timeRange` | `week` | `day`, `week`, or `month` |
| `region` | `california` | Region bounding box |
| `depthRange` | `shallow` | `shallow`, `intermediate`, `deep`, `all` |
| `sortBy` | `mag_desc` | Sorting option |

Example request:
```
/api/earthquakes?minMagnitude=4&timeRange=week&region=california&depthRange=shallow&sortBy=mag_desc
```

---

## 🎨 Frontend UI

The dashboard allows users to:
- Search earthquakes by filters  
- View results in a list  
- Click a list item to zoom to the marker  
- Explore earthquakes visually on a world map  

---

## 🧠 What I Learned

- How to structure a backend using controllers, routes, and services  
- How to consume and transform external API data  
- How to build interactive maps with Leaflet  
- How to design a clean filtering and sorting system  
- How to connect frontend UI → backend API → map visualization  

---

## 📌 Future Enhancements

- Hover highlight (list ↔ marker)
- Marker → list linking
- Pagination for large datasets
- Dark mode
- Earthquake details side panel

---

## 👤 Author

**Allison Valdez**  
Full‑Stack Software Engineer  
GitHub: https://github.com/allisonvaldez  
LinkedIn: *add your link here*
