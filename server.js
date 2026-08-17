const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve public site files
app.use(express.static(path.join(__dirname, "public")));

// Serve image assets from the real image folders
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// Catch-all route for SPA-like behavior
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});