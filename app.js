"use strict";

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
const definitionHide = document.querySelector(".definition-wrapper");
const inputText = document.querySelector("form input");
const word = document.querySelector(".word");
const phonetic = document.querySelector(".phonetic");
const playButton = document.querySelector("#play-button");
const nounListItems = document.querySelectorAll(".meaning-item-noun");
const verbListItem = document.querySelector(".meaning-item-verb");
const synonymsListItem = document.querySelector(".meaning-synonyms-item");
const listExample = document.querySelector(".meaning-list-example");
const sourceLink = document.querySelector(".source-link a");
const noResults = document.querySelector(".no-results");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let audioUrl = null;
let sourceWindow = null;

// fetch api data
const fetchData = async (inputValue = "Keyboard") => {
  try {
    const res = await fetch(url + inputValue);
    const data = await res.json();

    if (data && data[0]) {
      noResults.classList.add("hide");
      definitionHide.classList.remove("hide");
      const firstResult = data[0];

      word.textContent = firstResult.word || "No data available";
      phonetic.textContent = firstResult.phonetic || "No data available";

      audioUrl =
        firstResult.phonetics.find((audio) => audio.audio)?.audio ||
        "No data available";

      const meaningsNoun = firstResult.meanings[0].definitions.slice(0, 3);
      nounListItems.forEach((item, index) => {
        item.textContent = meaningsNoun[index]
          ? meaningsNoun[index].definition
          : "No data available";
      });

      const meaningVerb = firstResult.meanings[0].definitions.slice(0, 1);
      verbListItem.textContent = meaningVerb[0]
        ? meaningVerb[0].definition
        : "No data available";

      const wordSynonyms = firstResult.meanings[0].synonyms.slice(0, 3);
      synonymsListItem.textContent =
        wordSynonyms.length > 0 ? wordSynonyms.join(" ") : "No data available";

      const firstExample = firstResult.meanings[0].definitions.find(
        (definition) => definition.example
      );
      listExample.textContent = firstExample
        ? firstExample.example
        : "No data available";

      const source = firstResult.sourceUrls[0];
      sourceLink.href = source || "#";
      sourceLink.textContent = source ? source : "No data available";

      sourceLink.addEventListener("click", function (e) {
        e.preventDefault();
        if (source) {
          if (sourceWindow && !sourceWindow.closed) {
            sourceWindow.location.href = source;
          } else {
            sourceWindow = window.open(source, "_blank");
          }
        }
      });
    } else {
      noResults.classList.remove("hide");
      definitionHide.classList.add("hide");
    }
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

// toggle dropdown menu button
btnArrow.addEventListener("click", function () {
  dropdownContent.classList.toggle("hide");
});

// handle form submit
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

// play audio for definition word
playButton.addEventListener("click", function () {
  if (audioUrl) {
    // Create an Audio object
    const audio = new Audio(audioUrl);
    // Play the audio
    audio.play();
  }
});

// Check the user's preferred theme and set it if available
const userPreferredTheme = localStorage.getItem("theme");
if (userPreferredTheme === "dark") {
  body.classList.add("dark-mode");
  updateThemeIcon();
}

fetchData();