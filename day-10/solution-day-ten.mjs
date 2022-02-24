import { getContents } from '../common/file-utils.mjs';
import { objectsEqual } from '../common/utils.mjs';

console.log(getSyntaxErrorScore());

function getSyntaxErrorScore(returnLimit = null) {
  const rows = getContents('day-10/input-small.txt', returnLimit);
  const illegalChars = getIllegalCharsFromRows(rows);
  return calculateSyntaxErrorScore(illegalChars);
}

function getIllegalCharsFromRows(rows) {
  let illegalCharCounts = { 
    ')': 0,
    ']': 0,
    '}': 0,
    '>': 0,
  };

  rows.forEach(row => {
    const firstIllegalChar = getFirstIllegalChar(row);
    if (firstIllegalChar) { 
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
  return 
}

const openerCloserMap = {
  '{': '}',
  '(': ')',
  '[': ']',
  '<': '>',
}

const openers = Object.keys(openerCloserMap);

function getFirstIllegalChar(row) {
  const chars = row.split('');
  let expectedClosers = [];

  for (const char of chars) {
    if(isOpener(char)) {
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
}

function isOpener(char) {
  return openers.indexOf(char) > -1;
}

export { getFirstIllegalChar };