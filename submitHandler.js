document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit Picks";
  submitButton.style.display = "block";
  submitButton.style.margin = "20px auto";
  submitButton.style.padding = "10px 20px";
  submitButton.style.fontSize = "16px";

  document.body.appendChild(submitButton);

  submitButton.addEventListener("click", () => {
    const matchups = document.querySelectorAll(".matchup");
    const picks = [];

    matchups.forEach((match, index) => {
      const selected = match.querySelector(`input[name="match_${index}"]:checked`);
      const rikishi1 = match.dataset.rikishi1 || "Rikishi A";
      const rikishi2 = match.dataset.rikishi2 || "Rikishi B";

      picks.push({
        match: `${rikishi1} vs ${rikishi2}`,
        userPick: selected ? selected.value : "No Pick",
        correctPick: null  // We'll update this after the match is completed
      });
    });

    // Build structure for 2025 Nagoya Day X (example day = 1)
    const year = "2025";
    const basho = "nagoya";
    const day = "1"; // This should be dynamic if your app tracks current day
    const key = `${year}_${basho}_${day}`;

    const existingData = JSON.parse(localStorage.getItem("sumoUserData")) || { picks: {} };
    existingData.picks[key] = picks;

    localStorage.setItem("sumoUserData", JSON.stringify(existingData));
    alert("Your picks have been saved!");
  });
});
