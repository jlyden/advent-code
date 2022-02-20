import { getContents } from '../common/file-utils.mjs';
import { range } from '../common/utils.mjs';

const LINE_TYPES = {
  HORIZONTAL: 0,
  VERTICAL: 1,
  DIAGONAL: 2
}

console.log(getCountOfPointsWithTwoPlusOverlappingVents()); // 7297
console.log(getCountOfPointsWithTwoPlusOverlappingVents(true)); // 21038

function getCountOfPointsWithTwoPlusOverlappingVents(includeDiagonals = false, returnLimit = null) {
  const ventLines = getContents('day-05/input.txt', returnLimit);
  const ventLineMap = buildMap(ventLines, includeDiagonals);
  return getSaferPointCount(ventLineMap);
}

function buildMap(ventLines, includeDiagonals) {
  /*
    Map will be built up like this, based on ventLines from input:
    {
      <rowNumber>: {
        <colNumber>: <countOfVentLinesCoveringPoint>,
        <colNumber>: <countOfVentLinesCoveringPoint>,
        ...
      },
      <rowNumber>: {
        <colNumber>: <countOfVentLinesCoveringPoint>,
        <colNumber>: <countOfVentLinesCoveringPoint>,
        ...
      },
      ...
    }
  */
  let map = {};

  ventLines.forEach(ventLine => {
    const coordinates = processVentLine(ventLine);
    map = mapCoordinates(coordinates, map, includeDiagonals);
  });
 return map;
}

// tested
function processVentLine(ventLine) {
  const coordinatesFlat = ventLine
                      .split(' ')
                      .filter(x => x != '->')
                      .join()
                      .split(',')
                      .map(num => parseInt(num));
  const coordinatesLabeled = {
    x1: coordinatesFlat[0],
    y1: coordinatesFlat[1],
    x2: coordinatesFlat[2],
    y2: coordinatesFlat[3],
  };
  return coordinatesLabeled
}

function mapCoordinates(coordinates, map, includeDiagonals) {
  const lineType = getLineType(coordinates);

  switch (lineType) {
    case LINE_TYPES.HORIZONTAL:
      map = mapHorizontalLine(coordinates, map);
      break;
  
    case LINE_TYPES.VERTICAL:
      map = mapVerticalLine(coordinates, map);
      break;

    case LINE_TYPES.DIAGONAL:
      if(includeDiagonals) {
        map = mapDiagonalLine(coordinates,map);
      }
      break;

    default:
      break;
  }
  return map;
}

function getLineType(coordinates) {
  if(coordinates.x1 === coordinates.x2) {
    return LINE_TYPES.HORIZONTAL;
  }
  
  if(coordinates.y1 === coordinates.y2) {
    return LINE_TYPES.VERTICAL;
  }

  return LINE_TYPES.DIAGONAL;
}

// tested
function mapHorizontalLine(coordinates, map) {
  if (coordinates.x1 !== coordinates.x2) {
    throw `Error: mapHorizontalLine received non-horizontal line: ${JSON.stringify(coordinates)}`;
  }

  let rowNumber = coordinates.x1;
  let row = map[rowNumber] || {};

  const yValues = range(coordinates.y1, coordinates.y2);
  yValues.forEach(yValue => {
    row[yValue] = incrementRowPoint(row, yValue);
  });

  return {
    ...map,
    [rowNumber]: row,
  };
}

// tested
function mapVerticalLine(coordinates, map) {
  if (coordinates.y1 !== coordinates.y2) {
    throw `Error: mapVerticalLine received non-vertical line: ${JSON.stringify(coordinates)}`;
  }

  let colNumber = coordinates.y1;

  const xValues = range(coordinates.x1, coordinates.x2);
  xValues.forEach(xValue => {
    let row = map[xValue] || {};
    row[colNumber] = incrementRowPoint(row, colNumber);
    map = {
      ...map,
      [xValue]: row,
    }
  });

  return map;
}

// Note: per instructions, diagonals are always 45-degrees
function mapDiagonalLine(coordinates,map) {
  const xValues = range(coordinates.x1, coordinates.x2);
  const yValues = range(coordinates.y1, coordinates.y2);

  const xValsLen = xValues.length;
  if(xValsLen !== yValues.length) {
    throw `Error: mapDiagonalLine received non-45-degree-diagonal line: ${JSON.stringify(coordinates)}`;
  }

  for(let i=0; i<xValsLen; i++) {
    let row = map[xValues[i]] || {};
    row[yValues[i]] = incrementRowPoint(row, yValues[i]);
    map = {
      ...map,
      [xValues[i]]: row,
    }
  }

  return map;
}

// tested by testMapHorizontalLine, testMapVerticalLine, testMapDiagonalLine
function incrementRowPoint(row, point) {
  return row[point] ? parseInt(row[point]) + 1 : parseInt(1);
}

// tested
function getSaferPointCount(ventLineMap) {
  let saferPointCount = 0;

  for (const row of Object.values(ventLineMap)) {
    for (const pointTally of Object.values(row)) {
      if(pointTally > 1) {
        saferPointCount++;
      }
    }
  }

  return saferPointCount;
}

export { processVentLine, mapHorizontalLine, mapVerticalLine, mapDiagonalLine, getSaferPointCount };
