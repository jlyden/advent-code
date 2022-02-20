import { sumArray } from '../common/array-utils.mjs';
import { getContents } from '../common/file-utils.mjs';
import { splitStringParseInts } from '../common/utils.mjs';

console.log(getSumOfLowPointRiskLevels()); // 462

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

  for(let i=0; i<matrixHeight; i++) {
    for(let j=0; j<matrixWidth; j++) {
      let points = getCurrentPointAndNeighbors(rowMatrix, i, j);
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
function getCurrentPointAndNeighbors(rowMatrix, i, j) {
  const current = getCurrent(rowMatrix, i, j);
  return {
    current: current,
    allPoints: [
      current,
      getPrevious(rowMatrix, i, j),
      getNext(rowMatrix, i, j),
      getBelow(rowMatrix, i, j),
      getAbove(rowMatrix, i, j),
    ].filter(element => element === 0 || !!element),
  }
}

// tested
function currentPointIsLowest(points) {
  const allPointsNoNullsSorted = points.allPoints.sort();
  const lowestPoint = allPointsNoNullsSorted[0];
  const matchesCurrent = points.current === lowestPoint;
  const notMatchesNext = lowestPoint !== allPointsNoNullsSorted[1];
  return matchesCurrent && notMatchesNext;
}

function getCurrent(rowMatrix, i, j) {
  try {
    return rowMatrix[i][j];
  } catch (TypeError) {
    return null;
  }
}

function getPrevious(rowMatrix, i, j) {
  try {
    return rowMatrix[i][j-1];
  } catch (TypeError) {
    return null;
  }
}

function getNext(rowMatrix, i, j) {
  try {
    return rowMatrix[i][j+1];
  } catch (TypeError) {
    return null;
  }
}

function getBelow(rowMatrix, i, j) {
  try {
    return rowMatrix[i+1][j];
  } catch (TypeError) {
    return null;
  }
}

function getAbove(rowMatrix, i, j) {
  try {
    return rowMatrix[i-1][j];
  } catch (TypeError) {
    return null;
  }
}

export { buildRowMatrix, getCurrentPointAndNeighbors, currentPointIsLowest, getLowPoints, calculateSumOfLowPointRiskLevels };
