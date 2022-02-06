const fileUtils = require('../common/file-utils.js');
const utils = require('../common/utils.js');

//console.log(getCountOfEasyDigitsInOutputValues()); // 495
getSumOfOutputValues(3);
//runTests();

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

// TODO: write test
function prepSignalPatterns(signalPatternsRaw) {
  let signalPatterns = splitStringBySpaces(signalPatternsRaw);
  return prepSignalPatternsForAnalysis(signalPatterns);
}

function prepOutput(outputRaw) {
  return splitStringBySpaces(outputRaw);
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

const DIGIT_TO_SEGMENTS_MAP = {
  1: 'cf',
  7: 'acf',
  4: 'bdcf',
  5: 'abdfg',
  2: 'acdeg',
  3: 'acdfg',
  9: 'abcdfg',
  0: 'abcefg',
  6: 'abdefg',
  8: 'abcdefg',
}

function getOutputValueForNote(note) {
  const [ signalPatterns, output ] = prepNote(note, includeSignalPatterns = true);

  console.log(JSON.stringify(signalPatterns));
  // get signal value mapping for note

  // get output value digits

  // return output value as an int
}

// TODO: move to utils and remove dups in sol*.js
function splitStringBySpaces(str) {
  return str.split(/\s+/).filter(str => str.length > 0);
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
  signalPatterns.forEach(signals => {
    const sortedSignal = utils.sortStringByLetters(signals);
    sortedSignalPatterns[sortedSignal.length].push(sortedSignal);
  });
  return sortedSignalPatterns;
}

/***** TESTS *****/
function runTests() {
  testGetEasyDigitCountFromNotes();
  testPrepSignalPatterns();
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
    2: [ 'cd' ],
    3: [ 'bcd' ],
    4: [ 'acde' ],
    5: [ 'bcdeg', 'bcefg', 'abdeg' ],
    6: [ 'abcdeg', 'abcdfg', 'abdefg' ],
    7: [ 'abcdefg' ]
  };
  let actualResult = prepSignalPatterns(input);

  if (!utils.objectsEqual(expectedResult, actualResult)) {
    throw `testPrepSignalPatterns failed with ${input}. actualResult: ${JSON.stringify(actualResult)}`;
  }

  input = 'ae cdbeg gefcdb eca ebgfac dcbafeg deag abcde facbd becadg';




  console.log('Completed run of testPrepSignalPatterns successfully')
}