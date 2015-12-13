import {Launchpad, Color} from 'launchpadder';
import gameoflife from './lib/gameoflife';


let launchpad = new Launchpad(0, 0);


// ---- reset launchpad
launchpad.allDark();


// ---- start/pause button
const toggleButton = launchpad.getButton(0, 8);

toggleButton.startBlinking(Color.YELLOW);
toggleButton.on('press', button => {
  toggle();

  if (button.isBlinking()) {
    toggleButton.stopBlinking();
    toggleButton.light(Color.GREEN);
  } else {
    toggleButton.dark();
    toggleButton.startBlinking(Color.YELLOW);
  }
});


// ---- reset button
const resetButton = launchpad.getButton(1, 8);

resetButton.light(Color.RED);
resetButton.on('press', button => {
  stop();
  clearAll();

  toggleButton.dark();
  toggleButton.startBlinking(Color.YELLOW);
});


// ---- grid buttons
launchpad.on('press', button => {
  // ignore buttons outside the grid
  if (button.x === 8 || button.y === 8) {
    return;
  }

  // toggle otherwise
  if (button.getState() === false || !button.isLit()) {
    button.light(Color.GREEN);
  } else {
    button.dark();
  }
});


// ---- play-state handling
let running = false;

function stop() { running = false; }
function toggle() {
  running = !running;

  // kickoff the loop
  if (running) { loop(); }
}


// ---- animation-loop
let history = [];
function loop() {
  if (!running) {
    return;
  }

  let liveCells = getLiveCells();
  let nextGen = limitRange(gameoflife(liveCells));

  clearAll();

  renderCells(liveCells, Color.AMBER);
  renderCells(nextGen, Color.RED);

  setTimeout(loop, 300);
}


// ---- utility functions

function getLiveCells() {
  var liveCells = [];
  for (var y = 0; y < 8; y++) {
    for (var x = 0; x < 8; x++) {
      var btn = launchpad.getButton(x, y);
      if (btn.getState() === Color.GREEN || btn.getState() === Color.RED) {
        liveCells.push([x, y]);
      }
    }
  }

  return liveCells;
}


function limitRange(coords) {
  return coords.filter(([x,y]) => {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  });
}


function clearAll() {
  for (var y = 0; y < 8; y++) {
    for (var x = 0; x < 8; x++) {
      var btn = launchpad.getButton(x, y);
      btn.dark();
    }
  }
}


function renderCells(cells, color) {
  cells.forEach(([x,y]) => {
    launchpad.getButton(x, y).light(color);
  });
}
