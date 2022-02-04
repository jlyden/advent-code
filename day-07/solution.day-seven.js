const fileUtils = require('../common/file-utils.js');
const utils = require('../common/utils.js');

//console.log(getFuelCostToMoveCrabsIntoAlignment());
runTests();

function getFuelCostToMoveCrabsIntoAlignment(returnLimit = null) {
  const crabPositions = fileUtils.getContents('day-07/input.txt', returnLimit, ',').map(num => parseInt(num));
  return findLowestCostBruteForce(crabPositions);
}

function collectCrabPositions(crabPositions) {
  let collectedCrabPositions = {};
  crabPositions.forEach(crabPosition => {
    const currentCount = collectedCrabPositions[crabPosition] || 0;
    collectedCrabPositions[crabPosition] = currentCount++;
  });
  return collectedCrabPositions;
}

// This brute force method works, but horrible efficiency
// Not only more data, but greater range vastly increases computation time
function findLowestCostBruteForce(crabPositions) {
  const [ arrMin, arrMax ] = getMinMaxOfArray(crabPositions);
  let allCosts = [];
  for (let position = arrMin; position <= arrMax; position++) {
    const costToMoveCrabs = getCostToMoveCrabs(crabPositions, position);
    allCosts.push(costToMoveCrabs);
  }
  return getMinMaxOfArray(allCosts)[0];
}

function getCostToMoveCrabs(crabPositions, targetPosition) {
  let costToMoveAll = 0;
  crabPositions.forEach(crabPosition => {
    const costToMoveCrab = Math.abs(crabPosition - targetPosition);
    costToMoveAll += costToMoveCrab
  });
  return costToMoveAll;
}

function getMinMaxOfArray(arr) {
  arr.sort((a,b) => a - b);
  return [ arr[0], arr[arr.length-1] ];
}


/***** TESTS *****/
function runTests() {
  testFindLowestCostBruteForce();
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
