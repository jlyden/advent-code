import { sumArray, multiplyArray } from '../common/array-utils.mjs';
import { getContents } from '../common/file-utils.mjs';
import { splitStringParseInts } from '../common/utils.mjs';

console.log(getSumOfLowPointRiskLevels()); // 462

function getSumOfLowPointRiskLevels(returnLimit = null) {
  const rows = getContents('day-09/input.txt', returnLimit);
  const rowMatrix = buildRowMatrix(rows);
  const lowPoints = getLowPoints(rowMatrix);
  return calculateSumOfLowPointRiskLevels(lowPoints);
}

function getProductOfThreeLargestBasinSizes(returnLimit = null) {
  const rows = getContents('day-09/input.txt', returnLimit);
  const rowMatrix = buildRowMatrix(rows);
  const basinSizes = getBasinSizes(rowMatrix);
  return calculateProductOfThreeLargestBasinSizes(basinSizes);
}

function getBasinSizes(rowMatrix) {
  let basinSizes = [];
  const matrixHeight = rowMatrix.length;
  const matrixWidth = rowMatrix[0].length;

  for(let row=0; row<matrixHeight; row++) {
    for(let col=0; col<matrixWidth; col++) {
      let points = getCurrentPointAndNeighbors(rowMatrix, row, col);
      if (currentPointIsLowest(points)) {
        // determine basin size around it
        basinSizes.push(getBasinSize(rowMatrix, points.currentCoords, matrixHeight, matrixWidth));
      }
    }
  }
  return basinSizes;
}

// tested
function calculateProductOfThreeLargestBasinSizes(basinSizes) {
  const basinSizesLen = basinSizes.length;
  if (basinSizesLen < 3) {
    throw 'Not enough basins to perform calculation';
  }

  if (basinSizesLen === 3) {
    return multiplyArray(basinSizes);
  }

  // sort descending
  basinSizes.sort((a,b) => b-a);
  const largestThree = [basinSizes[0], basinSizes[1], basinSizes[2]];
  return multiplyArray(largestThree);
}

// TODO: test
// NOTE: this fails if rows have values not off the lowerPointRow
function getBasinSize(rowMatrix, lowestPoint, matrixHeight, matrixWidth) {
  let basinSize = 0;
  const [ lowestPointRow, lowestPointCol ] = lowestPoint;
  const [lowerLimitRow, upperLimitRow] = getLimitOfBasinHorizontal(rowMatrix[lowestPointRow], lowestPointCol, matrixWidth)
  for (let col = lowerLimitRow; col <= upperLimitRow; col++) {
    const [lowerLimitCol, upperLimitCol] = getLimitOfBasinVerticalForCol(rowMatrix, lowestPointRow, col, matrixHeight)
    const thisBasinSize = upperLimitCol-lowerLimitCol+1;
    basinSize += thisBasinSize;
  }

  return basinSize;
}

  // initial point input is lowestPoint
  function getBasinSizeCrawler(rowMatrix, point, basinValues) {

}

function logBasinValue(point, basinValues) {
  let coordsInt = parseInt(`${point.row}${point.col}`);
  if (basinValues.indexOf(coordsInt) === -1) {
    basinValues.push(coordsInt);
  }

  return basinValues.sort((a,b) => a-b);
}

// tested
function getLimitOfBasinHorizontal(row, lowestPointCol, rowWidth) {
  let lowerLimit, upperLimit;
  // walk back the row, starting at lowestPoint, until 9 -> record col previous
  for (let col = lowestPointCol; col > -1; col--) {
    if (row[col] === 9) {
      lowerLimit = col+1;
      break;
    }
    lowerLimit = 0;
  }

  // walk forward the row, starting at lowestPoint, until 9 -> record col previous
  for (let col = lowestPointCol; col < rowWidth; col++) {
    if (row[col] === 9) {
      upperLimit = col-1;
      break;
    }
    upperLimit = rowWidth - 1;
  }

  return [ lowerLimit, upperLimit ];
};

