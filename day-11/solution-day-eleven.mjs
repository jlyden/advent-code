import { getContents } from "../common/file-utils.mjs";
import { buildRowMatrix } from "../common/matrix-utils.mjs"

getFlashCountAfterSteps(1,1);

function getFlashCountAfterSteps(steps, returnLimit = null) {
  const rows = getContents('day-11/input.txt', returnLimit);
  const initEnergyLevels = buildRowMatrix(rows);
  return determineFlashCountsAfterSteps(initEnergyLevels, steps);
}

function determineFlashCountsAfterSteps(currentEnergyLevels, steps) {
  if (steps === 0) {
    return currentEnergyLevels;
  }

  // first bump all of the octs once
  currentEnergyLevels = bumpOcts(currentEnergyLevels);

  // if X, cycle through adjacent octs and +1

  // and check for flash ...


  return currentEnergyLevels;
}

function bumpOcts(currentEnergyLevels) {
  const matrixHeight = currentEnergyLevels.length;
  for (let row=0; row<matrixHeight; row++) {
    currentEnergyLevels[row] = currentEnergyLevels[row].map(specialAddOne);
  }
  return currentEnergyLevels;
}

function specialAddOne(x) {
  if (x === -1) {
    // already ready for flash; no op
  } else if (x === 9) {
    // ready for flash
    x = -1;
  } else {
    x++;
  }
  return x;
}

export { determineFlashCountsAfterSteps };