import { objectsEqual } from '../common/utils.mjs';
import { getEasyDigitCountFromNotes, prepSignalPatterns, prepSegmentTranslation, prepNote } from './solution-day-eight.mjs';

runTests();

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

  if (!objectsEqual(expectedResult, actualResult)) {
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

  if (!objectsEqual(expectedResult, actualResult)) {
    throw `testPrepSignalPatterns failed with ${input}. actualResult: ${JSON.stringify(actualResult)}`;
  }

  console.log('Completed run of testPrepSignalPatterns successfully')
}

function testPrepSegmentTranslation() {
  const includeSignalPatterns = true;
  const note = 'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf';
  const [ signalPatterns, output ] = prepNote(note, includeSignalPatterns);
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

  if (!objectsEqual(expectedSegmentTranslation, actualSegmentTranslation)) {
    throw `testPrepSegmentTranslation failed. actualResult: ${JSON.stringify(actualSegmentTranslation)}`;
  }

  console.log('Completed run of testPrepSegmentTranslation successfully')
}

