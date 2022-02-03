const fileUtils = require('../common/file-utils.js');
const utils = require('../common/utils.js');

const LINE_TYPES = {
  HORIZONTAL: 0,
  VERTICAL: 1,
  DIAGONAL: 2
}

//console.log(getCountOfPointsWithTwoPlusOverlappingVents());
//console.log(getCountOfPointsWithTwoPlusOverlappingVents(includeDiagonals = true)); // 24321 too high
runTests();

function getCountOfPointsWithTwoPlusOverlappingVents(includeDiagonals = false, returnLimit = null) {
  const ventLines = fileUtils.getContents('day-05/input.txt', returnLimit);
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
    coordinates = processVentLine(ventLine);
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
  let row = map[rowNumber] ? map[rowNumber] : {};

  const yValues = utils.range(coordinates.y1, coordinates.y2);
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

  const xValues = utils.range(coordinates.x1, coordinates.x2);
  xValues.forEach(xValue => {
    let row = map[xValue] ? map[xValue] : {};
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
  const xValues = utils.range(coordinates.x1, coordinates.x2);
  const yValues = utils.range(coordinates.y1, coordinates.y2);

  const xValsLen = xValues.length;
  if(xValsLen !== yValues.length) {
    throw `Error: mapDiagonalLine received non-45-degree-diagonal line: ${JSON.stringify(coordinates)}`;
  }

  for(let i=0; i<xValsLen; i++) {
    let row = map[xValues[i]] ? map[xValues[i]] : {};
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

/***** TESTS *****/
function runTests() {
  testProcessVentLine();
  testMapHorizontalLine();
  testMapVerticalLine();
  testMapDiagonalLine();
  testGetSaferPointCount();
}

function testProcessVentLine() {
  const testVentLineTwoDigits = '29,68 -> 29,713';
  let expectedResult = { x1: 29, y1: 68, x2: 29, y2: 713 };
  let actualResult = processVentLine(testVentLineTwoDigits);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw 'Failed on testVentLineTwoDigits';
  }

  const testVentLineThreeDigits = '427,523 -> 427,790';
  expectedResult = { x1: 427, y1: 523, x2: 427, y2: 790 };
  actualResult = processVentLine(testVentLineThreeDigits);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw 'Failed on testVentLineThreeDigits';
  }

  console.log('Completed run of testProcessVentLine successfully')
}

function testMapHorizontalLine() {
  const emptyMap = {};

  let horizontalCoordinates = { x1: 29, y1: 68, x2: 29, y2: 71 };
  let expectedResult = {
    '29': { 
      '68': 1,
      '69': 1,
      '70': 1,
      '71': 1,
    }
  };
  let actualResult = mapHorizontalLine(horizontalCoordinates, emptyMap);
  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed testMapHorizontalLine with empty map, actualResult: ${JSON.stringify(actualResult)}`;
  }

  const mapWithOverlappingValuesInSameRow = {
    '29': { 
      '68': 1,
      '69': 1,
      '70': 1,
      '71': 1,
    }
  };
  horizontalCoordinates = { x1: 29, y1: 70, x2: 29, y2: 73 };
  expectedResult = {
    '29': { 
      '68': 1,
      '69': 1,
      '70': 2,
      '71': 2,
      '72': 1,
      '73': 1,
    }
  };
  actualResult = mapHorizontalLine(horizontalCoordinates, mapWithOverlappingValuesInSameRow);
  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed testMapHorizontalLine with mapWithValuesInSameRow, actualResult: ${JSON.stringify(actualResult)}`;
  }

  const mapWithValuesInAnotherRow = {
    '45': { 
      '68': 1,
      '69': 1,
      '70': 1,
      '71': 1,
    }
  };
  horizontalCoordinates = { x1: 29, y1: 70, x2: 29, y2: 73 };
  expectedResult = {
    '29': { 
      '70': 1,
      '71': 1,
      '72': 1,
      '73': 1,
    },
    '45': { 
      '68': 1,
      '69': 1,
      '70': 1,
      '71': 1,
    }
  };

  actualResult = mapHorizontalLine(horizontalCoordinates, mapWithValuesInAnotherRow);
  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed testMapHorizontalLine with mapWithValuesInAnotherRow, actualResult: ${JSON.stringify(actualResult)}`;
  }

  horizontalCoordinates = { x1: 28, y1: 68, x2: 29, y2: 71 };
  const expectedError = 'Error: mapHorizontalLine received non-horizontal line: {"x1":28,"y1":68,"x2":29,"y2":71}';
  try {
    actualResult = mapHorizontalLine(horizontalCoordinates, emptyMap);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed testMapHorizontalLine with non-horizontal line - wrong error message`;
    }
  }

  console.log('Completed run of testMapHorizontalLine successfully')
}

