import { multiplyArray, sortIntsDesc } from '../common/array-utils.mjs';
import { getCurrentPointAndNeighbors } from '../common/matrix-utils.mjs';
import { buildRowMatrix } from '../common/matrix-utils.mjs';
import { getContents } from '../common/file-utils.mjs';

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
  basinSizes.sort(sortIntsDesc);
  const largestThree = [basinSizes[0], basinSizes[1], basinSizes[2]];
  return multiplyArray(largestThree);
}

// TODO: this fails if rows have values not off the lowerPointRow
// Original strategy was getting the width of basin, then getting every col size for that width
// But values could flow off the original width from down one of the cols
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

export {
  calculateProductOfThreeLargestBasinSizes,
  getLimitOfBasinHorizontal,
  getLimitOfBasinVerticalForCol,
  getBasinSize,
};
