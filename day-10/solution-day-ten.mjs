import { sortIntsAsc, reverseArray } from '../common/array-utils.mjs';
import { getContents } from '../common/file-utils.mjs';
import { objectsEqual } from '../common/utils.mjs';

console.log(getSyntaxErrorScore()); // 464991
console.log(getMiddleCompletionStringScore()); // 3662008566

function getSyntaxErrorScore(returnLimit = null) {
  const rows = getContents('day-10/input.txt', returnLimit);
  const illegalChars = getIllegalCharsFromRows(rows);
  return calculateSyntaxErrorScore(illegalChars);
}

function getMiddleCompletionStringScore(returnLimit = null) {
  const rows = getContents('day-10/input.txt', returnLimit);
  const completionScores = getCompletionScoresForRows(rows);
  return getMiddleScore(completionScores);
}

function getCompletionScoresForRows(rows) {
  let corruptedRows = 0; // for verification
  let completionScores = [];

  rows.forEach(row => {
    const result = getFirstIllegalCharOrExpectedClosers(row);
    if (Array.isArray(result)) {
      // ignore corrupted rows - only deal with result if is array of closers
      completionScores.push(getCompletionScoreForClosers(result));
    } else {
      corruptedRows++;
    }
  });

  // Sanity check
  if (corruptedRows + completionScores.length !== rows.length) {
    throw `We lost some rows. ${corruptedRows} + ${completionScores.length} !== ${rows.length}`;
  }

  return completionScores;
}

// tested
function getMiddleScore(completionScores) {
  const middleIndex = Math.floor(completionScores.length / 2);
  return (completionScores.sort(sortIntsAsc))[middleIndex];
}

// tested
function getCompletionScoreForClosers(expectedClosers) {
  const pointsPerChar = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4,
  }

  let completionScore = 0;
  expectedClosers.forEach(element => {
    if (Object.keys(pointsPerChar).indexOf(element) < 0) {
      throw `Error: invalid char in getCompletionScoreForClosers input object: ${JSON.stringify(expectedClosers)}`;
    }
    completionScore = (completionScore * 5) + pointsPerChar[element];
  });
  return completionScore;
}

function getIllegalCharsFromRows(rows) {
  let illegalCharCounts = { 
    ')': 0,
    ']': 0,
    '}': 0,
    '>': 0,
  };

  rows.forEach(row => {
    const firstIllegalChar = getFirstIllegalCharOrExpectedClosers(row);
    if (typeof firstIllegalChar === 'string') { 
      illegalCharCounts[firstIllegalChar]++;
    }
  });

  return illegalCharCounts;
}

function calculateSyntaxErrorScore(illegalCharCounts) {
  const pointsPerChar = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  }

  if (!objectsEqual(Object.keys(illegalCharCounts), Object.keys(pointsPerChar))) {
    throw `Error: mismatch of keys in calculateSyntaxErrorScore. input object: ${JSON.stringify(illegalCharCounts)}`;
  }

  let total = 0;
  Object.keys(illegalCharCounts).forEach(char => {
    total += illegalCharCounts[char] * pointsPerChar[char];
  });
  return total;
}

function getOpenerCloserMap() {
  return  {
    '{': '}',
    '(': ')',
    '[': ']',
    '<': '>',
  };
}

function getFirstIllegalCharOrExpectedClosers(row) {
  const openerCloserMap = getOpenerCloserMap();
  
  const openers = Object.keys(openerCloserMap);
  
  const chars = row.split('').filter(val => val != '\r');
  let expectedClosers = [];

  for (const char of chars) {
    if(openers.indexOf(char) > -1) {
      // add the closer we will look for later
      expectedClosers.push(openerCloserMap[char]);
    } else {
      // grab the most recently added closer
      let expectedCloser = expectedClosers.pop();
      // if they don't match, we have an illegal char
      if (char !== expectedCloser) {
        return char;
      }
    }
  }
  return reverseArray(expectedClosers);
}

export { getFirstIllegalCharOrExpectedClosers, getCompletionScoreForClosers, getMiddleScore };