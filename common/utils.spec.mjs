import { objectsEqual, range, splitStringOnSpaces, splitStringParseInts } from './utils.mjs';

runTests();

function runTests() {
  testObjectsEqual();
  testRange();
  testSplitStringOnSpaces();
  testSplitStringParseInts();
}

function testObjectsEqual() {
  const baseObject = {
    aString: 'cheese',
    aNumber: 5,
    oneLevelArray: [1, 2, 3],
    twoLevelArray: [
      [4, 5, 6],
      ['x', 'y', 'z'],
    ],
  }

  const flatArray = [1, 2, 3];
  const flatArrayDifferent = [9, 2, 3];

  if (!objectsEqual(flatArray, flatArray)) {
    throw 'Failed: flatArray not equal to itself';
  }

  if (objectsEqual(flatArray, flatArrayDifferent)) {
    throw 'Failed: flatArray different';
  }

  const justString = 'cheese';
  if (!objectsEqual(justString, justString)) {
    throw 'Failed: string not equal to itself';
  }

  if (!objectsEqual(baseObject, baseObject)) {
    throw 'Failed: object not equal to itself';
  }

  const stringDifferent = {
    ...baseObject,
    aString: 'foo',
  }
  if (objectsEqual(baseObject, stringDifferent)) {
    throw 'Failed: missed string difference';
  }

  const numberDifferent = {
    ...baseObject,
    aNumber: 10,
  }

  if (objectsEqual(baseObject, numberDifferent)) {
    throw 'Failed: missed number difference';
  }

  const oneLevelArrayDifferent = {
    ...baseObject,
    oneLevelArray: [1, 2, 9],
  }

  if (objectsEqual(baseObject, oneLevelArrayDifferent)) {
    throw 'Failed: missed one level array difference';
  }

  const twoLevelArrayFlipped = {
    ...baseObject,
    twoLevelArray: [
      ['x', 'y', 'z'],
      [4, 5, 6],
    ],
  }

  if (objectsEqual(baseObject, twoLevelArrayFlipped)) {
    throw 'Failed: missed two level array flipped';
  }

  const twoLevelArrayDifferent = {
    ...baseObject,
    twoLevelArray: [
      [4, 5, 6],
      ['x', 'b', 'z'],
    ],
  }

  if (objectsEqual(baseObject, twoLevelArrayDifferent)) {
    throw 'Failed: missed two level array difference';
  }

  console.log('Completed run of testObjectsEqual successfully.')
}

function testRange() {
  const expectedResult0To5 = [0, 1, 2, 3, 4, 5];
  let actualResult = range(0,5);

  if (!objectsEqual(expectedResult0To5, actualResult)) {
    throw `Failed: testRange with expectedResult0To5: ${actualResult}`;
  }

  const expectedResult1To2 = [1, 2];
  actualResult = range(1,2);

  if (!objectsEqual(expectedResult1To2, actualResult)) {
    throw `Failed: testRange with expectedResult1To2: ${actualResult}`;
  }

  const expectedResult100To100 = [100];
  actualResult = range(100,100);

  if (!objectsEqual(expectedResult100To100, actualResult)) {
    throw `Failed: testRange with expectedResult100To100: ${actualResult}`;
  }

  const expectedResult5To1 = [5, 4, 3, 2, 1];
  actualResult = range(5,1);

  if (!objectsEqual(expectedResult5To1, actualResult)) {
    throw `Failed: testRange with expectedResult5To1: ${actualResult}`;
  }

  console.log('Completed run of testRange successfully.');
}

function testSplitStringOnSpaces() {
  const strWithSingleSpaces = 'abc def ghi';
  let expectedResult = [ 'abc', 'def', 'ghi' ];
  let actualResult = splitStringOnSpaces(strWithSingleSpaces);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `Failed: testSplitStringOnSpaces with strWithSingleSpaces: ${actualResult}`;
  }

  const strWithExtraSpaces = ' abc  def                     ghi';
  expectedResult = [ 'abc', 'def', 'ghi' ];
  actualResult = splitStringOnSpaces(strWithExtraSpaces);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `Failed: testSplitStringOnSpaces with strWithExtraSpaces: ${actualResult}`;
  }

  let expectedError = 'Error: Input must be a string.';
  try {
    actualResult = splitStringOnSpaces(12345);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed testSplitStringOnSpaces with non-string input - wrong error message`;
    }
  }

  console.log('Completed run of testSplitStringOnSpaces successfully.');
}

function testSplitStringParseInts() {
  const strWithInts = '123456';
  let expectedResult = [1,2,3,4,5,6];
  let actualResult = splitStringParseInts(strWithInts);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `Failed: testSplitStringParseInts with strWithInts: ${actualResult}`;
  }

  const strWithIntsAndNonInts = "2199943210\r";
  expectedResult = [2,1,9,9,9,4,3,2,1,0];
  actualResult = splitStringParseInts(strWithIntsAndNonInts);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `Failed: testSplitStringParseInts with strWithIntsAndNonInts: ${actualResult}`;
  }

  let expectedError = 'Error: Input must be a string.';
  try {
    actualResult = splitStringParseInts(12345);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed testSplitStringParseInts with non-string input - wrong error message`;
    }
  }
  console.log('Completed run of testSplitStringParseInts successfully.');
}
