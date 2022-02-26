import { objectsEqual } from '../common/utils.mjs';
import {
  buildRowMatrix,
  getCurrentPointAndNeighbors,
  currentPointIsLowest,
  getLowPoints,
  calculateSumOfLowPointRiskLevels,
  calculateProductOfThreeLargestBasinSizes,
  getLimitOfBasinHorizontal,
  getBasinSize,
  getLimitOfBasinVerticalForCol,
} from './solution-day-nine.mjs';

runTests();

function runTests() {
  testBuildRowMatrix();
  testGetCurrentPointAndNeighbors();
  testCurrentPointIsLowest();
  testGetLowPoints();
  testCalculateSumOfLowPointRiskLevels();
  testCalculateProductOfThreeLargestBasinSizes();
  testGetLimitOfBasinHorizontal();
  testGetLimitOfBasinVerticalForCol();
//  testGetBasinSize();
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

  if (!objectsEqual(expectedResult, actualResult)) {
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
  let row = 1;
  let col = 1;
  let expectedResult = {
    current: 9,
    currentCoords: { row: 1, col: 1 },
    allPoints: [9,3,8,8,1],
  };
  let actualResult = getCurrentPointAndNeighbors(testRowMatrix, row, col);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetCurrentPointAndNeighbors failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  row = 3;
  col = 8;
  expectedResult = {
    current: 8,
    currentCoords: { row: 3, col: 8 },
    allPoints: [8,7,9,7,9],
  };
  actualResult = getCurrentPointAndNeighbors(testRowMatrix, row, col);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetCurrentPointAndNeighbors failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  row = 0;
  col = 1;
  expectedResult = {
    current: 1,
    currentCoords: { row: 0, col: 1 },
    allPoints: [1,2,9,9],
  };
  actualResult = getCurrentPointAndNeighbors(testRowMatrix, row, col);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetCurrentPointAndNeighbors failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  row = 0;
  col = 9;
  expectedResult = {
    current: 0,
    currentCoords: { row: 0, col: 9 },
    allPoints: [0,1,1],
  };
  actualResult = getCurrentPointAndNeighbors(testRowMatrix, row, col);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetCurrentPointAndNeighbors failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testGetCurrentPointAndNeighbors successfully')
}

function testCurrentPointIsLowest() {
  const testPointsFalse = {
    current: 9,
    currentCoords: { row: 1, col: 1 },
    allPoints: [9,3,8,8,1],
  };
  let actualResult = currentPointIsLowest(testPointsFalse);

  if (actualResult !== false) {
    throw `testCurrentPointIsLowest failed with input: ${JSON.stringify(testPointsFalse)}`;
  }

  const testPointsTrue = {
    current: 1,
    currentCoords: { row: 1, col: 1 },
    allPoints: [1,9,3,8,8],
  };
  actualResult = currentPointIsLowest(testPointsTrue);

  if (actualResult !== true) {
    throw `testCurrentPointIsLowest failed with input: ${JSON.stringify(testPointsTrue)}`;
  }

  const testPointsFalseBecauseMatchingValue = {
    current: 3,
    currentCoords: { row: 1, col: 1 },
    allPoints: [3,3,8,8,6],
  };
  actualResult = currentPointIsLowest(testPointsFalseBecauseMatchingValue);

  if (actualResult !== false) {
    throw `testCurrentPointIsLowest failed with input: ${JSON.stringify(testPointsFalseBecauseMatchingValue)}`;
  }

  const testPointsTrueWithZero = {
    current: 0,
    currentCoords: { row: 1, col: 1 },
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

  if (!objectsEqual(expectedResult, actualResult)) {
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

function testCalculateProductOfThreeLargestBasinSizes() {
  // test case: too few entries
  let basinSizes = [ 5, 3 ];
  let expectedError = 'Not enough basins to perform calculation';
  try {
    actualResult = calculateProductOfThreeLargestBasinSizes(basinSizes);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed testCalculateProductOfThreeLargestBasinSizes with too few entries - wrong error message`;
    }
  }

  // test case: exactly three entries
  basinSizes = [ 5, 3, 10 ];
  let expectedResult = 150;
  let actualResult = calculateProductOfThreeLargestBasinSizes(basinSizes);

  if (expectedResult !== actualResult) {
    throw `testCalculateProductOfThreeLargestBasinSizes failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  // test case: 5 entries
  basinSizes = [ 5, 1, 3, 10, 8 ];
  expectedResult = 400;
  actualResult = calculateProductOfThreeLargestBasinSizes(basinSizes);

  if (expectedResult !== actualResult) {
    throw `testCalculateProductOfThreeLargestBasinSizes failed with more than 3 entries. actualResult: ${JSON.stringify(actualResult)}`;
  }

  // test case: non-int entries - should get picked up by multiplyArray
  basinSizes = [ 6, 4, "foo" ];
  expectedError = 'Invalid param: [6,4,"foo"]';
  try {
    actualResult = calculateProductOfThreeLargestBasinSizes(basinSizes);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed testCalculateProductOfThreeLargestBasinSizes with non-int entries - wrong error message`;
    }
  }

  console.log('Completed run of testCalculateProductOfThreeLargestBasinSizes successfully');
}

function testGetLimitOfBasinHorizontal() {
  const rowWidth = 10;
  const rowOne = [2,1,9,9,9,4,3,2,1,0];
  const lowestPointColOne = 1;
  let expectedResult = [0, 1];
  let actualResult = getLimitOfBasinHorizontal(rowOne, lowestPointColOne, rowWidth);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetLimitOfBasinHorizontal failed with lowestPointColOne. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const lowestPointColNine = 9;
  expectedResult = [5, 9];
  actualResult = getLimitOfBasinHorizontal(rowOne, lowestPointColNine, rowWidth);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetLimitOfBasinHorizontal failed with lowestPointColNine. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const rowThree = [9,8,5,6,7,8,9,8,9,2];
  const lowestPointColTwo = 2;
  expectedResult = [1, 5];
  actualResult = getLimitOfBasinHorizontal(rowThree, lowestPointColTwo, rowWidth);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetLimitOfBasinHorizontal failed with lowestPointColThree. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const rowFive = [9,8,9,9,9,6,5,6,7,8];
  const lowestPointColSix = 6;
  expectedResult = [5, 9];
  actualResult = getLimitOfBasinHorizontal(rowFive, lowestPointColSix, rowWidth);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetLimitOfBasinHorizontal failed with lowestPointColSix. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testGetLimitOfBasinHorizontal successfully');
}

function testGetLimitOfBasinVerticalForCol() {
  const matrixHeight = 5;
  const testRowMatrix = [
    [2,1,9,9,9,4,3,2,1,0],
    [3,9,8,7,8,9,4,9,2,1],
    [9,8,5,6,7,8,9,8,9,2],
    [8,7,6,7,8,9,6,7,8,9],
    [9,8,9,9,9,6,5,6,7,8],
  ];

  let lowestPointRow = 0;
  let col = 0;
  let expectedResult = [ 0, 1 ];
  let actualResult = getLimitOfBasinVerticalForCol(testRowMatrix, lowestPointRow, col, matrixHeight);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetLimitOfBasinVerticalForCol failed with col 0. actualResult: ${JSON.stringify(actualResult)}`;
  }

  col = 1;
  expectedResult = [ 0, 0 ];
  actualResult = getLimitOfBasinVerticalForCol(testRowMatrix, lowestPointRow, col, matrixHeight);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetLimitOfBasinVerticalForCol failed with col 0. actualResult: ${JSON.stringify(actualResult)}`;
  }

  // another basin
  col = 9;
  expectedResult = [ 0, 2 ];
  actualResult = getLimitOfBasinVerticalForCol(testRowMatrix, lowestPointRow, col, matrixHeight);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetLimitOfBasinVerticalForCol failed with col 0. actualResult: ${JSON.stringify(actualResult)}`;
  }

  col = 8;
  expectedResult = [ 0, 1 ];
  actualResult = getLimitOfBasinVerticalForCol(testRowMatrix, lowestPointRow, col, matrixHeight);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetLimitOfBasinVerticalForCol failed with col 0. actualResult: ${JSON.stringify(actualResult)}`;
  }

  col = 7;
  expectedResult = [ 0, 0 ];
  actualResult = getLimitOfBasinVerticalForCol(testRowMatrix, lowestPointRow, col, matrixHeight);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetLimitOfBasinVerticalForCol failed with col 0. actualResult: ${JSON.stringify(actualResult)}`;
  }

  // another basin
  lowestPointRow = 4;
  col = 5;
  expectedResult = [ 4, 4 ];
  actualResult = getLimitOfBasinVerticalForCol(testRowMatrix, lowestPointRow, col, matrixHeight);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetLimitOfBasinVerticalForCol failed with col 0. actualResult: ${JSON.stringify(actualResult)}`;
  }

  col = 6;
  expectedResult = [ 3, 4 ];
  actualResult = getLimitOfBasinVerticalForCol(testRowMatrix, lowestPointRow, col, matrixHeight);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetLimitOfBasinVerticalForCol failed with col 0. actualResult: ${JSON.stringify(actualResult)}`;
  }

  col = 7;
  expectedResult = [ 2, 4 ];
  actualResult = getLimitOfBasinVerticalForCol(testRowMatrix, lowestPointRow, col, matrixHeight);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetLimitOfBasinVerticalForCol failed with col 0. actualResult: ${JSON.stringify(actualResult)}`;
  }

  col = 8;
  expectedResult = [ 3, 4 ];
  actualResult = getLimitOfBasinVerticalForCol(testRowMatrix, lowestPointRow, col, matrixHeight);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetLimitOfBasinVerticalForCol failed with col 0. actualResult: ${JSON.stringify(actualResult)}`;
  }

  col = 9;
  expectedResult = [ 4, 4 ];
  actualResult = getLimitOfBasinVerticalForCol(testRowMatrix, lowestPointRow, col, matrixHeight);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetLimitOfBasinVerticalForCol failed with col 0. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testGetLimitOfBasinVerticalForCol successfully');
}


function testGetBasinSize() {
  const matrixHeight = 5;
  const matrixWidth = 10;

  const testRowMatrix = [
    [2,1,9,9,9,4,3,2,1,0],
    [3,9,8,7,8,9,4,9,2,1],
    [9,8,5,6,7,8,9,8,9,2],
    [8,7,6,7,8,9,6,7,8,9],
    [9,8,9,9,9,6,5,6,7,8],
  ];

  const lowestPointOneOnLeft = [0,1];
  let expectedResult = 3;
  let actualResult = getBasinSize(testRowMatrix, lowestPointOneOnLeft, matrixHeight, matrixWidth);
  
  if (expectedResult !== actualResult) {
    throw `testGetBasinSize failed with lowestPointOneOnLeft. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const lowestPointZeroOnRight = [0,9];
  expectedResult = 9;
  actualResult = getBasinSize(testRowMatrix, lowestPointZeroOnRight, matrixHeight, matrixWidth);
  
  if (expectedResult !== actualResult) {
    throw `testGetBasinSize failed with lowestPointZeroOnRight. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const lowestPointBottomRight = [4,6];
  expectedResult = 9;
  actualResult = getBasinSize(testRowMatrix, lowestPointBottomRight, matrixHeight, matrixWidth);
  
  if (expectedResult !== actualResult) {
    throw `testGetBasinSize failed with lowestPointBottomRight. actualResult: ${JSON.stringify(actualResult)}`;
  }

  // This one fails
  const lowestPointFiveInMiddle = [3,3];
  expectedResult = 14;
  actualResult = getBasinSize(testRowMatrix, lowestPointFiveInMiddle, matrixHeight, matrixWidth);
  
  if (expectedResult !== actualResult) {
    throw `testGetBasinSize failed with lowestPointFiveInMiddle. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testGetBasinSize successfully');
}
