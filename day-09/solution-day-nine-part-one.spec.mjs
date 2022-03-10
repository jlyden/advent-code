import { objectsEqual } from '../common/utils.mjs';
import {
  getCurrentPointAndNeighbors,
  currentPointIsLowest,
  getLowPoints,
  calculateSumOfLowPointRiskLevels,
} from './solution-day-nine-part-one.mjs';

runTests();

function runTests() {
  testGetCurrentPointAndNeighbors();
  testCurrentPointIsLowest();
  testGetLowPoints();
  testCalculateSumOfLowPointRiskLevels();
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
