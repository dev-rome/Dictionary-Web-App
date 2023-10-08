// Get references to elements
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const circle = document.querySelector(".circle");

// Function to toggle between light and dark mode
function toggleTheme() {
  if (body.classList.contains("dark-mode")) {
    // If dark mode is active, switch to light mode
    body.classList.remove("dark-mode");
  } else {
    // If light mode is active, switch to dark mode
    body.classList.add("dark-mode");
  }
}

// Function to update the theme toggle icon based on the current theme
function updateThemeIcon() {
  if (body.classList.contains("dark-mode")) {
    circle.style.transform = "translate(50%, -50%)";
    circle.style.left = "calc(100% - 24px)"
  } else {
    circle.style.transform = "translate(-50%, -50%)";
    circle.style.left = "10px"

  }
}

// Add a click event listener to the theme toggle button
themeToggle.addEventListener("click", () => {
  toggleTheme();
  updateThemeIcon();
});

// Check the user's preferred theme and set it if available
const userPreferredTheme = localStorage.getItem("theme");
if (userPreferredTheme === "dark") {
  body.classList.add("dark-mode");
  updateThemeIcon();
}