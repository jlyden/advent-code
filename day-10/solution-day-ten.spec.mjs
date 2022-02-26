import { objectsEqual } from '../common/utils.mjs';
import { getFirstIllegalCharOrExpectedClosers, getCompletionScoreForClosers, getMiddleScore } from './solution-day-ten.mjs';

runTests();

function runTests() {
  testGetFirstIllegalCharOrExpectedClosers();
  testGetCompletionScoreForClosers();
  testGetMiddleScore();
}

function testGetFirstIllegalCharOrExpectedClosers() {
  // Finding corrupt rows - return single illegal char
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

  // Finding incomplete rows - returning array of closers
  testRow = '[({(<(())[]>[[{[]{<()<>>';
  expectedResult = [ '}', '}', ']', ']', ')', '}', ')', ']' ];
  actualResult = getFirstIllegalCharOrExpectedClosers(testRow);

  if (!objectsEqual(expectedResult,actualResult)) {
    throw `testGetFirstIllegalCharOrExpectedClosers failed. actualResult: ${actualResult}`;
  }

  testRow = '[(()[<>])]({[<{<<[]>>(';
  expectedResult = [ ')', '}', '>', ']', '}', ')' ];
  actualResult = getFirstIllegalCharOrExpectedClosers(testRow);

  if (!objectsEqual(expectedResult,actualResult)) {
    throw `testGetFirstIllegalCharOrExpectedClosers failed. actualResult: ${actualResult}`;
  }

  testRow = '(((({<>}<{<{<>}{[]{[]{}';
  expectedResult = [ '}', '}', '>', '}', '>', ')', ')', ')', ')' ];
  actualResult = getFirstIllegalCharOrExpectedClosers(testRow);

  if (!objectsEqual(expectedResult,actualResult)) {
    throw `testGetFirstIllegalCharOrExpectedClosers failed. actualResult: ${actualResult}`;
  }

  testRow = '{<[[]]>}<{[{[{[]{()[[[]'
  expectedResult = [ ']', ']', '}', '}', ']', '}', ']', '}', '>' ];
  actualResult = getFirstIllegalCharOrExpectedClosers(testRow);

  if (!objectsEqual(expectedResult,actualResult)) {
    throw `testGetFirstIllegalCharOrExpectedClosers failed. actualResult: ${actualResult}`;
  }

  testRow = '<{([{{}}[<[[[<>{}]]]>[]]'
  expectedResult = [ ']', ')', '}', '>' ];
  actualResult = getFirstIllegalCharOrExpectedClosers(testRow);

  if (!objectsEqual(expectedResult,actualResult)) {
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

  scores = [4482697,7301418,8573122,22461412,22755369,26918282,43621532,117072847,307765616,325616624,405839734,456948292,551474838,651368598,793727217,927234116,1042847661,1195805414,1770511739,2014368668,2087015622,2747832462,2898263486,3003245792,3267293618,3269365189,3402223083,3514946089,4087421417,4217912234,4222552989,4286092414,4358402968,4514277188,4706073994,4729132243,5318274741,5706246214,5738948116,5760427996,7761535567,7974562294,8899015368,11815823423,14133467339,16590349291,17948202161,21654103124,21845682958,21870273349,22837011082];
  expectedResult = 3269365189;
  actualResult = getMiddleScore(scores);

  if (expectedResult !== actualResult) {
    throw `testGetCompletionScoreForClosers failed. actualResult: ${actualResult}`;
  }


  console.log('Completed run of testGetMiddleScore successfully')
}
