const fileUtils = require('../common/file-utils.js');
const utils = require('../common/utils.js');

console.log(getLanternFishCountAfterDays(80));
console.log(getLanternFishCountAfterDays(256));
//runTests();

function getLanternFishCountAfterDays(days, returnLimit = null) {
  const startingFishTimers = fileUtils.getContents('day-06/input.txt', returnLimit, ',');
  let sortedFish = sortFishByTimers(startingFishTimers);
  sortedFish = updateFishAfterDays(sortedFish, days);
  return utils.sumArray(sortedFish);
}

/**
 * @param startingFishTimers string[]
 */
function sortFishByTimers(startingFishTimers) {
  let sortedFish = new Array(9).fill(0);
  startingFishTimers.forEach(timer => {
    sortedFish[timer]++
  });
  return sortedFish;
}

function updateFishAfterDays(sortedFish, days) {
  for (let i=0; i<days; i++) {
    sortedFish = updateFishAfterOneDay(sortedFish);
  }
  return sortedFish;
}

function updateFishAfterOneDay(sortedFish) {
  // "Decrement" all timers by shifting array
  const fishAtTimerZero = sortedFish.shift();

  // Every fish at timer0 spawned a new fish which starts at timer8
  sortedFish.push(fishAtTimerZero);

  // handle fish in timer0 resetting at timer6
  sortedFish[6] = parseInt(sortedFish[6]) + fishAtTimerZero;

  return sortedFish;
}

/***** TESTS *****/
function runTests() {
  testSortFishByTimers();
  testUpdateFishAfterOneDay();
}

function testSortFishByTimers() {
  const startingFishTimers15 = '2,1,2,1,5,1,5,1,2,2,1,1,5,1,4'.split(',');
  let expectedResult = [ 0, 7, 4, 0, 1, 3, 0, 0, 0 ];
  let actualResult = sortFishByTimers(startingFishTimers15);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed testSortFishByTimers. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testSortFishByTimers successfully')
}

function testUpdateFishAfterOneDay() {
  const sortedFishAllFieldsPopulated = [ 3, 1, 2, 3, 4, 5, 6, 7, 8 ];
  let expectedResult = [ 1, 2, 3, 4, 5, 6, 10, 8, 3 ];
  let actualResult = updateFishAfterOneDay(sortedFishAllFieldsPopulated);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed testUpdateFishAfterOneDay with all fields populated. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const sortedFishZerosLikeInput = [ 0, 15, 8, 5, 3, 1, 0, 0, 0 ];
  expectedResult = [ 15, 8, 5, 3, 1, 0, 0, 0, 0 ];
  actualResult = updateFishAfterOneDay(sortedFishZerosLikeInput);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `Failed testUpdateFishAfterOneDay with some zeros. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testUpdateFishAfterOneDay successfully')
}
