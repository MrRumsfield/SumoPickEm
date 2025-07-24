document.addEventListener("DOMContentLoaded", function () {
    const picksContainer = document.getElementById("picksContainer");
    const picks = JSON.parse(localStorage.getItem("sumoPicks")) || {};

    if (Object.keys(picks).length === 0) {
        picksContainer.innerText = "No picks submitted yet.";
        return;
    }

    for (const matchKey in picks) {
        const { pick, winner, east, west } = picks[matchKey];

        const matchDiv = document.createElement("div");
        matchDiv.classList.add("match-entry");

        matchDiv.innerHTML = `
            <strong>${matchKey.replace(/_/g, ' ').toUpperCase()}</strong><br>
            <em>${east}</em> vs <em>${west}</em><br>
            Your Pick: <strong>${pick}</strong><br>
            Winner: <strong>${winner ? winner : "TBD"}</strong>
            <hr>
        `;

        picksContainer.appendChild(matchDiv);
    }
});
