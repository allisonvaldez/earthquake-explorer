console.log(">>> SERVER FILE LOADED <<<");
// Create Express app
import express from "express";
// Security protocol to allow the browser to communicate with the backend
import cors from "cors";
// Import needed routes
import earthquakeRoutes from "./routes/earthquakes.js";

const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET"],
    allowedHeaders: ["Content-Type"]
}));

app.get("/cors-test", (req, res) => {
    res.json({ ok: true });
});

// Allow for the Express server to understand incoming JSON data
app.use(express.json());

//  For all requests starting with /api/earthquakes connect it to  the earthquake router
app.use("/api/earthquakes", earthquakeRoutes);

// Include a message for troubleshooting
app.get("/", (req, res) => {
    res.json({ message: "Earthquake API is running" })
});

// Set the Port to listen on 5050
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
