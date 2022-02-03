const fileUtils = require('../common/file-utils.js');
const utils = require('../common/utils.js');

//console.log(getLanternFishCountAfterDays(80));

function getLanternFishCountAfterDays(days, returnLimit = null) {
  const startingLanternfishSpawnTimers = fileUtils.getContents('day-06/input.txt', returnLimit, ',');
  // every day, all laternfish spawnTimers decrement by 1
  // after 0, timer resets to 6, and another laternfish is added to list w/ spawnTimer = 8
  // how many lanternfish after 80 days?
  // since we just want count at end, order doesn't matter
  // should sort fish to simplify record keeping
  // trick is adding new fish into sort on time
}
