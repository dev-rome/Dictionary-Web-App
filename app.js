// Get references to elements
const body = document.body;
const fontText = document.querySelector(".dropdown-font");
const dropdownContent = document.querySelector(".dropdown-content");
const dropdownValue = document.querySelectorAll("a");
const btnArrow = document.querySelector(".btn-arrow");
const themeToggle = document.querySelector(".theme-toggle");
const toggleSwitch = document.querySelector(".toggle-switch");
const moonIcon = document.querySelector(".svg-moon");
const circle = document.querySelector(".circle");
const form = document.querySelector("form");
const inputText = document.querySelector("form input");
const word = document.querySelector(".word");
const phonetic = document.querySelector(".phonetic");
const playButton = document.querySelector("#play-button")

const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// fetch api data
const fetchData = async (inputValue) => {
  try {
    const res = await fetch(url + inputValue);
    const data = await res.json();
    word.textContent = data[0].word;
    phonetic.textContent = data[0].phonetic
  } catch (error) {
    throw new Error("Failed to fetch data.");
  }
};

// Function to toggle between light and dark mode
const toggleTheme = () => {
  if (body.classList.contains("dark-mode")) {
    // If dark mode is active, switch to light mode
    body.classList.remove("dark-mode");
  } else {
    // If light mode is active, switch to dark mode
    body.classList.add("dark-mode");
  }
};

// Function to update the theme toggle icon based on the current theme
const updateThemeIcon = () => {
  if (body.classList.contains("dark-mode")) {
    circle.style.transform = "translate(50%, -50%)";
    circle.style.left = "calc(100% - 24px)";
    toggleSwitch.style.backgroundColor = "#a445ed";
    moonIcon.style.stroke = "#a445ed";
  } else {
    circle.style.transform = "translate(-50%, -50%)";
    circle.style.left = "10px";
    toggleSwitch.style.backgroundColor = "#757575";
    moonIcon.style.stroke = "#757575";
  }
};

// Select dropdown value, change font based on value and hide dropdown box
dropdownValue.forEach((value) => {
  value.addEventListener("click", (e) => {
    e.preventDefault();

    const fontType = value.textContent;

    if (fontType === "Sans Serif") {
      fontText.textContent = "Sans Serif";
      body.style.fontFamily = "Inter, sans serif";
      inputText.style.fontFamily = "Inter, sans serif";
      dropdownContent.classList.add("hide");
    } else if (fontType === "Serif") {
      fontText.textContent = "Serif";
      inputText.style.fontFamily = "Lora, serif";
      body.style.fontFamily = "Lora, serif";
    } else if (fontType === "Mono") {
      fontText.textContent = "Mono";
      inputText.style.fontFamily = "Inconsolata, monospace";
      body.style.fontFamily = "Inconsolata, monospace";
    }

    dropdownContent.classList.add("hide");
  });
});

btnArrow.addEventListener("click", function () {
  dropdownContent.classList.toggle("hide");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchData(inputText.value);
  inputText.value = "";
});

// Add a click event listener to the theme toggle button
themeToggle.addEventListener("click", () => {
  toggleTheme();
  updateThemeIcon();
});

// playButton.addEventListener("click", function() {

// })

// Check the user's preferred theme and set it if available
const userPreferredTheme = localStorage.getItem("theme");
if (userPreferredTheme === "dark") {
  body.classList.add("dark-mode");
  updateThemeIcon();
}
