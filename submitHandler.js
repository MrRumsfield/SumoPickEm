document.addEventListener("DOMContentLoaded", () => {
  // Add the submit button dynamically
  const container = document.getElementById("matchups");
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit Picks";
  submitBtn.id = "submit-picks";
  submitBtn.style.marginTop = "20px";
  container.appendChild(submitBtn);

  // Handle submission
  submitBtn.addEventListener("click", () => {
    const selectedResults = {};

    const rows = document.querySelectorAll(".matchup-row");
    rows.forEach(row => {
      const matchId = row.dataset.matchId;
      const selected = row.querySelector('input[type="radio"]:checked');
      if (selected) {
        selectedResults[matchId] = selected.value;
      }
    });

    console.log("User Picks:", selectedResults); // For dev tools check
    localStorage.setItem("userPicks", JSON.stringify(selectedResults));
    alert("Picks submitted and stored!");
  });
});
