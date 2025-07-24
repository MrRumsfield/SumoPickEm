document.addEventListener("DOMContentLoaded", async () => {
  const profileContainer = document.getElementById("profile-container");
  const username = localStorage.getItem("username");
  const picks = JSON.parse(localStorage.getItem("userPicks")) || [];

  const [rikishiData, matches] = await Promise.all([
    fetch("rikishi.json").then((res) => res.json()),
    fetch("matches.json").then((res) => res.json())
  ]);

  const rikishiMap = {};
  rikishiData.forEach(r => rikishiMap[r.id] = r.name);

  const getRikishiLink = (id) => {
    const name = rikishiMap[id] || id;
    return `<a href="rikishi.html?rikishi=${id}">${name}</a>`;
  };

  const picksHTML = picks.length === matches.length
    ? picks.map((pick, i) => {
        const match = matches[i];
        const east = getRikishiLink(match.east);
        const west = getRikishiLink(match.west);
        const picked = getRikishiLink(pick);

        return `
          <div class="match-pick">
            <div><strong>Match ${i + 1}:</strong> ${east} vs ${west}</div>
            <div>You picked: ${picked}</div>
          </div>
        `;
      }).join("")
    : `<p>No picks submitted yet.</p>`;

  profileContainer.innerHTML = `
    <h2>Welcome, ${username || "Guest"}!</h2>
    <h3>Your Previous Picks:</h3>
    ${picksHTML}
  `;
});
