window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("userPicks");
  if (saved) {
    console.log("Previous picks:", JSON.parse(saved));
  }
});
