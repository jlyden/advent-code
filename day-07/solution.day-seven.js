const fileUtils = require('../common/file-utils.js');
const utils = require('../common/utils.js');

console.log(getFuelCostToMoveCrabsIntoAlignment(constantRate = true)); // Constant Rate: 357353 
console.log(getFuelCostToMoveCrabsIntoAlignment(constantRate = false)); // Increasing Rate: 104822130
runTests();

function getFuelCostToMoveCrabsIntoAlignment(constantRate = true, returnLimit = null) {
  const crabPositions = fileUtils.getContents('day-07/input.txt', returnLimit, ',').map(num => parseInt(num));
  return findLowestCostBruteForce(crabPositions, constantRate);
}

// tested
// Brute force method works, but with horrible efficiency
// More data and/or greater range vastly increases computation time
function findLowestCostBruteForce(crabPositions, constantRate) {
  const [ positionMin, positionMax ] = getMinMaxOfArray(crabPositions);
  const collectedCrabPositions = collectCrabPositions(crabPositions);
  const costPerDiff = constantRate ? null : getCostPerDiff(positionMin, positionMax);
  let costsForAllPositions = getCostsToMoveCrabsToAllPositions(collectedCrabPositions, positionMin, positionMax, costPerDiff);
  return getMinMaxOfArray(costsForAllPositions)[0];
}

// tested
function collectCrabPositions(crabPositions) {
  let collectedCrabPositions = {};
  crabPositions.forEach(crabPosition => {
    collectedCrabPositions[crabPosition] = parseInt(collectedCrabPositions[crabPosition] || 0) + 1;
  });
  return collectedCrabPositions;
}

function getCostPerDiff(positionMin, positionMax) {
  let costPerDiff = {};
  for (let targetPosition = positionMin; targetPosition <= positionMax; targetPosition++) {
    const diff = getDiffBetweenPositions(targetPosition, positionMax);
    let cost = calculateCostIncreasingRate(diff);
    costPerDiff[diff] = cost;
  }
  return costPerDiff;
}

// tested
function calculateCostIncreasingRate(diff) {
  if (diff < 0) {
    throw `Error: calculateCostIncreasingRate invalid param: ${JSON.stringify(diff)}`;
  }

  if (diff === 0) {
    return diff;
  }
  const range = utils.range(1, diff);
  return utils.sumArray(range);
}

function getCostsToMoveCrabsToAllPositions(collectedCrabPositions, positionMin, positionMax, costPerDiff) {
  let costsForAllPositions = [];
  for (let targetPosition = positionMin; targetPosition <= positionMax; targetPosition++) {
    const costToMoveCrabsToPosition = getCostToMoveCrabsToPosition(collectedCrabPositions, targetPosition, costPerDiff);
    costsForAllPositions.push(costToMoveCrabsToPosition);
  }
  return costsForAllPositions;
}

function getCostToMoveCrabsToPosition(collectedCrabPositions, targetPosition, costPerDiff) {
  let costToMoveAllCrabs = 0;
  for (const [crabPosition, count] of Object.entries(collectedCrabPositions)) {
    let costToMoveOneCrab = getCostToMoveOneCrab(crabPosition, targetPosition, costPerDiff);
//    console.log(`costToMoveOne * count: ${costToMoveOneCrab} * ${count}`);
    costToMoveAllCrabs += (costToMoveOneCrab * count);
  };
  return costToMoveAllCrabs;
}

function getCostToMoveOneCrab(crabPosition, targetPosition, costPerDiff) {
  const diff = getDiffBetweenPositions(crabPosition, targetPosition);
//  console.log(`diffBtwnPositions: ${diff}`);
  const ret = costPerDiff ? costPerDiff[diff] : diff;
//  console.log(`getCostToMoveOneCrab ret: ${ret}`);
  return ret;
}

function getDiffBetweenPositions(positionOne, positionTwo) {
  return Math.abs(parseInt(positionOne) - positionTwo);
}

function getMinMaxOfArray(arr) {
  if (!Array.isArray(arr)) {
    throw `Error: getMinMaxOfArray called with non array: ${JSON.stringify(arr)}`;
  }
  arr.sort((a,b) => a - b);
  return [ arr[0], arr[arr.length-1] ];
}

/***** TESTS *****/
function runTests() {
  testCollectCrabPositions();
  testFindLowestCostBruteForce();
  testCalculateCostIncreasingRate();
}

function testCollectCrabPositions() {
  const crabPositionsNoDups = [ 8, 1, 12, 20 ];
  let expectedResult = { '1': 1, '8': 1, '12': 1, '20': 1 };
  let actualResult = collectCrabPositions(crabPositionsNoDups);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed collectCrabPositions. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const crabPositionsWithDups = [ 8, 1, 12, 20, 12, 20 ];
  expectedResult = { '1': 1, '8': 1, '12': 2, '20': 2 };
  actualResult = collectCrabPositions(crabPositionsWithDups);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed collectCrabPositions. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testCollectCrabPositions successfully')
}

function testFindLowestCostBruteForce() {
  const crabPositions = [ 8, 1, 12, 20 ];
  let constantRate = true;
  let expectedResult = 23;
  let actualResult = findLowestCostBruteForce(crabPositions, constantRate);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed findLowestCostBruteForce constantRate true. actualResult: ${JSON.stringify(actualResult)}`;
  }

  constantRate = false;
  expectedResult = 106;
  actualResult = findLowestCostBruteForce(crabPositions, constantRate);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed findLowestCostBruteForce constantRate false. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const crabPositionsExampleFromSite = [16,1,2,0,4,2,7,1,2,14];
  constantRate = true;
  expectedResult = 37;
  actualResult = findLowestCostBruteForce(crabPositionsExampleFromSite, constantRate);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed findLowestCostBruteForce  example from site, constantRate true. actualResult: ${JSON.stringify(actualResult)}`;
  }

  constantRate = false;
  expectedResult = 168;
  actualResult = findLowestCostBruteForce(crabPositionsExampleFromSite, constantRate);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
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