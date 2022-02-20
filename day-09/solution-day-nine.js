const arrayUtils = require('../common/array-utils.js');
const fileUtils = require('../common/file-utils.js');
const utils = require('../common/utils.js');

console.log(getSumOfLowPointRiskLevels()); // 462
runTests();

function getSumOfLowPointRiskLevels(returnLimit = null) {
  const rows = fileUtils.getContents('day-09/input.txt', returnLimit);
  const rowMatrix = buildRowMatrix(rows);
  const lowPoints = getLowPoints(rowMatrix);
  return calculateSumOfLowPointRiskLevels(lowPoints);
}

// tested
function buildRowMatrix(rows) {
  const rowMatrix = [];
  rows.forEach(row => {
    rowMatrix.push(utils.splitStringParseInts(row));
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
  return arrayUtils.sumArray(lowPoints) + lowPoints.length;
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

// tested
function currentPointIsLowest(points) {
  const allPointsNoNullsSorted = points.allPoints.sort();
  const lowestPoint = allPointsNoNullsSorted[0];
  const matchesCurrent = points.current === lowestPoint;
  const notMatchesNext = lowestPoint !== allPointsNoNullsSorted[1];
  return matchesCurrent && notMatchesNext;
}

/***** TESTS *****/
function runTests() {
  testBuildRowMatrix();
  testGetCurrentPointAndNeighbors();
  testCurrentPointIsLowest();
  testGetLowPoints();
  testCalculateSumOfLowPointRiskLevels();
}

function testBuildRowMatrix() {
  const testRows = [
    '2199943210\r',
    '3987894921\r',
    '9856789892\r',
    '8767896789\r',
    '9899965678'
  ];

  const expectedResult = [
    [2,1,9,9,9,4,3,2,1,0],
    [3,9,8,7,8,9,4,9,2,1],
    [9,8,5,6,7,8,9,8,9,2],
    [8,7,6,7,8,9,6,7,8,9],
    [9,8,9,9,9,6,5,6,7,8],
  ];

  let actualResult = buildRowMatrix(testRows);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `testBuildRowMatrix failed with ${JSON.stringify(testRows)}. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testBuildRowMatrix successfully')
}

function testGetCurrentPointAndNeighbors() {
  const testRowMatrix = [
    [2,1,9,9,9,4,3,2,1,0],
    [3,9,8,7,8,9,4,9,2,1],
    [9,8,5,6,7,8,9,8,9,2],
    [8,7,6,7,8,9,6,7,8,9],
    [9,8,9,9,9,6,5,6,7,8],
  ];
  let i = j = 1;
  let expectedResult = {    
    current: 9,
    allPoints: [9,3,8,8,1],
  };
  let actualResult = getCurrentPointAndNeighbors(testRowMatrix, i, j);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `testGetCurrentPointAndNeighbors failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  i = 3;
  j = 8;
  expectedResult = {    
    current: 8,
    allPoints: [8,7,9,7,9],
  };
  actualResult = getCurrentPointAndNeighbors(testRowMatrix, i, j);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `testGetCurrentPointAndNeighbors failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  i = 0;
  j = 1;
  expectedResult = {    
    current: 1,
    allPoints: [1,2,9,9],
  };
  actualResult = getCurrentPointAndNeighbors(testRowMatrix, i, j);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `testGetCurrentPointAndNeighbors failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  i = 0;
  j = 9;
  expectedResult = {    
    current: 0,
    allPoints: [0,1,1],
  };
  actualResult = getCurrentPointAndNeighbors(testRowMatrix, i, j);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `testGetCurrentPointAndNeighbors failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testGetCurrentPointAndNeighbors successfully')
}

function testCurrentPointIsLowest() {
  const testPointsFalse = {
    current: 9,
    allPoints: [9,3,8,8,1],
  };
  let actualResult = currentPointIsLowest(testPointsFalse);

  if (actualResult !== false) {
    throw `testCurrentPointIsLowest failed with input: ${JSON.stringify(testPointsFalse)}`;
  }

  const testPointsTrue = {
    current: 1,
    allPoints: [1,9,3,8,8],
  };
  actualResult = currentPointIsLowest(testPointsTrue);

  if (actualResult !== true) {
    throw `testCurrentPointIsLowest failed with input: ${JSON.stringify(testPointsTrue)}`;
  }

  const testPointsFalseBecauseMatchingValue = {
    current: 3,
    allPoints: [3,3,8,8,6],
  };
  actualResult = currentPointIsLowest(testPointsFalseBecauseMatchingValue);

  if (actualResult !== false) {
    throw `testCurrentPointIsLowest failed with input: ${JSON.stringify(testPointsFalseBecauseMatchingValue)}`;
  }

  const testPointsTrueWithZero = {
    current: 0,
    allPoints: [0,1,1],
  };
  actualResult = currentPointIsLowest(testPointsTrueWithZero);

  if (actualResult !== true) {
    throw `testCurrentPointIsLowest failed with input: ${JSON.stringify(testPointsTrueWithZero)}`;
  }

  console.log('Completed run of testCurrentPointIsLowest successfully')
}

function testGetLowPoints() {
  const testRowMatrix = [
    [2,1,9,9,9,4,3,2,1,0],
    [3,9,8,7,8,9,4,9,2,1],
    [9,8,5,6,7,8,9,8,9,2],
    [8,7,6,7,8,9,6,7,8,9],
    [9,8,9,9,9,6,5,6,7,8],
  ];
  let expectedResult = [ 1, 0, 5, 5 ];
  let actualResult = getLowPoints(testRowMatrix);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `testGetLowPoints failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testGetLowPoints successfully')
}

function testCalculateSumOfLowPointRiskLevels() {
  const testLowPoints = [ 1, 0, 5, 5 ];
  let expectedResult = 15;
  let actualResult = calculateSumOfLowPointRiskLevels(testLowPoints);

  if (expectedResult !== actualResult) {
    throw `testCalculateSumOfLowPointRiskLevels failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testCalculateSumOfLowPointRiskLevels successfully')
}