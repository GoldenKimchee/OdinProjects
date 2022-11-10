'use strict'

const mainGrid = document.querySelector('#main-grid');
const generateButton = document.querySelector('button#generate');
const pixelInput = document.querySelector('input#resolution');
const inputColor = document.querySelector('input#color');
const altResolution = document.querySelector('p#alt-resolution');
const soundobj = document.getElementById("hover-sound");

// Default color to black
let currentColor = '#000000';

pixelInput.addEventListener('input', updatePixelNumber);

function updatePixelNumber() {
  if (checkPixelValid()) {
    altResolution.style.color = "black";
  } else {
    altResolution.style.color = "red";
  }

  altResolution.innerHTML = pixelInput.value;
}

// When DOM is fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
  getColor();
  updatePixelNumber();
});

// Create a new grid if 'generate' is clicked
generateButton.addEventListener('click', () => {
  // Clear out all divs in the main grid
  mainGrid.innerHTML = '';

  // Get pixel resolution
  const resolution = parseInt(pixelInput.value);

  // Check if resolution does not exceed the 100x100 limit
  if (!checkPixelValid()) {
    mainGrid.innerHTML = '<p>The resolution has to be a whole number, and not exceed the 100 pixel limit.</p>';
    document.documentElement.style.setProperty('--grid-resolution', 1);
    return;
  }

  generateGridDivs(resolution);

  // Change the CSS variables that set the grid's rows and columns
  document.documentElement.style.setProperty('--grid-resolution', resolution);
});

// Populate the drawing grid with divs (pixels)
function generateGridDivs(length) {
  const pixels = length * length;
  for (let i = 0; i < pixels; i++) {
    let gridDiv = document.createElement('div');

    // Allow grid divs to change color when the mouse is on it
    gridDiv.addEventListener('mouseover', (event) => {
      soundobj.play();
      event.target.style.backgroundColor = currentColor;
    });
    gridDiv.addEventListener('mouseleave', (event) => {
      soundobj.pause();
      soundobj.currentTime = 0;
    });

    mainGrid.appendChild(gridDiv);
  }
}

inputColor.addEventListener('input', getColor);

function getColor() {
  currentColor = inputColor.value;
}

function checkPixelValid() {
  const pixelNumber = pixelInput.value;
  const containsOthers = /^[0-9]+$/.test(pixelNumber);
  const intPixelNumber = parseInt(pixelNumber);
  
  // Is not a number  OR  contains other chars  OR  exceeds 100 resolution limit
  if (isNaN(intPixelNumber) || !containsOthers || pixelNumber > 100) {
    return false;
  } else {
    return true;
  }
}