// tested
function getLimitOfBasinVerticalForCol(rowMatrix, lowestPointRow, col, colHeight) {
  let lowerLimit, upperLimit;
  // walk up the col, starting at lowestPoint, until 9 -> record row previous
  for (let row = lowestPointRow; row > -1; row--) {
    if (rowMatrix[row][col] === 9) {
      lowerLimit = row + 1;
      break;
    }
    lowerLimit = 0;
  }

  // walk down the col, starting at lowestPoint, until 9 -> record row previous
  for (let row = lowestPointRow; row < colHeight; row++) {
    if (rowMatrix[row][col] === 9) {
      upperLimit = row - 1;
      break;
    }
    upperLimit = colHeight - 1;
  }

  return [ lowerLimit, upperLimit ];
};

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
  const allPointsNoNullsSorted = points.allPoints.sort();
  const lowestPoint = allPointsNoNullsSorted[0];
  const matchesCurrent = points.current === lowestPoint;
  const notMatchesNext = lowestPoint !== allPointsNoNullsSorted[1];
  return matchesCurrent && notMatchesNext;
}

function newGetCurrentPointAndNeighbors(rowMatrix, row, col) {
  const currentCoords = { row: row, col: col };
  const withCoords = false;
  const current = getPoint(rowMatrix, currentCoords, 'current', withCoords);
  return {
    current: current,
    allPoints: {
      current,
      previous: getPoint(rowMatrix, currentCoords, 'previous', withCoords),
      next: getPoint(rowMatrix, currentCoords, 'next', withCoords),
      below: getPoint(rowMatrix, currentCoords, 'below', withCoords),
      above: getPoint(rowMatrix, currentCoords, 'above', withCoords),
    }
  }
}

function newCurrentPointIsLowest(points) {
  const allPointsNoNullsSorted = points.allPoints.sort(lowestObjValue).filter(element.value !== null);
  const lowestPoint = allPointsNoNullsSorted[0];
  const matchesCurrent = points.current.value === lowestPoint.value;
  const notMatchesNext = lowestPoint.value !== allPointsNoNullsSorted[1].value;
  return matchesCurrent && notMatchesNext;
}

function lowestObjValue(a, b) {
  return a.value - b.value;
}

const POINT_COORD_CONVERTER_MAP = {
  'previous': { row: 0, col: -1 },
  'next': { row: 0, col: +1 },
  'above': { row: -1, col: 0 },
  'below': { row: +1, col: 0 },
}

function getPoint(rowMatrix, currentCoords, whichPoint, withCoords) {
  // early exit
  if (whichPoint === 'current') {
    return formatPointObject(rowMatrix, currentCoords, withCoords);
  }

  const maxes = { row: rowMatrix.length, col: rowMatrix[0].length };
  const transformedCoords = transformCoords(currentCoords, POINT_COORD_CONVERTER_MAP[whichPoint]);
  if (validCoords(transformCoords, maxes)) {
    return formatPointObject(rowMatrix, transformCoords, withCoords);
  }
  return null;
}

function formatPointObject(rowMatrix, coords, withCoords) {
  let ret = {
    value: rowMatrix[coords.row][coords.col]
  };
  if (withCoords) {
    ret[coords] = {
      row: coords.row,
      col: coords.col,
    };
  }
  return ret;
}

function transformCoords(currentCoords, transformation) {
  return { row: currentCoords.row + transformation.row, 
           col: currentCoords.col + transformation.col}
}

function validCoords(coords, maxes) {
  return (coords.row > -1) 
    && (coords.col > -1) 
    && (coords.row < maxes.row) 
    && (coords.col < maxes.col);
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
  calculateProductOfThreeLargestBasinSizes,
  getLimitOfBasinHorizontal,
  getLimitOfBasinVerticalForCol,
  getBasinSize,
};
