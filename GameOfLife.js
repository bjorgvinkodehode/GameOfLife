// Get the canvas context for drawing
const conway = document.getElementById("conway").getContext("2d");

// Adjust canvas size to match the window size
document.getElementById("conway").width = window.innerWidth;
document.getElementById("conway").height = window.innerHeight;

// Set the dimensions and cell size
const width = document.getElementById("conway").width;
const height = document.getElementById("conway").height;
const size = 4;

// Function to draw a rectangle on the canvas
function draw(x, y, c, s) {
  conway.fillStyle = c;  // Set color
  conway.fillRect(x, y, s, s);  // Draw rectangle
}

// Generate a random color
function randomColor() {
  let r = Math.floor(Math.random() * 111);
  let g = Math.floor(Math.random() * 234);
  let b = Math.floor(Math.random() * 23);
  return `rgb(${r},${g},${b})`;
}

// Grids to store cell states
let grid = [];
let tmpgrid = [];

// Function to safely get the value of a cell, returns 0 if out-of-bounds
function cellValue(x, y) {
  try {
    return grid[x][y];
  } catch {
    return 0;
  }
}

// Function to count live neighbors of a cell
function countNeighbours(x, y) {
  let count = 0;
  if (cellValue(x - 1, y)) count++;
  if (cellValue(x + 1, y)) count++;
  if (cellValue(x, y - 1)) count++;
  if (cellValue(x, y + 1)) count++;
  if (cellValue(x - 1, y - 1)) count++;
  if (cellValue(x + 1, y - 1)) count++;
  if (cellValue(x - 1, y + 1)) count++;
  if (cellValue(x + 1, y + 1)) count++;
  return count;
}

// Function to update the state of a cell based on Conway's Game of Life rules
function updateCell(x, y) {
  let neighbours = countNeighbours(x, y);
  if (neighbours > 4 || neighbours < 3) return 0;
  if (grid[x][y] === 0 && neighbours === 3) return 1;
  return grid[x][y];
}

// Function to update the entire grid and redraw it
function update() {
  conway.clearRect(0, 0, width, height);
  draw(0, 0, "black", width); // Draw black background

  for (let x = 0; x < width / size; x++) {
    for (let y = 0; y < height / size; y++) {
      tmpgrid[x][y] = updateCell(x, y);
    }
  }

  // Swap grids
  grid = tmpgrid;

  let cnt = 0;
  for (let x = 0; x < width / size; x++) {
    for (let y = 0; y < height / size; y++) {
      if (grid[x][y]) {
        draw(x * size, y * size, randomColor(), size);  // Draw live cells with random color
        cnt += 1;
      }
    }
  }

  // Reset if too few live cells
  if (((width / size) * (height / size)) / cnt > 99) init();

  setTimeout(() => {
    requestAnimationFrame(update);
  }, 2);
}

// Function to initialize a grid with zeros
function initArray(w, h) {
  let arr = [];
  for (let x = 0; x < w; x++) {
    arr[x] = [];
    for (let y = 0; y < h; y++) {
      arr[x][y] = 0;
    }
  }
  return arr;
}

// Initialization function to setup the grid and start the game
function init() {
  grid = initArray(width / size, height / size);
  tmpgrid = initArray(width / size, height / size);

  // Randomly seed the initial grid
  for (let x = 0; x < width / size; x++) {
    for (let y = 0; y < height / size; y++) {
      if (Math.random() > 0.5) grid[x][y] = 1;
    }
  }

  // Start the update loop
  update();
}

// Call the initialization function to start the game
init();

