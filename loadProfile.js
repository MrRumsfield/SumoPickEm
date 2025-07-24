// Get reference to where we’ll inject the HTML
const accordion = document.getElementById("picks-accordion");

const totalPicksSpan = document.getElementById("total-picks");
const correctPicksSpan = document.getElementById("correct-picks");
const accuracySpan = document.getElementById("accuracy");

// Load saved picks from localStorage
const savedData = JSON.parse(localStorage.getItem("sumoPicks")) || {};

let totalPicks = 0;
let correctPicks = 0;

// Group picks by year → basho → day
const picksByYear = {};

for (const key in savedData) {
  const match = key.match(/^(\d{4})_(\w+)_(\d{1,2})_(\d{3})$/); // year_basho_day_matchId
  if (!match) continue;

  const [_, year, basho, day, matchId] = match;
  const pickInfo = savedData[key];

  if (!picksByYear[year]) picksByYear[year] = {};
  if (!picksByYear[year][basho]) picksByYear[year][basho] = {};
  if (!picksByYear[year][basho][day]) picksByYear[year][basho][day] = [];

  picksByYear[year][basho][day].push({
    matchId,
    pick: pickInfo.pick,
    winner: pickInfo.winner || null, // Can be undefined
    east: pickInfo.east,
    west: pickInfo.west,
  });

  totalPicks++;
  if (pickInfo.pick && pickInfo.winner && pickInfo.pick === pickInfo.winner) {
    correctPicks++;
  }
}

// Update stats
totalPicksSpan.textContent = totalPicks;
correctPicksSpan.textContent = correctPicks;
accuracySpan.textContent = totalPicks > 0 ? `${Math.round((correctPicks / totalPicks) * 100)}%` : "0%";

// Build the collapsible table layout
let idCounter = 0;

for (const year of Object.keys(picksByYear).sort().reverse()) {
  for (const basho of Object.keys(picksByYear[year])) {
    const bashoId = `basho-${++idCounter}`;
    const bashoHeader = `
      <div class="accordion-item">
        <h2 class="accordion-header" id="heading-${bashoId}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${bashoId}" aria-expanded="false">
            ${year} - ${capitalize(basho)}
          </button>
        </h2>
        <div id="collapse-${bashoId}" class="accordion-collapse collapse" data-bs-parent="#picks-accordion">
          <div class="accordion-body">
            ${buildDaysTable(picksByYear[year][basho], bashoId)}
          </div>
        </div>
      </div>
    `;
    accordion.innerHTML += bashoHeader;
  }
}

// Helper to capitalize Basho names
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Create nested collapsible tables per day
function buildDaysTable(daysData, parentId) {
  let output = "";

  const sortedDays = Object.keys(daysData).sort((a, b) => Number(a) - Number(b));
  for (const day of sortedDays) {
    const dayId = `${parentId}-day-${day}`;
    const matches = daysData[day];

    output += `
      <div class="mb-2">
        <button class="btn btn-sm btn-outline-primary mb-1" data-bs-toggle="collapse" data-bs-target="#${dayId}">
          Day ${day}
        </button>
        <div class="collapse" id="${dayId}">
          <div class="table-responsive">
            <table class="table table-bordered table-sm mb-0">
              <thead class="table-light">
                <tr>
                  <th>Match ID</th>
                  <th>East</th>
                  <th>West</th>
                  <th>Your Pick</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                ${matches.map(matchRow).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  return output;
}

// Display a single match row
function matchRow(match) {
  const { matchId, east, west, pick, winner } = match;

  const pickStr = pick ? (pick === east ? `<strong>${east}</strong>` : west) : "—";
  const winnerStr = winner
    ? (winner === pick ? `<span class="text-success">${winner} ✓</span>` : `<span class="text-danger">${winner} ✗</span>`)
    : "<em>Pending</em>";

  return `
    <tr>
      <td>${matchId}</td>
      <td>${east}</td>
      <td>${west}</td>
      <td>${pickStr}</td>
      <td>${winnerStr}</td>
    </tr>
  `;
}
