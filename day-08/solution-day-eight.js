const arrayUtils = require('../common/array-utils.js');
const fileUtils = require('../common/file-utils.js');
const utils = require('../common/utils.js');

//console.log(getCountOfEasyDigitsInOutputValues()); // 495
//getSumOfOutputValues(1);
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

function prepOutput(outputRaw) {
  return utils.splitStringOnSpaces(outputRaw);
}

function getEasyDigitCountFromOutput(output) {
  return (output.filter(str => isEasyDigit(str))).length;
}

function isEasyDigit(str) {
  /* For context, not used
  const SEG_TO_DIGIT_MAP = {
    2: 1,
    3: 7,
    4: 4,
    7: 8,
    5: [2,3,5],
    6: [0,6,9],
  }
  */
  const strLen = str.length;
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

  // get signal value mapping for note
  const segmentMap = prepSegmentMap(signalPatterns);

  // get output value digits

  // return output value as an int
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

const DIGIT_TO_SEGMENTS_MAP = {
  //digit: code // length
  1: 'CF',      //2
  7: 'ACF',     //3
  4: 'BCDF',    //4

  5: 'ABDFG',   //5
  2: 'ACDEG',   //5
  3: 'ACDFG',   //5

  9: 'ABCDFG',  //6
  0: 'ABCEFG',  //6
  6: 'ABDEFG',  //6

  8: 'ABCDEFG', //7
}

// tested
function prepSegmentMap(signalPatterns) {
  let segmentMap = {};
  // 1 = 'CF' (len 2)
  // 7 = 1 + 'A', so whatever is left after intersection of 7 and 1 === 'A' (len 3)
  segmentMap.a = arrayUtils.getComplementOfArray(signalPatterns[3][0], signalPatterns[2][0])[0];

  // 4 (len 4) = 1 (len 2) + 'BD'
  const diffTwoFour = arrayUtils.getComplementOfArray(signalPatterns[4][0], signalPatterns[2][0]);

  // 9,0,6 all len 6; 8 len 7
  // 6 = 8 - 'C'
  // 0 = 8 - 'D'
  // 9 = 8 - 'E'
  // diff of 6s + 7 = 'CDE'
  let diffOfLenSixesAndSeven = [];
  signalPatterns[6].forEach(element => {
    let value = arrayUtils.getComplementOfArray(signalPatterns[7][0], element)
    diffOfLenSixesAndSeven.push(value);
  });
  const diffSixesSeven = diffOfLenSixesAndSeven.flat();

  // intersection of diff24 and diff6s7 = 'D'
  segmentMap.d = arrayUtils.getIntersectionOfArrays(diffSixesSeven, diffTwoFour)[0];

  // diff24 - segmentMap['d'] = 'B'
  segmentMap.b = arrayUtils.getComplementOfArray(diffTwoFour, segmentMap.d)[0];

  // get 'ABDFG'
  const lenFiveArrayWithB = arrayUtils.getArraysWithValue(signalPatterns[5], segmentMap.b.toString())[0];
  // pull out ABD (left with 'FG')
  const justFG = arrayUtils.getComplementOfArray(lenFiveArrayWithB, Object.values(segmentMap).flat());
  // pull out value NOT in 'CF' = 'G'
  segmentMap.g = arrayUtils.getComplementOfArray(justFG, signalPatterns[2][0])[0];

  // justFG - segmentMap['g'] = 'F'
  segmentMap.f = arrayUtils.getComplementOfArray(justFG, segmentMap.g)[0];

  // 1 = 'CF' (len 2) - segmentMap['f'] = 'C'
  segmentMap.c = arrayUtils.getComplementOfArray(signalPatterns[2][0], segmentMap.f)[0];

  segmentMap.e = arrayUtils.getComplementOfArray(signalPatterns[7][0], Object.values(segmentMap).flat())[0];

  return segmentMap;
}


/***** TESTS *****/
function runTests() {
//  testGetEasyDigitCountFromNotes();
//  testPrepSignalPatterns();
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