import { buildRowMatrix } from '../common/matrix-utils.mjs';
import { getCurrentPointAndNeighbors } from '../common/matrix-utils.mjs';
import { calculateProductOfThreeLargestBasinSizes } from './solution-day-nine-part-two-orig.mjs';

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

  for(let row = 0; row < matrixHeight; row++) {
    for(let col = 0; col < matrixWidth; col++) {
      const currentCoords = { row: row, col: col };
      let points = getCurrentPointAndNeighbors(rowMatrix, currentCoords);
      if (currentPointIsLowest(points)) {
        // determine basin size around it
        let basinCoordsLog = [];
        basinSizes.push(getBasinSizeCrawler(rowMatrix, points, basinCoordsLog));
      }
    }
  }
  return basinSizes;
}

// initial points input is lowestPoint
function getBasinSizeCrawler(rowMatrix, points, basinCoordsLog) {
  // TODO!!!
  [ 'previous', 'next', 'above', 'below' ].forEach(key => {
    const value = points.allPoints[key].value;
    if (value < 9) {
      logBasinCoords(points.allPoints[key].coords, basinCoordsLog)
    }
  });

  // go through previous, up, right, down
  // first one that is not 9, recurse on that
}

function logBasinCoords(pointCoords, basinCoordsLog) {
  let coordsInt = parseInt(`${pointCoords.row}${pointCoords.col}`);
  if (basinCoordsLog.indexOf(coordsInt) === -1) {
    basinCoordsLog.push(coordsInt);
  }

  return basinCoordsLog.sort(sortIntsAsc);
}

// tested
function currentPointIsLowest(points) {
  const currentPoint = points.filter(point => point.pointLocale === 'current');
  points.sort(lowestObjValue);
  const lowestPoint = points[0];
  const matchesCurrent = currentPoint.value === lowestPoint.value;
  const notMatchesNext = lowestPoint.value !== points[1].value;
  return matchesCurrent && notMatchesNext;
}

// tested with currentPointIsLowest
function lowestObjValue(a, b) {
  return a.value - b.value;
}

export { currentPointIsLowest };