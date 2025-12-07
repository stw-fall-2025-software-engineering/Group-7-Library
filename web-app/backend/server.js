const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({ message: "Smart Library Backend Running" });
});

// Placeholder for features
app.get("/api/space", (req, res) => {
    res.json({ availableSpaces: 42 }); // dummy data for now
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
