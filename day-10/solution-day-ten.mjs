import { getContents } from '../common/file-utils.mjs';
import { objectsEqual } from '../common/utils.mjs';

console.log(getSyntaxErrorScore()); // 464991

function getSyntaxErrorScore(returnLimit = null) {
  const rows = getContents('day-10/input.txt', returnLimit);
  const illegalChars = getIllegalCharsFromRows(rows);
  return calculateSyntaxErrorScore(illegalChars);
}

function getMiddleCompletionStringScore(returnLimit = null) {
  const rows = getContents('day-10/input.txt', returnLimit);
  const completionStrings = getCompletionStringsForRows(rows);
  // get score for each completion string
  // sort and return middle score
}

function getCompletionStringsForRows(rows) {
  let completionStrings = [];

  rows.forEach(row => {
    const result = getFirstIllegalCharOrExpectedClosers(row);
    const expectedClosers = Array.isArray(result) ? result : null;
    // ignore corrupted rows - only deal with result if is array of closers
    if (expectedClosers) { 
      completionStrings.push.expectedClosers;
    }
  }); 
  return completionStrings;
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
  return expectedClosers;
}

export { getFirstIllegalCharOrExpectedClosers };