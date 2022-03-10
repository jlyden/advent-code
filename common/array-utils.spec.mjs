import { sumArray, multiplyArray, getComplementOfArray, getIntersectionOfArrays, getArraysWithValue, reverseArray, buildRowMatrix } from './array-utils.mjs';
import { objectsEqual } from './utils.mjs';

runTests();

function runTests() {
  testSumArray();
  testMultiplyArray();
  testGetComplementOfArray();
  testGetIntersectionOfArrays();
  testGetArraysWithValue();
  testReverseArray();
  testBuildRowMatrix();
}

function testSumArray() {
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

function testMultiplyArray() {
  const numberArray = [ 2, 4, 5 ];
  let expectedResult = 40;
  let actualResult = multiplyArray(numberArray);

  if (expectedResult !== actualResult) {
    throw `Failed: testMultiplyArray: ${actualResult}`;
  }

  const negativeNumberArray = [ -2, 4, 5];
  expectedResult = -40;
  actualResult = multiplyArray(negativeNumberArray);

  if (expectedResult !== actualResult) {
    throw `Failed: testMultiplyArray with neg nums: ${actualResult}`;
  }

  let expectedError = 'Invalid param: 6';
  try {
    actualResult = sumArray(6);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed testMultiplyArray with non-array param - wrong error message`;
    }
  }

  expectedError = 'Invalid param: [6,4,15,"foo",76,"bar"]';
  try {
    actualResult = sumArray([6, 4, 15, 'foo', 76, 'bar' ]);
  } catch (error) {
    if (error !== expectedError) {
      throw `Failed testMultiplyArray with string array param - wrong error message`;
    }
  }

  console.log('Completed run of testMultiplyArray successfully.')
}

function testGetComplementOfArray() {
  const arrayLenSeven = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ];
  let arrayLenSix = [ 'a', 'b', 'd', 'e', 'f', 'g' ];
  let expectedResult = [ 'c' ];
  let actualResult = getComplementOfArray(arrayLenSeven, arrayLenSix);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetComplementOfArray failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const arrayLenThree = [ 'c', 'f', 'a' ];
  const arrayLenTwo = [ 'c', 'f' ];
  expectedResult = [ 'a' ];
  actualResult = getComplementOfArray(arrayLenThree, arrayLenTwo);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetComplementOfArray failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  let expectedError = 'Error: Please reverse array params so longer array is first';
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
  const arrayOne = [ 'a', 'b', 'c', 'd', 'g' ];
  let arrayTwo = [ 'b', 'd', 'e', 'f', 'g' ];
  let expectedResult = [ 'b', 'd', 'g' ];
  let actualResult = getIntersectionOfArrays(arrayOne, arrayTwo);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetIntersectionOfArrays failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  const arrayLenThree = [ 'c', 'f', 'a' ];
  const arrayLenTwo = [ 'c', 'f' ];
  expectedResult = [ 'c', 'f' ];
  actualResult = getIntersectionOfArrays(arrayLenThree, arrayLenTwo);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testGetIntersectionOfArrays failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  let expectedError = 'Error: Please reverse array params so longer array is first';
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
  if (!objectsEqual(arrayWithB, actualResult)) {
    throw `testGetArraysWithValue failed for 'B'. actualResult: ${JSON.stringify(actualResult)}`;
  }

  actualResult = getArraysWithValue(fiveElementArrays, 'F');
  if (!objectsEqual(arraysWithFs, actualResult)) {
    throw `testGetArraysWithValue failed for 'F'. actualResult: ${JSON.stringify(actualResult)}`;
  }

  actualResult = getArraysWithValue(fiveElementArrays, 'D');
  if (!objectsEqual(fiveElementArrays, actualResult)) {
    throw `testGetArraysWithValue failed for 'D'. actualResult: ${JSON.stringify(actualResult)}`;
  }

  actualResult = getArraysWithValue(fiveElementArrays, 'X');
  if (!objectsEqual([], actualResult)) {
    throw `testGetArraysWithValue failed for 'x'. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testGetArraysWithValue successfully')
}

function testReverseArray() {

  let testArray = [ ']', ')', '}', ')', ']', ']', '}', '}' ];
  let expectedResult = [ '}', '}', ']', ']', ')', '}', ')', ']' ];
  let actualResult = reverseArray(testArray);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testReverseArray failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testReverseArray successfully')
}

function testBuildRowMatrix() {
  const testRows = [
    '2199943210\r',
    '3987894921\r',
    '9856789892\r',
    '8767896789\r',
    '9899965678'
  ];

  const expectedResult = [
    [2,1,9,9,9,4,3,2,1,0],
    [3,9,8,7,8,9,4,9,2,1],
    [9,8,5,6,7,8,9,8,9,2],
    [8,7,6,7,8,9,6,7,8,9],
    [9,8,9,9,9,6,5,6,7,8],
  ];

  let actualResult = buildRowMatrix(testRows);

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testBuildRowMatrix failed with ${JSON.stringify(testRows)}. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testBuildRowMatrix successfully')
}
