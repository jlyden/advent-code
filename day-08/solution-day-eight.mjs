import { getArraysWithValue, getComplementOfArray, getIntersectionOfArrays } from '../common/array-utils.mjs';
import { getContents } from '../common/file-utils.mjs';
import { splitStringOnSpaces } from '../common/utils.mjs';

console.log(getCountOfEasyDigitsInOutputValues()); // 495
console.log(getSumOfOutputValues()); // 1055164

function getCountOfEasyDigitsInOutputValues(returnLimit = null) {
  const notes = getContents('day-08/input.txt', returnLimit);
  return getEasyDigitCountFromNotes(notes);
}

// tested
function getEasyDigitCountFromNotes(notes) {
  let easyDigitCount = 0;
  notes.forEach(note => {
    const [ _signalPatterns, output ] = prepNote(note, false);
    easyDigitCount += getEasyDigitCountFromOutput(output);
  });
  return easyDigitCount;
}

// If !includeSignalPatterns, return [] for signal patterns instead of doing work
function prepNote(note, includeSignalPatterns = false) {
  const [ signalPatternsRaw, outputRaw ] = note.split('|');
  const output = prepOutput(outputRaw);
  const signalPatterns = includeSignalPatterns ? prepSignalPatterns(signalPatternsRaw) : [];
  return [ signalPatterns, output];
}

// tested
function prepSignalPatterns(signalPatternsRaw) {
  const signalPatterns = splitStringOnSpaces(signalPatternsRaw);
  let sortedSignalPatterns = {
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
  };
  signalPatterns.forEach(signalString => {
    const signals = signalString.split('');
    sortedSignalPatterns[signals.length].push(signals);
  });
  return sortedSignalPatterns;
}

function prepOutput(outputRaw) {
  return splitStringOnSpaces(outputRaw);
}

function getEasyDigitCountFromOutput(output) {
  return (output.filter(str => isEasyDigit(str.length))).length;
}

function isEasyDigit(strLen) {
  return strLen !== 0 && (strLen < 5 || strLen > 6);
}

function getSumOfOutputValues(returnLimit = null) {
  const notes = getContents('day-08/input.txt', returnLimit);
  let outputValueSum = 0;
  notes.forEach(note => {
    outputValueSum += getOutputValueForNote(note);
  });
  return outputValueSum;
}

function getOutputValueForNote(note) {
  const includeSignalPatterns = true;
  const [ signalPatterns, output ] = prepNote(note, includeSignalPatterns);
  const segmentTranslation = prepSegmentTranslation(signalPatterns);
  return getOutputValue(output, segmentTranslation);
}

// TODO: test?
function getOutputValue(output, segmentTranslation) {
  const LEN_TO_EASY_DIGIT_MAP = {
    2: 1,
    3: 7,
    4: 4,
    7: 8,
  }
  let outputDigits = [];

  output.forEach(digit => {
    const digitLen = digit.length;
    let digitValue = isEasyDigit(digitLen)
      ? LEN_TO_EASY_DIGIT_MAP[digitLen]
      : getDigitValue(digit, segmentTranslation);

    if (digitValue == null) {
      throw `Error: undefined digitValue for ${digit} against ${JSON.stringify(segmentTranslation)}`;
    }
    outputDigits.push(digitValue);
  });
  return parseInt(outputDigits.join(''));
}

// tested
function prepSegmentTranslation(signalPatterns) {
  let segmentMap = {};
  const pointsToA = getComplementOfArray(signalPatterns[3][0], signalPatterns[2][0]);
  segmentMap[pointsToA] = 'a';

  const diffTwoFour = getComplementOfArray(signalPatterns[4][0], signalPatterns[2][0]);
  const diffSixesSeven = getDiffOfSevenAndLenSixes(signalPatterns);
  const pointsToD = getIntersectionOfArrays(diffSixesSeven, diffTwoFour);
  segmentMap[pointsToD] = 'd';
  const pointsToB = getComplementOfArray(diffTwoFour, pointsToD);
  segmentMap[pointsToB] = 'b';

  const lenFiveArrayWithB = getArraysWithValue(signalPatterns[5], pointsToB.toString())[0];
  const justFG = getComplementOfArray(lenFiveArrayWithB, Object.keys(segmentMap));

  const pointsToG = getComplementOfArray(justFG, signalPatterns[2][0]);
  segmentMap[pointsToG] = 'g';
  const pointsToF = getComplementOfArray(justFG, pointsToG.toString());
  segmentMap[pointsToF] = 'f';
  const pointsToC = getComplementOfArray(signalPatterns[2][0], pointsToF.toString());
  segmentMap[pointsToC] = 'c';
  const pointsToE = getComplementOfArray(signalPatterns[7][0], Object.keys(segmentMap));
  segmentMap[pointsToE] = 'e';

  return segmentMap;
}

// tested in testPrepSegmentTranslation
function getDiffOfSevenAndLenSixes(signalPatterns) {
  let diffOfLenSixesAndSeven = [];
  signalPatterns[6].forEach(element => {
    let value = getComplementOfArray(signalPatterns[7][0], element)
    diffOfLenSixesAndSeven.push(value);
  });
  return diffOfLenSixesAndSeven.flat();
}

function getDigitValue(digit, segmentTranslation) {
  const digitArray = digit.split('');
  const digitArrayLen = digitArray.length;
  for(let i=0; i<digitArrayLen; i++) {
    let key = digitArray.shift();
    let value = segmentTranslation[key];
    if (['a','g'].includes(value)) {
      // no op
    } else if (digitArrayLen === 6 && ['b','f'].includes(value)) {
      // no op
    } else {
      digitArray.push(value);
    }
  }
  const shortDigit = digitArray.sort().join('');
  return transformShortDigit(shortDigit, digitArrayLen);
}

function transformShortDigit(shortDigit, originalDigitLength) {
  // dropped a,g
  const SEGMENT_TO_DIGIT_MAP_FIVES = {
    'bdf': 5,
    'cde': 2,
    'cdf': 3,
  }

  // dropped a,g,b,f
  const SEGMENT_TO_DIGIT_MAP_SIXES = {
    'cd': 9,
    'ce': 0,
    'de': 6,
  }

  const result = originalDigitLength === 5 ? SEGMENT_TO_DIGIT_MAP_FIVES[shortDigit] : SEGMENT_TO_DIGIT_MAP_SIXES[shortDigit];
  return result;
}

export { getEasyDigitCountFromNotes, prepSignalPatterns, prepSegmentTranslation, prepNote };
