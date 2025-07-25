const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

const PICKS_FILE = path.join(__dirname, "public", "picks.json");

app.post("/submit-picks", (req, res) => {
  const submittedPicks = req.body;
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

  fs.readFile(PICKS_FILE, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading picks.json:", err);
      return res.status(500).json({ error: "Could not read picks file" });
    }

    let picksData;
    try {
      picksData = JSON.parse(data);
    } catch (parseErr) {
      console.error("Error parsing picks.json:", parseErr);
      return res.status(500).json({ error: "Malformed picks file" });
    }

    // Add or replace picks for today
    picksData[today] = submittedPicks;

    fs.writeFile(PICKS_FILE, JSON.stringify(picksData, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing picks.json:", writeErr);
        return res.status(500).json({ error: "Could not write picks file" });
      }

      res.json({ message: "Picks saved successfully" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
