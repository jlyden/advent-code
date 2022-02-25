import { getFirstIllegalCharOrExpectedClosers } from './solution-day-ten.mjs';

runTests();

function runTests() {
  testGetFirstIllegalCharOrExpectedClosers();
}

function testGetFirstIllegalCharOrExpectedClosers() {
  let testRow = '(]';
  let expectedResult = ']';
  let actualResult = getFirstIllegalCharOrExpectedClosers(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalCharOrExpectedClosers failed. actualResult: ${actualResult}`;
  }

  testRow = '{()()()>';
  expectedResult = '>';
  actualResult = getFirstIllegalCharOrExpectedClosers(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalCharOrExpectedClosers failed. actualResult: ${actualResult}`;
  }

  testRow = '<([]){()}[{}])';
  expectedResult = ')';
  actualResult = getFirstIllegalCharOrExpectedClosers(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalCharOrExpectedClosers failed. actualResult: ${actualResult}`;
  }

  testRow = '(((()))}';
  expectedResult = '}';
  actualResult = getFirstIllegalCharOrExpectedClosers(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalCharOrExpectedClosers failed. actualResult: ${actualResult}`;
  }

  testRow = '{([(<{}[<>[]}>{[]{[(<()>';
  expectedResult = '}';
  actualResult = getFirstIllegalCharOrExpectedClosers(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalCharOrExpectedClosers failed. actualResult: ${actualResult}`;
  }

  testRow = '[[<[([]))<([[{}[[()]]]';
  expectedResult = ')';
  actualResult = getFirstIllegalCharOrExpectedClosers(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalCharOrExpectedClosers failed. actualResult: ${actualResult}`;
  }

  testRow = '[{[{({}]{}}([{[{{{}}([]';
  expectedResult = ']';
  actualResult = getFirstIllegalCharOrExpectedClosers(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalCharOrExpectedClosers failed. actualResult: ${actualResult}`;
  }

  testRow = '<{([([[(<>()){}]>(<<{{';
  expectedResult = '>';
  actualResult = getFirstIllegalCharOrExpectedClosers(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalCharOrExpectedClosers failed. actualResult: ${actualResult}`;
  }

  console.log('Completed run of testGetFirstIllegalCharOrExpectedClosers successfully')
}