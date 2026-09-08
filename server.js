require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS & JSON parsing
app.use(express.json());

// Serve static assets from public folder
app.use(express.static(path.join(__dirname, "public")));

// Ensure /images is always served from public/images
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// API endpoint to serve public config from .env with fallback defaults
app.get("/api/config", (req, res) => {
    res.json({
        CONTACT_NUMBER: process.env.CONTACT_NUMBER || "+919884087878",
        DISPLAY_CONTACT_NUMBER: process.env.DISPLAY_CONTACT_NUMBER || "+91 9884087878",
        EMAIL_ADDRESS: process.env.EMAIL_ADDRESS || "trustcareelectronics@gmail.com",
        MAP_LOCATION_URL: process.env.MAP_LOCATION_URL || "https://maps.app.goo.gl/U5BKf7q1mpoMP46T9"
    });
});

// Clean URLs support locally (e.g., /battery -> battery.html)
const pages = ["battery", "inverter", "ups", "about"];
pages.forEach((page) => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(__dirname, "public", `${page}.html`));
    });
});

// Catch-all route to serve index.html for root or unknown paths
app.get("*", (req, res) => {
    const requestedPath = path.join(__dirname, "public", req.path);
    res.sendFile(requestedPath, (err) => {
        if (err) {
            res.sendFile(path.join(__dirname, "public", "index.html"));
        }
    });
});

// Only listen if run directly (local development)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;