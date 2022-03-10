import { buildRowMatrix } from "../common/array-utils.mjs"
import { getContents } from "../common/file-utils.mjs";
import { objectsEqual } from '../common/utils.mjs';
import { determineFlashCountsAfterSteps } from './solution-day-eleven.mjs';

runTests();

function runTests() {
  testDetermineFlashCountsAfterSteps();
}

function testDetermineFlashCountsAfterSteps() {
  // setup
  let rows = getContents('day-11/input-small.txt');
  const initEnergyLevels = buildRowMatrix(rows);
  rows = getContents('day-11/input-small-after-one.txt');
  const expectedEnergyLevelsAfterOne = buildRowMatrix(rows);
  let steps = 1;
  let actualResult = determineFlashCountsAfterSteps(initEnergyLevels, steps);
  let areEqual = objectsEqual(expectedEnergyLevelsAfterOne,actualResult);
  if (!areEqual) {
    console.log(actualResult);
    //    throw `testDetermineFlashCountsAfterSteps failed. actualResult: ${JSON.stringify(actualResult)}`;
  }
}