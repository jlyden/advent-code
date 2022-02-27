import { buildRowMatrix } from './solution-day-nine-part-one.mjs';
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
function getCurrentPointAndNeighbors(rowMatrix, currentCoords) {
  const withCoords = true;
  const points = [];
  [ 'current', 'previous', 'next', 'below', 'above'].forEach(pointLocale => {
    const point = getPoint(rowMatrix, currentCoords, pointLocale, withCoords)
    if (Object.keys(point).length > 0) {
      points.push(point);
    }
  });
  return points;
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

const POINT_COORD_CONVERTER_MAP = {
  'previous': { row: 0, col: -1 },
  'next': { row: 0, col: +1 },
  'above': { row: -1, col: 0 },
  'below': { row: +1, col: 0 },
}

// tested with getCurrentPointAndNeighbors
function getPoint(rowMatrix, currentCoords, whichPoint, withCoords) {
  // early exit
  if (whichPoint === 'current') {
    return formatPointObject(rowMatrix, currentCoords, whichPoint, withCoords);
  }

  const maxes = { row: rowMatrix.length, col: rowMatrix[0].length };
  const transformedCoords = transformCoords(currentCoords, POINT_COORD_CONVERTER_MAP[whichPoint]);
  if (validCoords(transformedCoords, maxes)) {
    return formatPointObject(rowMatrix, transformedCoords, whichPoint, withCoords);
  }
  return {};
}

// tested with getCurrentPointAndNeighbors
function formatPointObject(rowMatrix, pointCoords, whichPoint, withCoords) {
  let ret = {
    pointLocale: whichPoint,
    value: rowMatrix[pointCoords.row][pointCoords.col],
    coords: {},
  };
  if (withCoords) {
    ret.coords = {
      row: pointCoords.row,
      col: pointCoords.col,
    };
  }
  return ret;
}

// tested with getCurrentPointAndNeighbors
function transformCoords(currentCoords, transformation) {
  return { row: currentCoords.row + transformation.row, 
           col: currentCoords.col + transformation.col}
}

// tested with getCurrentPointAndNeighbors
function validCoords(coords, maxes) {
  return (coords.row > -1) 
    && (coords.col > -1) 
    && (coords.row < maxes.row) 
    && (coords.col < maxes.col);
}

export { getCurrentPointAndNeighbors, currentPointIsLowest };