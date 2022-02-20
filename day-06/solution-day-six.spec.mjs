import { objectsEqual } from '../common/utils.mjs';
import { sortFishByTimers, updateFishAfterOneDay } from './solution-day-six.mjs';

runTests();

function runTests() {
  testSortFishByTimers();
  testUpdateFishAfterOneDay();
}

function testSortFishByTimers() {
  const startingFishTimers15 = '2,1,2,1,5,1,5,1,2,2,1,1,5,1,4'.split(',');
  let expectedResult = [ 0, 7, 4, 0, 1, 3, 0, 0, 0 ];
  let actualResult = sortFishByTimers(startingFishTimers15);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `Failed testSortFishByTimers. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testSortFishByTimers successfully')
}

function testUpdateFishAfterOneDay() {
  const sortedFishAllFieldsPopulated = [ 3, 1, 2, 3, 4, 5, 6, 7, 8 ];
  let expectedResult = [ 1, 2, 3, 4, 5, 6, 10, 8, 3 ];
  let actualResult = updateFishAfterOneDay(sortedFishAllFieldsPopulated);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `Failed testUpdateFishAfterOneDay with all fields populated. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const sortedFishZerosLikeInput = [ 0, 15, 8, 5, 3, 1, 0, 0, 0 ];
  expectedResult = [ 15, 8, 5, 3, 1, 0, 0, 0, 0 ];
  actualResult = updateFishAfterOneDay(sortedFishZerosLikeInput);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `Failed testUpdateFishAfterOneDay with some zeros. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testUpdateFishAfterOneDay successfully')
}
