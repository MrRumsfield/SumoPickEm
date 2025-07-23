document.addEventListener("DOMContentLoaded", () => {
  fetch("matches.json")
    .then(response => response.json())
    .then(matches => {
      const tableBody = document.getElementById("matchup-table-body");

      matches.forEach((match, index) => {
        const row = document.createElement("tr");

        // East name with link
        const eastCell = document.createElement("td");
        const eastLink = document.createElement("a");
        eastLink.href = match.eastUrl;
        eastLink.textContent = match.east;
        eastLink.target = "_blank";
        eastCell.appendChild(eastLink);

        // Vote East radio button
        const voteEastCell = document.createElement("td");
        const voteEast = document.createElement("input");
        voteEast.type = "radio";
        voteEast.name = `vote${index}`;
        voteEast.value = "east";
        voteEastCell.appendChild(voteEast);

        // Vote West radio button
        const voteWestCell = document.createElement("td");
        const voteWest = document.createElement("input");
        voteWest.type = "radio";
        voteWest.name = `vote${index}`;
        voteWest.value = "west";
        voteWestCell.appendChild(voteWest);

        // West name with link
        const westCell = document.createElement("td");
        const westLink = document.createElement("a");
        westLink.href = match.westUrl;
        westLink.textContent = match.west;
        westLink.target = "_blank";
        westCell.appendChild(westLink);

        row.appendChild(eastCell);
        row.appendChild(voteEastCell);
        row.appendChild(voteWestCell);
        row.appendChild(westCell);

        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Failed to load matches:", error);
    });
});
