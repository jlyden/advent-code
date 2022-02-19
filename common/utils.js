module.exports.objectsEqual = function (a, b) {
  const objectsEqual = module.exports.objectsEqual;

  if (isPrimative(a)) {
    return a === b;
  }

  if (Array.isArray(a)) {
    const aLen = a.length;
    if (aLen !== b.length) {
      return false;
    }

    for(let i=0; i<aLen; i++) {
      if (!objectsEqual(a[i], b[i])){
        return false;
      };
    }
  } else {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }

    for (const [key, value] of Object.entries(a)) {
      if (!objectsEqual(value, b[key])){
        return false;
      };
    }
  }

  return true;
}

function isPrimative(a) {
  const primatives = ['string', 'number', 'bigint', 'boolean'];
  return primatives.indexOf(typeof a) !== -1;
}

module.exports.range = function(start, end) {
  if (start === end) {
    return [ start ];
  }
  const length = Math.abs(end - start) + 1;

  if(end > start) {
    // credit: https://dev.to/mbrookes/comment/k2ff
    return Array.from({ length }, (_, i) => start + i);
  } else {
    return Array.from({ length }, (_, i) => start - i);
  }
}

module.exports.splitStringOnSpaces = function(input) {
  if (typeof input !== 'string') {
    throw 'Error: Input must be a string.';
  }
  return input.split(/\s+/).filter(element => element.length > 0);
}

module.exports.alphabetizeString = function(input) {
  if (typeof input !== 'string') {
    throw 'Error: Input must be a string.';
  }
  return input.split('').sort().join('').trim();
}

module.exports.splitStringParseInts = function(input) {
  if (typeof input !== 'string') {
    throw 'Error: Input must be a string.';
  }
  return input.split('').map(element => parseInt(element));
}

/***** TESTS *****/
//runTests();

function runTests() {
  testObjectsEqual();
  testRange();
  testSplitStringOnSpaces();
  testAlphabetizeString();
  testSplitStringParseInts();
}

function testObjectsEqual() {
  const objectsEqual = module.exports.objectsEqual;

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
  const range = module.exports.range;
  const objectsEqual = module.exports.objectsEqual;

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
  const objectsEqual = module.exports.objectsEqual;
  const splitStringOnSpaces = module.exports.splitStringOnSpaces;

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

  expectedError = 'Error: Input must be a string.';
  try {
    actualResult = splitStringOnSpaces(12345);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed testSplitStringOnSpaces with non-string input - wrong error message`;
    }
  }

  console.log('Completed run of testSplitStringOnSpaces successfully.');
}

function testAlphabetizeString() {
  const alphabetizeString = module.exports.alphabetizeString;

  const startingString = 'febac';
  let expectedResult = 'abcef';
  let actualResult = alphabetizeString(startingString);

  if (expectedResult !== actualResult) {
    throw `Failed: testAlphabetizeString: ${actualResult}`;
  }

  expectedError = 'Error: Input must be a string.';
  try {
    actualResult = alphabetizeString(12345);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed testAlphabetizeString with non-string input - wrong error message`;
    }
  }

  console.log('Completed run of testAlphabetizeString successfully.');
}

function testSplitStringParseInts() {
  const objectsEqual = module.exports.objectsEqual;
  const splitStringParseInts = module.exports.splitStringParseInts;

  const strWithInts = '123456';
  let expectedResult = [1,2,3,4,5,6];
  let actualResult = splitStringParseInts(strWithInts);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `Failed: testSplitStringParseInts with strWithInts: ${actualResult}`;
  }

  expectedError = 'Error: Input must be a string.';
  try {
    actualResult = splitStringParseInts(12345);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed testSplitStringParseInts with non-string input - wrong error message`;
    }
  }
  console.log('Completed run of testSplitStringParseInts successfully.');
}