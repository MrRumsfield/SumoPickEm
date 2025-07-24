document.addEventListener("DOMContentLoaded", () => {
  fetch("matches.json")
    .then((response) => response.json())
    .then((matches) => {
      const container = document.getElementById("matchups");
      matches.forEach((match) => {
        const id = `${match.east.id}_vs_${match.west.id}`;
        const row = document.createElement("div");
        row.classList.add("matchup-row");
        row.dataset.matchId = id;

        const labelEast = document.createElement("label");
        const radioEast = document.createElement("input");
        radioEast.type = "radio";
        radioEast.name = `match-${id}`;
        radioEast.value = "east";
        labelEast.appendChild(radioEast);
        labelEast.appendChild(document.createTextNode(` ${match.east.name}`));

        const labelWest = document.createElement("label");
        const radioWest = document.createElement("input");
        radioWest.type = "radio";
        radioWest.name = `match-${id}`;
        radioWest.value = "west";
        labelWest.appendChild(radioWest);
        labelWest.appendChild(document.createTextNode(` ${match.west.name}`));

        row.appendChild(labelEast);
        row.appendChild(document.createTextNode(" vs "));
        row.appendChild(labelWest);

        container.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error loading matches.json:", error);
    });
});
