const utils = require('../common/utils.js');

module.exports.sumArray = function(arr) {
  if (!Array.isArray(arr) || !isNumberArray(arr)) {
    throw `Invalid param: ${JSON.stringify(arr)}`;
  }

  return arr.reduce((a, b) => a + b);
}

function isNumberArray(arr) {
  const strings = arr.filter(x => typeof x === 'string');
  return strings.length === 0;
}

module.exports.getComplementOfArray = function(longerArray, shorterArray) {
  validateArrayOrder(longerArray, shorterArray);
  return longerArray.filter(x => !shorterArray.includes(x));
}

module.exports.getIntersectionOfArrays = function(longerArray, shorterArray) {
  validateArrayOrder(longerArray, shorterArray);
  return longerArray.filter(x => shorterArray.includes(x));
}

// TODO: test
module.exports.getArraysWithValue = function(arrayOfArrays, value) {
  return arrayOfArrays.filter(subArray => subArray.includes(value));
}

// tested in testGetComplementOfArray and testGetIntersectionOfArrays
function validateArrayOrder(arrOne, arrTwo) {
  if (arrOne.length < arrTwo.length ) {
    throw 'Error: Please reverse array params so longer array is first';
  }
}


/***** TESTS *****/
//runTests();

function runTests() {
  testSumArray();
  testGetComplementOfArray();
  testGetIntersectionOfArrays();
  testGetArraysWithValue();
}

function testSumArray() {
  const sumArray = module.exports.sumArray;

  const numberArray = [ 22, 44, 5, 9 ];
  let expectedResult = 80;
  let actualResult = sumArray(numberArray);

  if (expectedResult !== actualResult) {
    throw `Failed: testSumArray: ${actualResult}`;
  }

  const negativeNumberArray = [ -22, 44, 5, -9 ];
  expectedResult = 18;
  actualResult = sumArray(negativeNumberArray);

  if (expectedResult !== actualResult) {
    throw `Failed: testSumArray with neg nums: ${actualResult}`;
  }

  let expectedError = 'Invalid param: 6';
  try {
    actualResult = sumArray(6);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed testSumArray with non-array param - wrong error message`;
    }
  }

  expectedError = 'Invalid param: [6,4,15,"foo",76,"bar"]';
  try {
    actualResult = sumArray([6, 4, 15, 'foo', 76, 'bar' ]);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed testSumArray with string array param - wrong error message`;
    }
  }

  console.log('Completed run of testSumArray successfully.')
}

function testGetComplementOfArray() {
  const getComplementOfArray = module.exports.getComplementOfArray;

  const arrayLenSeven = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ];
  let arrayLenSix = [ 'a', 'b', 'd', 'e', 'f', 'g' ];
  let expectedResult = [ 'c' ];
  let actualResult = getComplementOfArray(arrayLenSeven, arrayLenSix);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `testGetComplementOfArray failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const arrayLenThree = [ 'c', 'f', 'a' ];
  const arrayLenTwo = [ 'c', 'f' ];
  expectedResult = [ 'a' ];
  actualResult = getComplementOfArray(arrayLenThree, arrayLenTwo);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `testGetComplementOfArray failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  expectedError = 'Error: Please reverse array params so longer array is first';
  try {
    actualResult = getComplementOfArray(arrayLenTwo, arrayLenThree);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed getComplementOfArray with wrong param order - wrong error message`;
    }
  }

  console.log('Completed run of testGetComplementOfArray successfully')
}

function testGetIntersectionOfArrays() {
  const getIntersectionOfArrays = module.exports.getIntersectionOfArrays;

  const arrayOne = [ 'a', 'b', 'c', 'd', 'g' ];
  let arrayTwo = [ 'b', 'd', 'e', 'f', 'g' ];
  let expectedResult = [ 'b', 'd', 'g' ];
  let actualResult = getIntersectionOfArrays(arrayOne, arrayTwo);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `testGetIntersectionOfArrays failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const arrayLenThree = [ 'c', 'f', 'a' ];
  const arrayLenTwo = [ 'c', 'f' ];
  expectedResult = [ 'c', 'f' ];
  actualResult = getIntersectionOfArrays(arrayLenThree, arrayLenTwo);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `testGetIntersectionOfArrays failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  expectedError = 'Error: Please reverse array params so longer array is first';
  try {
    actualResult = getIntersectionOfArrays(arrayLenTwo, arrayLenThree);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed testGetIntersectionOfArrays with wrong param order - wrong error message`;
    }
  }

  console.log('Completed run of testGetIntersectionOfArrays successfully')
}

function testGetArraysWithValue() {
  const getArraysWithValue = module.exports.getArraysWithValue;

  const fiveElementArrays = [
    [ 'A', 'B', 'D', 'F', 'G' ],
    [ 'A', 'C', 'D', 'E', 'G' ],
    [ 'A', 'C', 'D', 'F', 'G' ],
  ];
  const arrayWithB = [[ 'A', 'B', 'D', 'F', 'G' ]];
  const arraysWithFs = [
    [ 'A', 'B', 'D', 'F', 'G' ],
    [ 'A', 'C', 'D', 'F', 'G' ],
  ];

  let actualResult = getArraysWithValue(fiveElementArrays, 'B');
  if (!utils.objectsEqual(arrayWithB, actualResult)) {
    throw `testGetArraysWithValue failed for 'B'. actualResult: ${JSON.stringify(actualResult)}`;
  }

  actualResult = getArraysWithValue(fiveElementArrays, 'F');
  if (!utils.objectsEqual(arraysWithFs, actualResult)) {
    throw `testGetArraysWithValue failed for 'F'. actualResult: ${JSON.stringify(actualResult)}`;
  }

  actualResult = getArraysWithValue(fiveElementArrays, 'D');
  if (!utils.objectsEqual(fiveElementArrays, actualResult)) {
    throw `testGetArraysWithValue failed for 'D'. actualResult: ${JSON.stringify(actualResult)}`;
  }

  actualResult = getArraysWithValue(fiveElementArrays, 'X');
  if (!utils.objectsEqual([], actualResult)) {
    throw `testGetArraysWithValue failed for 'x'. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testGetArraysWithValue successfully')
}
