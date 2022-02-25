import { getFirstIllegalChar } from './solution-day-ten.mjs';

runTests();

function runTests() {
  testGetFirstIllegalChar();
}

function testGetFirstIllegalChar() {
  let testRow = '(]';
  let expectedResult = ']';
  let actualResult = getFirstIllegalChar(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalChar failed. actualResult: ${actualResult}`;
  }

  testRow = '{()()()>';
  expectedResult = '>';
  actualResult = getFirstIllegalChar(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalChar failed. actualResult: ${actualResult}`;
  }

  testRow = '<([]){()}[{}])';
  expectedResult = ')';
  actualResult = getFirstIllegalChar(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalChar failed. actualResult: ${actualResult}`;
  }

  testRow = '(((()))}';
  expectedResult = '}';
  actualResult = getFirstIllegalChar(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalChar failed. actualResult: ${actualResult}`;
  }

  testRow = '{([(<{}[<>[]}>{[]{[(<()>';
  expectedResult = '}';
  actualResult = getFirstIllegalChar(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalChar failed. actualResult: ${actualResult}`;
  }

  testRow = '[[<[([]))<([[{}[[()]]]';
  expectedResult = ')';
  actualResult = getFirstIllegalChar(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalChar failed. actualResult: ${actualResult}`;
  }

  testRow = '[{[{({}]{}}([{[{{{}}([]';
  expectedResult = ']';
  actualResult = getFirstIllegalChar(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalChar failed. actualResult: ${actualResult}`;
  }

  testRow = '<{([([[(<>()){}]>(<<{{';
  expectedResult = '>';
  actualResult = getFirstIllegalChar(testRow);

  if (expectedResult !== actualResult) {
    throw `testGetFirstIllegalChar failed. actualResult: ${actualResult}`;
  }

  console.log('Completed run of testGetFirstIllegalChar successfully')
}