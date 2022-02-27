import { sumArray, multiplyArray, sortIntsDesc, sortIntsAsc } from '../common/array-utils.mjs';
import { getContents } from '../common/file-utils.mjs';
import { splitStringParseInts } from '../common/utils.mjs';

//console.log(getSumOfLowPointRiskLevels()); // 462

function getSumOfLowPointRiskLevels(returnLimit = null) {
  const rows = getContents('day-09/input.txt', returnLimit);
  const rowMatrix = buildRowMatrix(rows);
  const lowPoints = getLowPoints(rowMatrix);
  return calculateSumOfLowPointRiskLevels(lowPoints);
}

// tested
function buildRowMatrix(rows) {
  const rowMatrix = [];
  rows.forEach(row => {
    rowMatrix.push(splitStringParseInts(row));
  });
  return rowMatrix;
}

// tested
function getLowPoints(rowMatrix) {
  let lowPoints = [];
  const matrixHeight = rowMatrix.length;
  const matrixWidth = rowMatrix[0].length;

  for(let row=0; row<matrixHeight; row++) {
    for(let col=0; col<matrixWidth; col++) {
      let points = getCurrentPointAndNeighbors(rowMatrix, row, col);
      if (currentPointIsLowest(points)) {
        lowPoints.push(points.current);
      }
    }
  }
  return lowPoints;
}

function calculateSumOfLowPointRiskLevels(lowPoints) {
  return sumArray(lowPoints) + lowPoints.length;
}

// tested
function getCurrentPointAndNeighbors(rowMatrix, row, col) {
  const current = getCurrent(rowMatrix, row, col);
  return {
    current: current,
    currentCoords: { row: row, col: col },
    allPoints: [
      current,
      getPrevious(rowMatrix, row, col),
      getNext(rowMatrix, row, col),
      getBelow(rowMatrix, row, col),
      getAbove(rowMatrix, row, col),
    ].filter(element => element === 0 || !!element),
  }
}

// tested
function currentPointIsLowest(points) {
  const allPointsNoNullsSorted = points.allPoints.sort(sortIntsAsc);
  const lowestPoint = allPointsNoNullsSorted[0];
  const matchesCurrent = points.current === lowestPoint;
  const notMatchesNext = lowestPoint !== allPointsNoNullsSorted[1];
  return matchesCurrent && notMatchesNext;
}

function getCurrent(rowMatrix, row, col) {
  try {
    return rowMatrix[row][col];
  } catch (TypeError) {
    return null;
  }
}

function getPrevious(rowMatrix, row, col) {
  try {
    return rowMatrix[row][col-1];
  } catch (TypeError) {
    return null;
  }
}

function getNext(rowMatrix, row, col) {
  try {
    return rowMatrix[row][col+1];
  } catch (TypeError) {
    return null;
  }
}

function getBelow(rowMatrix, row, col) {
  try {
    return rowMatrix[row+1][col];
  } catch (TypeError) {
    return null;
  }
}

function getAbove(rowMatrix, row, col) {
  try {
    return rowMatrix[row-1][col];
  } catch (TypeError) {
    return null;
  }
}

export {
  buildRowMatrix,
  getCurrentPointAndNeighbors,
  currentPointIsLowest,
  getLowPoints,
  calculateSumOfLowPointRiskLevels,
};
