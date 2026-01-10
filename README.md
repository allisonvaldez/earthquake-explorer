# 🌎 Earthquake Tracker (Node.js, Express, MongoDB)

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express.js-Backend-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Status](https://img.shields.io/badge/Status-Active-success)

A full‑stack application that tracks real‑time earthquake data using the USGS Earthquake API.  
The backend is built with **Node.js + Express**, data is stored in **MongoDB**, and a simple **frontend dashboard** allows users to interact with the API.

This project demonstrates backend API design, CRUD operations, middleware, database integration, and a lightweight UI — perfect for showcasing full‑stack skills.

---

## 🚀 Features

### **Backend**
- RESTful API architecture  
- CRUD operations for user‑defined earthquake “feeds”  
- Real‑time earthquake data from USGS  
- Custom middleware (logger, error handler)  
- Environment variable support with dotenv  
- Modular controllers, routes, and services  

### **Database**
- MongoDB for persistent storage  
- Mongoose models & validation  

### **Frontend**
- Simple dashboard built with HTML/CSS/JavaScript  
- Create, list, and manage feeds  
- Fetch and display earthquake data  

### **Tooling**
- Nodemon for development  
- Postman collection included  
- Clean project structure  

---

## 📁 Project Structure

```
EarthQuakeTracker/
│
├── index.js
├── package.json
├── .env
│
├── server/
│   ├── controllers/
│   │   ├── feedsController.js
│   │   └── earthquakesController.js
│   ├── middleware/
│   │   ├── logger.js
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Feed.js
│   ├── routes/
│   │   ├── feeds.js
│   │   └── earthquakes.js
│   └── services/
│       └── usgsService.js
│
├── client/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
└── postman/
    └── EarthquakeTracker.postman_collection.json
```

---

## 🛠️ Getting Started

### **1. Clone the repository**

```bash
git clone https://github.com/allisonvaldez/earthquake-tracker.git
cd earthquake-tracker
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Create a `.env` file**

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/earthquake_tracker
```

### **4. Start MongoDB**

If using Homebrew on macOS:

```bash
brew services start mongodb-community
```

Or run MongoDB manually if installed another way.

### **5. Start the server**

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### **Feeds**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/feeds` | List all feeds |
| POST | `/api/feeds` | Create a feed |
| GET | `/api/feeds/:id` | Get feed by ID |
| PUT | `/api/feeds/:id` | Update feed |
| DELETE | `/api/feeds/:id` | Delete feed |

### **Earthquakes**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/earthquakes?minmagnitude=4` | Fetch earthquakes from USGS |

---

## 🗄️ Database (MongoDB)

MongoDB stores all user‑created feeds.

### **Feed Model Example**

```js
const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  minMagnitude: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feed', FeedSchema);
```

---

## 🎨 Frontend

A simple dashboard lives in the `/client` folder.

To use it:

1. Start your backend  
2. Open `client/index.html` in your browser  

The UI allows you to:
- Create feeds  
- List feeds  
- Fetch earthquakes  
- Display results in a table  

---

## 🧪 Postman Collection

A complete Postman collection is included:

```
/postman/EarthquakeTracker.postman_collection.json
```

Import it into Postman to test all endpoints quickly.

---

## 📸 Screenshots (optional)

Add screenshots of:
- Your frontend dashboard  
- Postman tests  
- Terminal output  

This makes your repo more visually appealing.

---

## 🧠 What I Learned

- Designing REST APIs with Express  
- Integrating third‑party APIs (USGS)  
- Using MongoDB + Mongoose