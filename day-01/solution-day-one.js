const fileUtils = require('../common/file-utils.js');

console.log(calculateIndividualIncreases());
console.log(calculateSlidingWindowIncreases(3));

function calculateIndividualIncreases(returnLimit = null) {
  let increases = 0;
  let previousDepth = 0;
  let currentDepth;
  
  try {
    const depths = fileUtils.getContents('day-01/input.txt', returnLimit);
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

function calculateSlidingWindowIncreases(windowSize = 3, returnLimit = null) {
  let increases = 0;
  let previousSum = 0;
  let currentSum;
  
  try {
    const depths = fileUtils.getContents('day-01/input.txt', returnLimit);
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
