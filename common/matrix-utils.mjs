import { splitStringParseInts } from '../common/utils.mjs';

// tested
function buildRowMatrix(rows) {
  const rowMatrix = [];
  rows.forEach(row => {
    rowMatrix.push(splitStringParseInts(row));
  });
  return rowMatrix;
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

export { buildRowMatrix, getCurrentPointAndNeighbors };
