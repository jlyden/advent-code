import { objectsEqual } from '../common/utils.mjs';
import {
  getCurrentPointAndNeighbors,
  currentPointIsLowest,
} from './solution-day-nine-part-two-new.mjs';

runTests();

function runTests() {
  testGetCurrentPointAndNeighbors();
  testCurrentPointIsLowest();
}

function testGetCurrentPointAndNeighbors() {
  const rowMatrix =  [
    [2,1,9,9,9,4,3,2,1,0],
    [3,9,8,7,8,9,4,9,2,1],
    [9,8,5,6,7,8,9,8,9,2],
    [8,7,6,7,8,9,6,7,8,9],
    [9,8,9,9,9,6,5,6,7,8],
  ];
  let currentCoords = { row: 0, col: 0, };
  let expectedResult = [
    { pointLocale: 'current', value: 2, coords: { row: 0, col: 0 } },
    { pointLocale: 'next', value: 1, coords: { row: 0, col: 1 } },
    { pointLocale: 'below', value: 3, coords: { row: 1, col: 0 } },
  ];
  let actualResult = getCurrentPointAndNeighbors(rowMatrix, currentCoords);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetCurrentPointAndNeighbors failed with ${JSON.stringify(currentCoords)}. actualResult: ${JSON.stringify(actualResult)}`;
  }

  currentCoords = { row: 0, col: 1, };
  expectedResult = [
    { pointLocale: 'current', value: 1, coords: { row: 0, col: 1 } },
    { pointLocale: 'previous', value: 2, coords: { row: 0, col: 0 } },
    { pointLocale: 'next', value: 9, coords: { row: 0, col: 2 } },
    { pointLocale: 'below', value: 9, coords: { row: 1, col: 1 } },
  ];
  actualResult = getCurrentPointAndNeighbors(rowMatrix, currentCoords);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetCurrentPointAndNeighbors failed with ${JSON.stringify(currentCoords)}. actualResult: ${JSON.stringify(actualResult)}`;
  }

  currentCoords = { row: 0, col: 9, };
  expectedResult = [
    { pointLocale: 'current', value: 0, coords: { row: 0, col: 9 } },
    { pointLocale: 'previous', value: 1, coords: { row: 0, col: 8 } },
    { pointLocale: 'below', value: 1, coords: { row: 1, col: 9 } },
  ];
  actualResult = getCurrentPointAndNeighbors(rowMatrix, currentCoords);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetCurrentPointAndNeighbors failed with ${JSON.stringify(currentCoords)}. actualResult: ${JSON.stringify(actualResult)}`;
  }

  currentCoords = { row: 1, col: 8, };
  expectedResult = [
    { pointLocale: 'current', value: 2, coords: { row: 1, col: 8 } },
    { pointLocale: 'previous', value: 9, coords: { row: 1, col: 7 } },
    { pointLocale: 'next', value: 1, coords: { row: 1, col: 9 } },
    { pointLocale: 'below', value: 9, coords: { row: 2, col: 8 } },
    { pointLocale: 'above', value: 1, coords: { row: 0, col: 8 } },
  ];
  actualResult = getCurrentPointAndNeighbors(rowMatrix, currentCoords);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetCurrentPointAndNeighbors failed with ${JSON.stringify(currentCoords)}. actualResult: ${JSON.stringify(actualResult)}`;
  }

  currentCoords = { row: 4, col: 1, };
  expectedResult = [
    { pointLocale: 'current', value: 8, coords: { row: 4, col: 1 } },
    { pointLocale: 'previous', value: 9, coords: { row: 4, col: 0 } },
    { pointLocale: 'next', value: 9, coords: { row: 4, col: 2 } },
    { pointLocale: 'above', value: 7, coords: { row: 3, col: 1 } },
  ];
  actualResult = getCurrentPointAndNeighbors(rowMatrix, currentCoords);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetCurrentPointAndNeighbors failed with ${JSON.stringify(currentCoords)}. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testGetCurrentPointAndNeighbors successfully')
}

function testCurrentPointIsLowest() {
  let points = [
    { pointLocale: 'current', value: 2, coords: { row: 0, col: 0 } },
    { pointLocale: 'next', value: 1, coords: { row: 0, col: 1 } },
    { pointLocale: 'below', value: 3, coords: { row: 1, col: 0 } },
  ];
  let expectedResult = false;
  let actualResult = currentPointIsLowest(points);

  if (expectedResult !== actualResult) {
    throw `testCurrentPointIsLowest failed with ${JSON.stringify(points)}.`;
  }

  points = [
    { pointLocale: 'current', value: 2, coords: { row: 1, col: 8 } },
    { pointLocale: 'previous', value: 9, coords: { row: 1, col: 7 } },
    { pointLocale: 'next', value: 1, coords: { row: 1, col: 9 } },
    { pointLocale: 'below', value: 9, coords: { row: 2, col: 8 } },
    { pointLocale: 'above', value: 1, coords: { row: 0, col: 8 } },
  ];
  expectedResult = false;
  actualResult = currentPointIsLowest(points);

  if (expectedResult !== actualResult) {
    throw `testCurrentPointIsLowest failed with ${JSON.stringify(points)}.`;
  }

  points = [
    { pointLocale: 'current', value: 1, coords: { row: 1, col: 8 } },
    { pointLocale: 'previous', value: 9, coords: { row: 1, col: 7 } },
    { pointLocale: 'next', value: 1, coords: { row: 1, col: 9 } },
    { pointLocale: 'below', value: 9, coords: { row: 2, col: 8 } },
    { pointLocale: 'above', value: 1, coords: { row: 0, col: 8 } },
  ];
  expectedResult = false;
  actualResult = currentPointIsLowest(points);

  if (expectedResult !== actualResult) {
    throw `testCurrentPointIsLowest failed with ${JSON.stringify(points)}.`;
  }

  points = [
    { pointLocale: 'current', value: 0, coords: { row: 1, col: 8 } },
    { pointLocale: 'previous', value: 9, coords: { row: 1, col: 7 } },
    { pointLocale: 'next', value: 1, coords: { row: 1, col: 9 } },
    { pointLocale: 'below', value: 9, coords: { row: 2, col: 8 } },
    { pointLocale: 'above', value: 1, coords: { row: 0, col: 8 } },
  ];
  expectedResult = false;
  actualResult = currentPointIsLowest(points);

  if (expectedResult !== actualResult) {
    throw `testCurrentPointIsLowest failed with ${JSON.stringify(points)}.`;
  }
  console.log('Completed run of testCurrentPointIsLowest successfully')
}