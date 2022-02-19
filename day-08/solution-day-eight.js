const arrayUtils = require('../common/array-utils.js');
const fileUtils = require('../common/file-utils.js');
const utils = require('../common/utils.js');

//console.log(getCountOfEasyDigitsInOutputValues()); // 495
//console.log(getSumOfOutputValues()); // 1055164
runTests();

function getCountOfEasyDigitsInOutputValues(returnLimit = null) {
  const notes = fileUtils.getContents('day-08/input.txt', returnLimit);
  return getEasyDigitCountFromNotes(notes);
}

// tested
function getEasyDigitCountFromNotes(notes) {
  let easyDigitCount = 0;
  notes.forEach(note => {
    const [ _signalPatterns, output ] = prepNote(note, includeSignalPatterns = false);
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
  const signalPatterns = utils.splitStringOnSpaces(signalPatternsRaw);
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
  return utils.splitStringOnSpaces(outputRaw);
}

function getEasyDigitCountFromOutput(output) {
  return (output.filter(str => isEasyDigit(str.length))).length;
}

function isEasyDigit(strLen) {
  return strLen !== 0 && (strLen < 5 || strLen > 6);
}

function getSumOfOutputValues(returnLimit = null) {
  const notes = fileUtils.getContents('day-08/input.txt', returnLimit);
  let outputValueSum = 0;
  notes.forEach(note => {
    outputValueSum += getOutputValueForNote(note);
  });
  return outputValueSum;
}

function getOutputValueForNote(note) {
  const [ signalPatterns, output ] = prepNote(note, includeSignalPatterns = true);
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
      throw `Error: undefined digitValue for ${utils.alphabetizeString(digit)} against ${JSON.stringify(segmentTranslation)}`;
    }
    outputDigits.push(digitValue);
  });
  return parseInt(outputDigits.join(''));
}

// tested
function prepSegmentTranslation(signalPatterns) {
  let segmentMap = {};
  const pointsToA = arrayUtils.getComplementOfArray(signalPatterns[3][0], signalPatterns[2][0]);
  segmentMap[pointsToA] = 'a';

  const diffTwoFour = arrayUtils.getComplementOfArray(signalPatterns[4][0], signalPatterns[2][0]);
  const diffSixesSeven = getDiffOfSevenAndLenSixes(signalPatterns);
  const pointsToD = arrayUtils.getIntersectionOfArrays(diffSixesSeven, diffTwoFour);
  segmentMap[pointsToD] = 'd';
  const pointsToB = arrayUtils.getComplementOfArray(diffTwoFour, pointsToD);
  segmentMap[pointsToB] = 'b';

  const lenFiveArrayWithB = arrayUtils.getArraysWithValue(signalPatterns[5], pointsToB.toString())[0];
  const justFG = arrayUtils.getComplementOfArray(lenFiveArrayWithB, Object.keys(segmentMap));

  const pointsToG = arrayUtils.getComplementOfArray(justFG, signalPatterns[2][0]);
  segmentMap[pointsToG] = 'g';
  const pointsToF = arrayUtils.getComplementOfArray(justFG, pointsToG.toString());
  segmentMap[pointsToF] = 'f';
  const pointsToC = arrayUtils.getComplementOfArray(signalPatterns[2][0], pointsToF.toString());
  segmentMap[pointsToC] = 'c';
  const pointsToE = arrayUtils.getComplementOfArray(signalPatterns[7][0], Object.keys(segmentMap));
  segmentMap[pointsToE] = 'e';

  return segmentMap;
}

