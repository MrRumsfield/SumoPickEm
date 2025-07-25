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
    let picksData = {};

    if (!err && data) {
      try {
        picksData = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing picks.json:", parseErr);
        return res.status(500).json({ error: "Malformed picks file" });
      }
    }

    if (!Array.isArray(picksData[today])) {
      picksData[today] = [];
    }

    picksData[today].push(submittedPicks);

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
