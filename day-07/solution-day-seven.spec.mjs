import { objectsEqual } from '../common/utils.mjs';
import { collectCrabPositions, findLowestCostBruteForce, calculateCostIncreasingRate } from './solution-day-seven.mjs';

runTests();

function runTests() {
  testCollectCrabPositions();
  testFindLowestCostBruteForce();
  testCalculateCostIncreasingRate();
}

function testCollectCrabPositions() {
  const crabPositionsNoDups = [ 8, 1, 12, 20 ];
  let expectedResult = { '1': 1, '8': 1, '12': 1, '20': 1 };
  let actualResult = collectCrabPositions(crabPositionsNoDups);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `Failed collectCrabPositions. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const crabPositionsWithDups = [ 8, 1, 12, 20, 12, 20 ];
  expectedResult = { '1': 1, '8': 1, '12': 2, '20': 2 };
  actualResult = collectCrabPositions(crabPositionsWithDups);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `Failed collectCrabPositions. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testCollectCrabPositions successfully')
}

function testFindLowestCostBruteForce() {
  const crabPositions = [ 8, 1, 12, 20 ];
  let constantRate = true;
  let expectedResult = 23;
  let actualResult = findLowestCostBruteForce(crabPositions, constantRate);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `Failed findLowestCostBruteForce constantRate true. actualResult: ${JSON.stringify(actualResult)}`;
  }

  constantRate = false;
  expectedResult = 106;
  actualResult = findLowestCostBruteForce(crabPositions, constantRate);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `Failed findLowestCostBruteForce constantRate false. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const crabPositionsExampleFromSite = [16,1,2,0,4,2,7,1,2,14];
  constantRate = true;
  expectedResult = 37;
  actualResult = findLowestCostBruteForce(crabPositionsExampleFromSite, constantRate);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `Failed findLowestCostBruteForce  example from site, constantRate true. actualResult: ${JSON.stringify(actualResult)}`;
  }

  constantRate = false;
  expectedResult = 168;
  actualResult = findLowestCostBruteForce(crabPositionsExampleFromSite, constantRate);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `Failed findLowestCostBruteForce example from site, constantRate false. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testFindLowestCostBruteForce successfully')
}

function testCalculateCostIncreasingRate() {
  let diff = 1;
  let expectedResult = 1;
  let actualResult = calculateCostIncreasingRate(diff)

  if (expectedResult !== actualResult) {
    throw `Failed calculateCostIncreasingRate for ${diff}. actualResult: ${actualResult}`;
  }

  diff = 2;
  expectedResult = 3;
  actualResult = calculateCostIncreasingRate(diff)

  if (expectedResult !== actualResult) {
    throw `Failed calculateCostIncreasingRate for ${diff}. actualResult: ${actualResult}`;
  }

  diff = 3;
  expectedResult = 6;
  actualResult = calculateCostIncreasingRate(diff)

  if (expectedResult !== actualResult) {
    throw `Failed calculateCostIncreasingRate for ${diff}. actualResult: ${actualResult}`;
  }

  diff = 0;
  expectedResult = 0;
  actualResult = calculateCostIncreasingRate(diff)

  if (expectedResult !== actualResult) {
    throw `Failed calculateCostIncreasingRate for ${diff}. actualResult: ${actualResult}`;
  }

  diff = -1;
  const expectedError = 'Error: calculateCostIncreasingRate invalid param: -1';
  try {
    actualResult = calculateCostIncreasingRate(diff)
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed calculateCostIncreasingRate; wrong error message: ${error}`;
    }
  }

  console.log('Completed run of testCalculateCostIncreasingRate successfully')
}
