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

document.getElementById("submitBtn").addEventListener("click", () => {
  const form = document.getElementById("picksForm");
  const inputs = form.querySelectorAll("input[type='radio']:checked");

  const selections = [];
  inputs.forEach((input, index) => {
    selections.push({ match: index + 1, pick: input.value });
  });

  localStorage.setItem("userPicks", JSON.stringify(selections));
  document.getElementById("confirmation").textContent = "Picks submitted!";
});

(async () => {
  await loadRikishi();
  await loadMatches();
})();
