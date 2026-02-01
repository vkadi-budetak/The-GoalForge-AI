const themeBtn = document.getElementById("theme-btn");

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isDark =
      document.documentElement.getAttribute("data-theme") === "dark";

    if (isDark) {
      document.documentElement.setAttribute("data-theme", "light");
      themeBtn.textContent = "🌙";
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      themeBtn.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    }
  });
} else {
  console.error("Error: Button with id=‘theme-btn’ not found in HTML!");
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  if (themeBtn) themeBtn.textContent = "☀️";
}
