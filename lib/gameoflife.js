/**
 * Calculates a new game of live generation from an old generation.
 * Cells are represented as an array of coordinates
 * (i.e. `[[x1, y1], [x2, y2], ...]`).
 * @param {array.<array>} aliveCells A list of cells alive in the old
 *     generation.
 * @returns {array.<array>} A list of cells alive in the new generation.
 */
export default function gameoflife(aliveCells) {
  const candidates = getCandidateCells(aliveCells);

  return candidates.filter(candidate => {
    return willBeAlive(
        isAlive(aliveCells, candidate),
        countAliveNeighbors(aliveCells, candidate));
  });
}


/**
 * The ruleset of the game.
 * Determines if a cell is alive in the new generation based on it's state and
 * number of living neighbours.
 * @param {boolean} isAlive Is the cell alive in the old generation?
 * @param {number} numAliveNeighbors Number of alive neighbors in
 *     the old generation.
 * @returns {boolean} Will the cell be alive in the new generation?
 */
function willBeAlive(isAlive, numAliveNeighbors) {
  if (isAlive) {
    if (numAliveNeighbors < 2) { return false; }
    if (numAliveNeighbors > 3) { return false; }

    return true;
  } else {
    if (numAliveNeighbors === 3) { return true; }

    return false;
  }
}


/**
 * Generates a list of candidates to check for the next generation (all cells
 * with an alive cell in their neighborhood).
 * @param {array.<array>} aliveCells The cells alive in the old generation.
 * @returns {array.<array>} Candidates for the new generation.
 */
function getCandidateCells(aliveCells) {
  const addToMap = (map, cell) => map.set(cell.join(':'), cell);

  const candidateMap = aliveCells.reduce((map, [cx, cy]) => {
    const surroundings = cellRange(cx - 1, cx + 1, cy - 1, cy + 1);

    return surroundings.reduce(addToMap, map);
  }, new Map());

  return Array.from(candidateMap.values());
}


/**
 * Check if the given list of alive cells contains the given cell.
 */
function isAlive(aliveCells, [x, y]) {
  return aliveCells.filter(([cx,cy]) => (cx === x) && (cy === y)).length > 0
}


/**
 * Returns a rectangular range of coordinates with the given boundaries.
 */
function cellRange(xStart, xEnd, yStart, yEnd) {
  const ret = [];
  for (let x = xStart; x <= xEnd; x++) {
    for (let y = yStart; y <= yEnd; y++) {
      ret.push([x, y]);
    }
  }

  return ret;
}

/**
 * Returns the number of alive neighbors.
 */
function countAliveNeighbors(aliveCells, [x, y]) {
  return getAliveNeighbors(...arguments).length;
}


/**
 * Returns only those cells from the given list of alive cells that are
 * neighbors of the given cell.
 */
function getAliveNeighbors(aliveCells, [x, y]) {
  return aliveCells.filter(([cx, cy]) => {
    const dx = Math.abs(cx - x),
      dy = Math.abs(cy - y),
      sqDist = dx * dx + dy * dy;

    return sqDist && (sqDist <= 2);
  });
}

