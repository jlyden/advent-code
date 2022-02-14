const arrayUtils = require('../common/array-utils.js');
const fileUtils = require('../common/file-utils.js');
const utils = require('../common/utils.js');

console.log(getCountOfEasyDigitsInOutputValues()); // 495
console.log(getSumOfOutputValues()); // 784783 - too low
runTests();

function getCountOfEasyDigitsInOutputValues(returnLimit = null) {
  const notes = fileUtils.getContents('day-08/input.txt', returnLimit);
  return getEasyDigitCountFromNotes(notes);
}

// tested
function getEasyDigitCountFromNotes(notes) {
  let easyDigitCount = 0;
  notes.forEach(note => {
    const [ signalPatterns, output ] = prepNote(note, includeSignalPatterns = false);
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
  let signalPatterns = utils.splitStringOnSpaces(signalPatternsRaw);
  return prepSignalPatternsForAnalysis(signalPatterns);
}

// tested (covered by prepSignalPatterns)
function prepSignalPatternsForAnalysis(signalPatterns) {
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
  const digitMap = prepDigitMap(signalPatterns);

  return getOutputValue(output, digitMap)
}

// TODO: test?
function getOutputValue(output, digitMap) {
  const LEN_TO_EASY_DIGIT_MAP = {
    2: 1,
    3: 7,
    4: 4,
    7: 8,
  }
  let outputDigits = [];

  output.forEach(digit => {
    const digitLen = digit.length;
    isEasyDigit(digitLen)
      ? outputDigits.push(LEN_TO_EASY_DIGIT_MAP[digitLen])
      : outputDigits.push(digitMap[utils.alphabetizeString(digit)]);
  });
  return parseInt(outputDigits.join(''));
}

function prepDigitMap(signalPatterns) {
  const segmentMap = prepSegmentMap(signalPatterns);
  return prepNoteSegmentToDigitMap(segmentMap);
}

// tested
function prepSegmentMap(signalPatterns) {
  let segmentMap = {};
  segmentMap.a = arrayUtils.getComplementOfArray(signalPatterns[3][0], signalPatterns[2][0]);

  const diffTwoFour = arrayUtils.getComplementOfArray(signalPatterns[4][0], signalPatterns[2][0]);
  const diffSixesSeven = getDiffOfSevenAndLenSixes(signalPatterns);
  segmentMap.d = arrayUtils.getIntersectionOfArrays(diffSixesSeven, diffTwoFour);
  segmentMap.b = arrayUtils.getComplementOfArray(diffTwoFour, segmentMap.d);

  const lenFiveArrayWithB = arrayUtils.getArraysWithValue(signalPatterns[5], segmentMap.b.toString())[0];
  const justFG = arrayUtils.getComplementOfArray(lenFiveArrayWithB, Object.values(segmentMap).flat());
  segmentMap.g = arrayUtils.getComplementOfArray(justFG, signalPatterns[2][0]);
  segmentMap.f = arrayUtils.getComplementOfArray(justFG, segmentMap.g);
  segmentMap.c = arrayUtils.getComplementOfArray(signalPatterns[2][0], segmentMap.f);
  segmentMap.e = arrayUtils.getComplementOfArray(signalPatterns[7][0], Object.values(segmentMap).flat());

  // credit: https://stackoverflow.com/a/38829074
  return Object.fromEntries(Object.entries(segmentMap).map(([k, v]) => [k, v[0]]));
}

// tested in testPrepSegmentMap
function getDiffOfSevenAndLenSixes(signalPatterns) {
  let diffOfLenSixesAndSeven = [];
  signalPatterns[6].forEach(element => {
    let value = arrayUtils.getComplementOfArray(signalPatterns[7][0], element)
    diffOfLenSixesAndSeven.push(value);
  });
  return diffOfLenSixesAndSeven.flat();
}

// TODO: test
function prepNoteSegmentToDigitMap(segmentMap) {
  const TRICKY_SEGMENT_TO_DIGIT_MAP = {
    'abdfg': 5,
    'acdeg': 2,
    'acdfg': 3,
    'abcdfg': 9,
    'abcefg': 0,
    'abdefg': 6,
  }
    
  let noteSegmentToDigitMap = {
    ...TRICKY_SEGMENT_TO_DIGIT_MAP
  };

  // loop and replace
  for (const [oldKey, value] of Object.entries(noteSegmentToDigitMap)) {
    let newKey = '';
    for (let char of oldKey) {
      newKey += segmentMap[char];
    }
    newKey = utils.alphabetizeString(newKey);
    noteSegmentToDigitMap[newKey] = value;
    delete noteSegmentToDigitMap[oldKey];
  }

  return noteSegmentToDigitMap;
}


/***** TESTS *****/
function runTests() {
  testGetEasyDigitCountFromNotes();
  testPrepSignalPatterns();
  testPrepSegmentMap();
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

function testPrepSegmentMap() {
  const note = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf';
  const [ signalPatterns, output ] = prepNote(note, includeSignalPatterns = true);
  const expectedSegmentMap = {
    'a': 'd',
    'b': 'e',
    'c': 'a',
    'd': 'f',
    'e': 'g',
    'f': 'b',
    'g': 'c',
  }
  actualResult = prepSegmentMap(signalPatterns);

  if (!utils.objectsEqual(expectedSegmentMap, actualResult)) {
    throw `testPrepSegmentMap failed. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testPrepSegmentMap successfully')
}