let rikishiData = {};
let picks = {};

async function loadRikishi() {
  const response = await fetch("rikishi.json");
  const data = await response.json();
  rikishiData = Object.fromEntries(data.map(r => [r.id, r.name]));
}

async function loadMatches() {
  const response = await fetch("matches.json");
  const matches = await response.json();
  const form = document.getElementById("picksForm");

  matches.forEach((match, index) => {
    const east = rikishiData[match.east] || match.east;
    const west = rikishiData[match.west] || match.west;

    const matchDiv = document.createElement("div");
    matchDiv.className = "match";

    matchDiv.innerHTML = `
      <strong>Match ${index + 1}</strong>:<br>
      <label>
        <input type="radio" name="match${index}" value="${match.east}"> ${east}
      </label>
      <label>
        <input type="radio" name="match${index}" value="${match.west}"> ${west}
      </label>
    `;

    form.appendChild(matchDiv);
  });
}

document.getElementById("submitBtn").addEventListener("click", async () => {
  const form = document.getElementById("picksForm");
  const inputs = form.querySelectorAll("input[type='radio']:checked");

  const selections = [];
  inputs.forEach((input, index) => {
    selections.push({ match: index + 1, pick: input.value });
  });

  // Store locally as backup
  localStorage.setItem("userPicks", JSON.stringify(selections));

  // Add today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Send to backend to write into picks.json
  try {
    const response = await fetch("/save-picks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: today,
        picks: selections
      })
    });

    if (response.ok) {
      document.getElementById("confirmation").textContent = "Picks submitted!";
    } else {
      document.getElementById("confirmation").textContent = "Error saving picks.";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("confirmation").textContent = "Submission failed.";
  }
});

(async () => {
  await loadRikishi();
  await loadMatches();
})();