function testMapVerticalLine() {
  const emptyMap = {};

  let verticalCoordinates = { x1: 29, y1: 56, x2: 31, y2: 56 };
  let expectedResult = {
    '29': { 
      '56': 1,
    },
    '30': { 
      '56': 1,
    },
    '31': { 
      '56': 1,
    },
  };
  let actualResult = mapVerticalLine(verticalCoordinates, emptyMap);
  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed testMapVerticalLine with empty map, actualResult: ${JSON.stringify(actualResult)}`;
  }

  const mapWithOverlappingValuesInSameCol = {
    '29': { 
      '56': 1,
    },
    '30': { 
      '56': 1,
    },
    '31': { 
      '56': 1,
    },
  };
  verticalCoordinates = { x1: 27, y1: 56, x2: 30, y2: 56 };
  expectedResult = {
    '27': { 
      '56': 1,
    },
    '28': { 
      '56': 1,
    },
    '29': { 
      '56': 2,
    },
    '30': { 
      '56': 2,
    },
    '31': { 
      '56': 1,
    },
  };
  actualResult = mapVerticalLine(verticalCoordinates, mapWithOverlappingValuesInSameCol);
  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed testMapVerticalLine with mapWithOverlappingValuesInSameCol, actualResult: ${JSON.stringify(actualResult)}`;
  }

  const mapWithValuesInAnotherCol = {
    '27': { 
      '56': 1,
    },
    '28': { 
      '56': 1,
    },
    '29': { 
      '56': 2,
    },
    '30': { 
      '56': 2,
    },
    '31': { 
      '56': 1,
    },
  };
  verticalCoordinates = { x1: 27, y1: 12, x2: 29, y2: 12 };
  expectedResult = {
    '27': { 
      '12': 1,
      '56': 1,
    },
    '28': { 
      '12': 1,
      '56': 1,
    },
    '29': { 
      '12': 1,
      '56': 2,
    },
    '30': { 
      '56': 2,
    },
    '31': { 
      '56': 1,
    },
  };

  actualResult = mapVerticalLine(verticalCoordinates, mapWithValuesInAnotherCol);
  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed testMapVerticalLine with mapWithValuesInAnotherCol, actualResult: ${JSON.stringify(actualResult)}`;
  }

  verticalCoordinates = { x1: 28, y1: 68, x2: 29, y2: 71 };
  const expectedError = 'Error: mapVerticalLine received non-vertical line: {"x1":28,"y1":68,"x2":29,"y2":71}';
  try {
    actualResult = mapVerticalLine(verticalCoordinates, emptyMap);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed mapVerticalLine with non-vertical line - wrong error message`;
    }
  }

  console.log('Completed run of testMapVerticalLine successfully')
}

function testMapDiagonalLine() {
  const emptyMap = {};

  let diagonalCoordinates = { x1: 329, y1: 556, x2: 331, y2: 558 };
  let expectedResult = {
    '329': { 
      '556': 1,
    },
    '330': { 
      '557': 1,
    },
    '331': { 
      '558': 1,
    },
  };
  let actualResult = mapDiagonalLine(diagonalCoordinates, emptyMap);
  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed mapDiagonalLine with empty map, actualResult: ${JSON.stringify(actualResult)}`;
  }

  const mapWithOverlappingValues = {
    '27': { 
      '556': 1,
    },
    '28': { 
      '556': 2,
    },
    '29': { 
      '556': 2,
    },
    '30': { 
      '556': 3,
    },
    '31': { 
      '556': 3,
    },
  };
  diagonalCoordinates = { x1: 27, y1: 560, x2: 31, y2: 556 };
  expectedResult = {
    '27': { 
      '556': 1,
      '560': 1,
    },
    '28': { 
      '556': 2,
      '559': 1,
    },
    '29': { 
      '556': 2,
      '558': 1,
    },
    '30': { 
      '556': 3,
      '557': 1,
    },
    '31': { 
      '556': 4,
    },
  };
  actualResult = mapDiagonalLine(diagonalCoordinates, mapWithOverlappingValues);
  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed mapDiagonalLine with mapWithOverlappingValues, actualResult: ${JSON.stringify(actualResult)}`;
  }

  diagonalCoordinates = { x1: 28, y1: 68, x2: 29, y2: 100 };
  const expectedError = 'Error: mapDiagonalLine received non-45-degree-diagonal line: {"x1":28,"y1":68,"x2":29,"y2":100}';
  try {
    actualResult = mapDiagonalLine(diagonalCoordinates, emptyMap);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed mapDiagonalLine with non-45-degree-diagonal line - wrong error message`;
    }
  }

  console.log('Completed run of testMapDiagonalLine successfully')
}

function testGetSaferPointCount() {
  const testVentMap = {
    '27': { 
      '12': 2,
      '56': 1,
    },
    '28': { 
      '12': 1,
      '56': 2,
    },
    '29': { 
      '12': 5,
      '56': 2,
    },
    '30': { 
      '56': 3,
    },
    '31': { 
      '56': 1,
      '999': 1,
    },
  };
  let expectedResult = 5;
  let actualResult = getSaferPointCount(testVentMap)
  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed testGetSaferPointCount with testVentMap, actualResult: $actualResult}`;
  }

  console.log('Completed run of testGetSaferPointCount successfully')
}