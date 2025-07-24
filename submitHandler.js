document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit Picks";
  submitButton.style.display = "block";
  submitButton.style.margin = "20px auto";
  submitButton.style.padding = "10px 20px";
  submitButton.style.fontSize = "16px";

  document.body.appendChild(submitButton);

  submitButton.addEventListener("click", () => {
    const selections = [];
    const matchups = document.querySelectorAll(".matchup");

    matchups.forEach((match, index) => {
      const rikishiA = match.querySelector(".rikishi-a")?.textContent.trim() || "Rikishi A";
      const rikishiB = match.querySelector(".rikishi-b")?.textContent.trim() || "Rikishi B";
      const selected = match.querySelector(`input[name="match_${index}"]:checked`);
      const userPick = selected ? selected.value : null;

      selections.push({
        match: `${rikishiA} vs ${rikishiB}`,
        userPick: userPick,
        correctPick: null
      });
    });

    localStorage.setItem("sumoPicks", JSON.stringify(selections));
    alert("Your picks have been saved!");
  });
});
