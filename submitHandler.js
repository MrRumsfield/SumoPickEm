document.getElementById("submitButton").addEventListener("click", function () {
    const radioGroups = document.querySelectorAll('input[type="radio"]:checked');
    const picks = {};

    const year = "2025";
    const basho = "haru"; // or "nagoya", etc.
    const day = "3"; // adjust this as needed

    radioGroups.forEach((radio, index) => {
        const matchId = radio.name; // should be something like "match_0"
        const selectedPick = radio.value;

        // Retrieve data-e and data-w from the radio group container
        const container = document.querySelector(`div[data-matchid="${matchId}"]`);
        const east = container.getAttribute("data-east");
        const west = container.getAttribute("data-west");

        const fullMatchKey = `${year}_${basho}_${day}_${String(index + 1).padStart(3, '0')}`;

        picks[fullMatchKey] = {
            pick: selectedPick,
            winner: null,
            east: east,
            west: west
        };
    });

    // Save to localStorage
    localStorage.setItem("sumoPicks", JSON.stringify(picks));
    alert("Your picks have been saved!");
});
