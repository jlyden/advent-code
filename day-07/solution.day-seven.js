const fileUtils = require('../common/file-utils.js');
const utils = require('../common/utils.js');

getFuelCostToMoveCrabsIntoAlignment();
//runSandbox();
//runTests();

function getFuelCostToMoveCrabsIntoAlignment(returnLimit = null) {
  const crabPositions = fileUtils.getContents('day-07/input.txt', returnLimit, ',').map(num => parseInt(num));
  const targetPosition = findTargetPosition(crabPositions);
  console.log(targetPosition);
  const costToMoveAllToTargetPosition = getCostToMove(crabPositions, targetPosition);
  const costToMoveAllToTargetPositionPlus1 = getCostToMove(crabPositions, (targetPosition + 1));
  const costToMoveAllToTargetPositionPlus5 = getCostToMove(crabPositions, (targetPosition + 5));
  const costToMoveAllToTargetPositionPlus10 = getCostToMove(crabPositions, (targetPosition + 10));
  const costToMoveAllToTargetPositionPlus50 = getCostToMove(crabPositions, (targetPosition + 50));
  const costToMoveAllToTargetPositionPlus100 = getCostToMove(crabPositions, (targetPosition + 100));
  const costPluses = [costToMoveAllToTargetPositionPlus1, costToMoveAllToTargetPositionPlus5, costToMoveAllToTargetPositionPlus10, costToMoveAllToTargetPositionPlus50, costToMoveAllToTargetPositionPlus100];
  const costToMoveAllToTargetPositionMinus1 = getCostToMove(crabPositions, (targetPosition - 1));
  const costToMoveAllToTargetPositionMinus5 = getCostToMove(crabPositions, (targetPosition - 5));
  const costToMoveAllToTargetPositionMinus10 = getCostToMove(crabPositions, (targetPosition - 10));
  const costToMoveAllToTargetPositionMinus50 = getCostToMove(crabPositions, (targetPosition - 50));
  const costToMoveAllToTargetPositionMinus100 = getCostToMove(crabPositions, (targetPosition - 100));
  const costMinuses = [costToMoveAllToTargetPositionMinus1, costToMoveAllToTargetPositionMinus5, costToMoveAllToTargetPositionMinus10, costToMoveAllToTargetPositionMinus50, costToMoveAllToTargetPositionMinus100];
  console.log(costToMoveAllToTargetPosition);
  console.log(costPluses);
  console.log(getMinOfArray(costPluses));
  console.log(costMinuses);
  console.log(getMinOfArray(costMinuses));
}

function findTargetPosition(crabPositions) {
  const avgCrabPosition = utils.avgArray(crabPositions);
  const positionsAboveAvg = filterValues(greater = true, crabPositions, avgCrabPosition);
  const positionsBelowAvg = filterValues(greater = false, crabPositions, avgCrabPosition);
  return getAverageOfLargerArray(positionsAboveAvg, positionsBelowAvg);
}

function filterValues(greater = true, arr, value) {
  const filterFn = greater ? (x => x > value) : (x => x < value);
  return arr.filter(filterFn);
}

function getAverageOfLargerArray(arr1, arr2) {
  const largerArray = (arr1.length > arr2.length) ? arr1 : arr2;
  return Math.round(utils.avgArray(largerArray));
}

function getCostToMove(crabPositions, targetPosition) {
  let costToMoveAll = 0;
  crabPositions.forEach(crabPosition => {
    costToMoveAll += Math.abs(crabPosition - targetPosition);
  });
  return costToMoveAll;
}

function getMinOfArray(arr) {
  arr.sort((a,b) => a - b);
  console.log(arr);
  return arr[0];
}

function runSandbox() {
  const input = '16,1,2,0,4,2,7,1,2,14'.split(',').map(num => parseInt(num));
  console.log(input);
  const sumInput = utils.sumArray(input);
  console.log(sumInput);
  const avgInput = sumInput/input.length;
  console.log(avgInput);
  const numsAboveAvg = input.filter(x => x > avgInput);
  console.log(numsAboveAvg);
  const numsBelowAvg = input.filter(x => x < avgInput);
  console.log(numsBelowAvg);
  const avgNumsBelowAvg = utils.sumArray(numsBelowAvg) / numsBelowAvg.length;
  console.log(avgNumsBelowAvg);
}