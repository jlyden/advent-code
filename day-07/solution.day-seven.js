const fileUtils = require('../common/file-utils.js');
const utils = require('../common/utils.js');

console.log(getFuelCostToMoveCrabsIntoAlignmentBruteForce()); // 357353 moving to position 332
runTests();

function getFuelCostToMoveCrabsIntoAlignmentBruteForce(returnLimit = null) {
  const crabPositions = fileUtils.getContents('day-07/input.txt', returnLimit, ',').map(num => parseInt(num));
  return findLowestCostBruteForce(crabPositions);
}

function collectCrabPositions(crabPositions) {
  let collectedCrabPositions = {};
  crabPositions.forEach(crabPosition => {
    collectedCrabPositions[crabPosition] = parseInt(collectedCrabPositions[crabPosition] || 0) + 1;
  });
  return collectedCrabPositions;
}

// This brute force method works, but with horrible efficiency
// Not only more data, but greater range vastly increases computation time
function findLowestCostBruteForce(crabPositions) {
  const [ arrMin, arrMax ] = getMinMaxOfArray(crabPositions);
  const collectedCrabPositions = collectCrabPositions(crabPositions);
  let allCosts = [];
  for (let position = arrMin; position <= arrMax; position++) {
    const costToMoveCrabs = getCostToMoveCrabs(collectedCrabPositions, position);
    allCosts.push(costToMoveCrabs);
  }
  return getMinMaxOfArray(allCosts)[0];
}

function getCostToMoveCrabs(collectedCrabPositions, targetPosition) {
  let costToMoveAll = 0;
  for (const [position, count] of Object.entries(collectedCrabPositions)) {
    const costToMoveCrabsAtPosition = Math.abs(parseInt(position) - targetPosition) * count;
    costToMoveAll += costToMoveCrabsAtPosition
  };
  return costToMoveAll;
}

function getMinMaxOfArray(arr) {
  arr.sort((a,b) => a - b);
  return [ arr[0], arr[arr.length-1] ];
}

/* Attempts to figure out a smarter way to reach an answer -> to little avail */
function getFuelCostToMoveCrabsIntoAlignment(returnLimit = null) {
  const crabPositions = fileUtils.getContents('day-07/input.txt', returnLimit, ',').map(num => parseInt(num));
  const collectedCrabPositions = collectCrabPositions(crabPositions);
  const middlePosition = getMiddleOfRangeOfPositions(collectedCrabPositions);
  const averageOfPositions = getAverageOfPositions(crabPositions);
}

function getMiddleOfRangeOfPositions(collectedCrabPositions) {
  const positions = Object.keys(collectedCrabPositions);
  const bottomOfRange = positions[0];
  const topOfRange = positions[positions.length - 1];
  const middle = Math.round((parseInt(topOfRange) - parseInt(bottomOfRange)) / 2);
  return middle;
}

function getAverageOfPositions(crabPositions) {
  return Math.round((utils.sumArray(crabPositions)) / crabPositions.length);
}

/***** TESTS *****/
function runTests() {
  testCollectCrabPositions();
  testFindLowestCostBruteForce();
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
  let expectedResult = 23;
  let actualResult = findLowestCostBruteForce(crabPositions);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed findLowestCostBruteForce. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testFindLowestCostBruteForce successfully')
}
