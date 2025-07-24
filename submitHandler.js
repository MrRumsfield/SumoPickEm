document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit Picks";
  submitButton.style.display = "block";
  submitButton.style.margin = "20px auto";
  submitButton.style.padding = "10px 20px";
  submitButton.style.fontSize = "16px";

  document.body.appendChild(submitButton);

  submitButton.addEventListener("click", () => {
    const selections = {};
    const matchups = document.querySelectorAll(".matchup");

    matchups.forEach((match, index) => {
      const selected = match.querySelector(`input[name="match_${index}"]:checked`);
      selections[`match_${index}`] = selected ? selected.value : null;
    });

    const year = "2025";
    const basho = "July";
    const day = "Day 1"; // You can later dynamically update this if needed

    const existingData = JSON.parse(localStorage.getItem("sumoPicks")) || {};

    // Merge in new data
    if (!existingData[year]) existingData[year] = {};
    if (!existingData[year][basho]) existingData[year][basho] = {};
    existingData[year][basho][day] = selections;

    localStorage.setItem("sumoPicks", JSON.stringify(existingData));
    alert("Your picks have been saved!");
  });
});
