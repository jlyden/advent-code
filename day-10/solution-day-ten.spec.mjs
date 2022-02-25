import { getFirstIllegalCharOrExpectedClosers, getCompletionScoreForClosers, getMiddleScore } from './solution-day-ten.mjs';

runTests();

function runTests() {
  testGetFirstIllegalCharOrExpectedClosers();
  testGetCompletionScoreForClosers();
  testGetMiddleScore();
}

function testGetFirstIllegalCharOrExpectedClosers() {
  // TODO: Update for returning ExpectedClosers

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

function testGetCompletionScoreForClosers() {
  let closers = [ ']', ')', '}', '>' ];
  let expectedResult = 294;
  let actualResult = getCompletionScoreForClosers(closers);

  if (expectedResult !== actualResult) {
    throw `testGetCompletionScoreForClosers failed. actualResult: ${actualResult}`;
  }

  closers = [ '}', '}', ']', ']', ')', '}', ')', ']' ];
  expectedResult = 288957;
  actualResult = getCompletionScoreForClosers(closers);

  if (expectedResult !== actualResult) {
    throw `testGetCompletionScoreForClosers failed. actualResult: ${actualResult}`;
  }

  closers = [ ')', '}', '>', ']', '}', ')' ];
  expectedResult = 5566;
  actualResult = getCompletionScoreForClosers(closers);

  if (expectedResult !== actualResult) {
    throw `testGetCompletionScoreForClosers failed. actualResult: ${actualResult}`;
  }

  closers = [ '}', '}', '>', '}', '>', ')', ')', ')', ')' ];
  expectedResult = 1480781;
  actualResult = getCompletionScoreForClosers(closers);

  if (expectedResult !== actualResult) {
    throw `testGetCompletionScoreForClosers failed. actualResult: ${actualResult}`;
  }

  closers = [ ']', ']', '}', '}', ']', '}', ']', '}', '>' ];
  expectedResult = 995444;
  actualResult = getCompletionScoreForClosers(closers);

  if (expectedResult !== actualResult) {
    throw `testGetCompletionScoreForClosers failed. actualResult: ${actualResult}`;
  }

  console.log('Completed run of testGetCompletionScoreForClosers successfully')
}

function testGetMiddleScore() {
  let scores = [ 288957, 5566, 1480781, 995444, 294 ];
  let expectedResult = 288957;
  let actualResult = getMiddleScore(scores);

  if (expectedResult !== actualResult) {
    throw `testGetCompletionScoreForClosers failed. actualResult: ${actualResult}`;
  }

  console.log('Completed run of testGetMiddleScore successfully')
}
