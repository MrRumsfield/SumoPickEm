document.addEventListener("DOMContentLoaded", () => {
  fetch("rikishi.json")
    .then(response => response.json())
    .then(rikishiList => {
      const container = document.getElementById("rikishi-list");
      rikishiList.forEach(rikishi => {
        const link = document.createElement("a");
        link.href = rikishi.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = rikishi.name;
        link.className = "rikishi-link"; // optional: for styling
        container.appendChild(link);
        container.appendChild(document.createElement("br"));
      });
    })
    .catch(error => {
      console.error("Failed to load rikishi list:", error);
    });
});