// tested in testPrepSegmentTranslation
function getDiffOfSevenAndLenSixes(signalPatterns) {
  let diffOfLenSixesAndSeven = [];
  signalPatterns[6].forEach(element => {
    let value = arrayUtils.getComplementOfArray(signalPatterns[7][0], element)
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


/***** TESTS *****/
function runTests() {
  testGetEasyDigitCountFromNotes();
  testPrepSignalPatterns();
  testPrepSegmentTranslation();
}

function testGetEasyDigitCountFromNotes() {
  const testNotes = [
    'cdgeb cd cdb gfecbda adgcbe bcdfag aecd bfceg edbfga agdbe | bdc dbeacg dceabg gcedb',
    'ae cdbeg gefcdb eca ebgfac dcbafeg deag abcde facbd becadg | aec cbaedg aec deag',
    'gabfc cdfbe ea dbcfeag aebfgc befagd ebfac aeb gaec bagdfc | ea gbadfc dgbfca decbf',
    'bcad cd cfbge cegabdf fcdeb defabc gebadf fdc adfbe ecadfg | dc fcd egdcfa dc',
    'begcda cbf egacb fc ebcaf baefd gabdfc gfce gaecfb acgdfeb | bdegfca cf fc acbdeg',
  ];
  let expectedResult = 11;
  let actualResult = getEasyDigitCountFromNotes(testNotes);

  if (expectedResult !== actualResult) {
    throw `testGetEasyDigitCountFromNotes failed with ${JSON.stringify(notes)}. actualResult: ${actualResult}`;
  }

  console.log('Completed run of testGetEasyDigitCountFromNotes successfully')
}

function testPrepSignalPatterns() {
  let input = 'cdgeb cd cdb gfecbda adgcbe bcdfag aecd bfceg edbfga agdbe';
  let expectedResult = {
    2: [ [ 'c', 'd' ] ],
    3: [ [ 'c', 'd', 'b' ] ],
    4: [ [ 'a', 'e', 'c', 'd' ] ],
    5: [ 
      [ 'c', 'd', 'g', 'e', 'b' ],
      [ 'b', 'f', 'c', 'e', 'g' ],
      [ 'a', 'g', 'd', 'b', 'e' ],
    ],
    6: [ 
      [ 'a', 'd', 'g', 'c', 'b', 'e' ],
      [ 'b', 'c', 'd', 'f', 'a', 'g' ],
      [ 'e', 'd', 'b', 'f', 'g', 'a' ],
    ],
    7: [ [ 'g', 'f', 'e', 'c', 'b', 'd', 'a' ] ]
  };
  let actualResult = prepSignalPatterns(input);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `testPrepSignalPatterns failed with ${input}. actualResult: ${JSON.stringify(actualResult)}`;
  }

  input = 'ae cdbeg gefcdb eca ebgfac dcbafeg deag abcde facbd becadg';
  expectedResult = {
    2: [ [ 'a', 'e' ] ],
    3: [ [ 'e', 'c', 'a' ] ],
    4: [ [ 'd', 'e', 'a', 'g' ] ],
    5: [ 
      [ 'c', 'd', 'b', 'e', 'g' ],
      [ 'a', 'b', 'c', 'd', 'e' ],
      [ 'f', 'a', 'c', 'b', 'd' ],
    ],
    6: [ 
      [ 'g', 'e', 'f', 'c', 'd', 'b' ],
      [ 'e', 'b', 'g', 'f', 'a', 'c' ],
      [ 'b', 'e', 'c', 'a', 'd', 'g' ],
    ],
    7: [ [ 'd', 'c', 'b', 'a', 'f', 'e', 'g' ] ]
  };
  actualResult = prepSignalPatterns(input);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `testPrepSignalPatterns failed with ${input}. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testPrepSignalPatterns successfully')
}

function testPrepSegmentTranslation() {
  const note = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf';
  const [ signalPatterns, output ] = prepNote(note, includeSignalPatterns = true);
  const expectedSegmentTranslation = {
    'd': 'a',
    'e': 'b',
    'a': 'c',
    'f': 'd',
    'g': 'e',
    'b': 'f',
    'c': 'g',
  }
  let actualSegmentTranslation = prepSegmentTranslation(signalPatterns);

  if (!utils.objectsEqual(expectedSegmentTranslation, actualSegmentTranslation)) {
    throw `testPrepSegmentTranslation failed. actualResult: ${JSON.stringify(actualSegmentTranslation)}`;
  }

  console.log('Completed run of testPrepSegmentTranslation successfully')
}