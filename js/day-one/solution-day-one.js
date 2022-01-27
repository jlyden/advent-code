const fileUtils = require('../common/file-utils.js');

function calculateIndividualIncreases() {
  let increases = 0;
  let previousDepth = 0;
  let currentDepth;
  
  try {
    const depths = fileUtils.getContents('js/day-one/input.txt');
    depths.forEach(depth => {
      currentDepth = parseInt(depth);
      if(currentDepth > previousDepth) {
        increases++;
      }
      previousDepth = currentDepth;
    });

    // Adjust so first value does not count as increase
    increases--;
    return increases;
  } catch (error) {
    console.log(error);
  }
}

console.log(calculateIndividualIncreases());

function calculateSlidingWindowIncreases(windowSize = 3) {
  let increases = 0;
  let previousSum = 0;
  let currentSum;
  
  try {
    const depths = fileUtils.getContents('js/day-one/input.txt');
    const totalDepthWindows = depths.length-2;
    for(let i=0; i<totalDepthWindows; i++) {
      currentSum = 0;
      for(let j=0; j<windowSize; j++) {
        currentSum += parseInt(depths[i+j])
      }
      if(currentSum > previousSum) {
        increases++;
      }
      previousSum = currentSum;
    };

    // Adjust so first value does not count as increase
    increases--;
    return increases;
  } catch (error) {
    console.log(error);
  }
}

console.log(calculateSlidingWindowIncreases(3));
