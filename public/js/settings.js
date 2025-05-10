document.addEventListener("DOMContentLoaded", () => {
  const themeSelect = document.getElementById("themeSelect");
  const particleToggle = document.getElementById("toggleParticles");
  const browserSelect = document.getElementById("browserSelect");

  // Load saved preferences
  themeSelect.value = localStorage.getItem("theme") || "space";
  particleToggle.checked = localStorage.getItem("particles") === "true";
  browserSelect.value = localStorage.getItem("browser") || "chrome";

  // Apply theme
  document.body.className = `theme-${themeSelect.value}`;

  themeSelect.addEventListener("change", () => {
    localStorage.setItem("theme", themeSelect.value);
    document.body.className = `theme-${themeSelect.value}`;
  });

  particleToggle.addEventListener("change", () => {
    localStorage.setItem("particles", particleToggle.checked);
    location.reload(); // Rerun particles or remove them
  });

  browserSelect.addEventListener("change", () => {
    localStorage.setItem("browser", browserSelect.value);
  });
});
