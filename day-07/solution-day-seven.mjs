import { sumArray } from '../common/array-utils.mjs';
import { getContents } from '../common/file-utils.mjs';
import { range } from '../common/utils.mjs';

console.log(getFuelCostToMoveCrabsIntoAlignment(true)); // Constant Rate: 357353 
//console.log(getFuelCostToMoveCrabsIntoAlignment(false)); // Increasing Rate: 104822130

function getFuelCostToMoveCrabsIntoAlignment(constantRate = true, returnLimit = null) {
  const crabPositions = getContents('day-07/input.txt', returnLimit, ',').map(num => parseInt(num));
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
  const rangeOfDiff = range(1, diff);
  return sumArray(rangeOfDiff);
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
    costToMoveAllCrabs += (costToMoveOneCrab * count);
  };
  return costToMoveAllCrabs;
}

function getCostToMoveOneCrab(crabPosition, targetPosition, costPerDiff) {
  const diff = getDiffBetweenPositions(crabPosition, targetPosition);
  const ret = costPerDiff ? costPerDiff[diff] : diff;
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

export { collectCrabPositions, findLowestCostBruteForce, calculateCostIncreasingRate };
