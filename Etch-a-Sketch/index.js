'use strict'

const mainGrid = document.querySelector('#main-grid');
const generateButton = document.querySelector('button#generate');
const pixelInput = document.querySelector('input#resolution');
const inputColor = document.querySelector('input#color');
const altResolution = document.querySelector('p#alt-resolution');

// Default color to black
let currentColor = '#000000';

pixelInput.addEventListener('input', () => {
  altResolution.innerHTML = pixelInput.value;
});

// When DOM is fully loaded
window.addEventListener('DOMContentLoaded', (event) => {
  getColor();
});

// Create a new grid if 'generate' is clicked
generateButton.addEventListener('click', () => {
  // Clear out all divs in the main grid
  mainGrid.innerHTML = '';

  // Get pixel resolution
  const resolution = parseInt(pixelInput.value);

  // Check if resolution does not exceed the 100x100 limit
  if (resolution > 100) {
    mainGrid.innerHTML = '<p>The maximum resolution is 100x100. Please enter a number equal to or lower than 100.</p>';
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
      event.target.style.backgroundColor = currentColor;
    });

    mainGrid.appendChild(gridDiv);
  }
}

inputColor.addEventListener('input', getColor);

function getColor() {
  currentColor = inputColor.value;
}