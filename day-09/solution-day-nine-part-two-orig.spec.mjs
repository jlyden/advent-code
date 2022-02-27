import { objectsEqual } from '../common/utils.mjs';
import {
  calculateProductOfThreeLargestBasinSizes,
  getLimitOfBasinHorizontal,
  getBasinSize,
  getLimitOfBasinVerticalForCol,
} from './solution-day-nine-part-two-orig.mjs';

runTests();

function runTests() {
  testCalculateProductOfThreeLargestBasinSizes();
  testGetLimitOfBasinHorizontal();
  testGetLimitOfBasinVerticalForCol();
  testGetBasinSize(); // expect failure for 'lowestPointFiveInMiddle'
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
