import { sumArray } from '../common/array-utils.mjs';
import { getContents } from '../common/file-utils.mjs';

console.log(getLanternFishCountAfterDays(80)); //362639
console.log(getLanternFishCountAfterDays(256)); // 1639854996917

function getLanternFishCountAfterDays(days, returnLimit = null) {
  const startingFishTimers = getContents('day-06/input.txt', returnLimit, ',');
  let sortedFish = sortFishByTimers(startingFishTimers);
  sortedFish = updateFishAfterDays(sortedFish, days);
  return sumArray(sortedFish);
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

export { sortFishByTimers, updateFishAfterOneDay };
