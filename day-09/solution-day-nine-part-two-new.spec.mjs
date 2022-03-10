import { currentPointIsLowest } from './solution-day-nine-part-two-new.mjs';

runTests();

function runTests() {
  testCurrentPointIsLowest();
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