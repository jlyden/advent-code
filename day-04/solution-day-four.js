const fileUtils = require('../common/file-utils.js');
const testUtils = require('../common/test-utils.js');

const STAR = -1;

//console.log(getScoreOfWinningBingoBoard(returnFirst = true));
//console.log(getScoreOfWinningBingoBoard(returnFirst = false));
runTests();

/**
 * @param returnFirst bool true to return first winning board; false to return last
 * @param returnLimit number | null 
 * @returns number
 */
function getScoreOfWinningBingoBoard(returnFirst = true, returnLimit = null) {
  try {
    const inputFileContents = fileUtils.getContents('day-04/input.txt', returnLimit);
    const [ calledNumbers, bingoBoards ] = prepareDataObjects(inputFileContents);
    const [ lastNumberCalled, winningBoard ] = findWinningBoard(calledNumbers, bingoBoards, returnFirst);
    return calculateWinningBoardScore(lastNumberCalled, winningBoard);
  } catch(error) {
    console.log(error)
  }
}

function prepareDataObjects(contents) {
  // First row is comma-delimited string of numbers
  const calledNumbers = (contents.shift()).split(',').map(num => parseInt(num));

  const bingoBoards = prepareBingoBoards(contents);
  return [ calledNumbers, bingoBoards ];
}

function prepareBingoBoards(fullArray) {
  const fullArrayLen = fullArray.length;
  const chunkSize = 6; // blank row precedes 5 rows of numbers
  let bingoBoards = [];

  for (let i=0; i<fullArrayLen; i+=chunkSize) {
    let chunk = fullArray.slice(i, i+chunkSize);
    let boardData = prepBoardData(chunk);
    bingoBoards.push(boardData);
  }
  
  return bingoBoards;
}

// tested
function prepBoardData(chunk) {
  let blankRow = chunk.shift(); // remove leading blank row (empty array)
  if (blankRow.length > 0) {
    throw `Error: Blank row was not - check line endings; blankRow = ${blankRow}`;
  }

  let board = [];
  chunk.forEach(row => {
    board.push(row.split(/\s+/).filter(char => char.length > 0).map(num => parseInt(num)));
  });

  if (board.length !== 5) {
    throw `Board assembly failed: i = ${i}; board = ${JSON.stringify(board)}`;
  }

  let boardData = {
    starCount: 0,
    board,
    alreadyWon: false,
  }
  return boardData;
}

/**
 * @param calledNumbers number[]
 * @param bingoBoards boardData[]
 * @param returnFirst bool true to return first winning board; false to return last
 * @returns 
 */
function findWinningBoard(calledNumbers, bingoBoards, returnFirst) {
  const bingoBoardsLen = bingoBoards.length;
  let winningBoardCount = 0;

  // loop through numbers
  for (let num of calledNumbers) {

    // loop through boards
    for (let boardData of bingoBoards) {

      boardData = updateBoardDataForCalledNumber(boardData, num);

      if (!boardData.alreadyWon && boardData.starCount > 4) {
        const isWinner = checkForWinner(boardData.board);
        if (isWinner) {
          boardData.alreadyWon = true;
          winningBoardCount++;
          if (returnFirst & winningBoardCount > 0) {
            return [ num, boardData.board ];
          } else if (winningBoardCount === bingoBoardsLen) {
            return [ num, boardData.board ];
          }
        }
      }
    }
  }
}

// tested
function updateBoardDataForCalledNumber(boardData, calledNumber) {
  // loop through rows
  boardData.board.forEach(row => {
    // look for calledNumber
    const calledNumberIndex = row.indexOf(calledNumber);

    if (calledNumberIndex !== -1) {
      // change value to -1 (our 'mark') and increment count
      row[calledNumberIndex] = STAR;
      boardData.starCount ++;
    }
  });

  return boardData;
}

// tested
function checkForWinner(board) {
  const rowOfStars = Array(5).fill(STAR);
  const indexesOfStarsByRow = [];

  // Check rows
  for (row of board) {
    if (testUtils.objectsEqual(row, rowOfStars)) {
      // Board is winner because this row is all stars
      return true;
    }

    // Store indexes to use in Column check
    const indexesOfAllStarsInRow = getIndexesOfAllStarsInRow(row, []);
    indexesOfStarsByRow.push(indexesOfAllStarsInRow);
  };

  // Check columns
  return checkForColumnOfStars(indexesOfStarsByRow);
}

// tested
function getIndexesOfAllStarsInRow(row, indexes) {
  const FOUND_STAR = -2;

  const copyOfRow = [ ...row];
  const indexOfStar = copyOfRow.indexOf(STAR);

  if (indexOfStar === -1) {
    return indexes;
  } else {
    indexes.push(indexOfStar);
    copyOfRow[indexOfStar] = FOUND_STAR;
    const atEndOfRow = indexOfStar === (row.length - 1)
    return atEndOfRow ? indexes : getIndexesOfAllStarsInRow(copyOfRow, indexes);
  }
}

// tested
function checkForColumnOfStars(indexesOfStarsByRow) {
  if (indexesOfStarsByRow.length !== 5) {
    throw `Error: getIndexesOfAllStarsInRow input wrong length: ${JSON.stringify(indexesOfStarsByRow)}`;
  }

  const intersectionOfStarIndexes = indexesOfStarsByRow.reduce(findArrayIntersection)

  // A non-empty intersection of all rows' indexesOfStars arrays => Bingo column!
  return intersectionOfStarIndexes.length > 0;
}

// tested (Covered by testCheckForColumnOfStars)
function findArrayIntersection(a, b) {
  // credit: https://medium.com/@alvaro.saburido/set-theory-for-arrays-in-es6-eb2f20a61848
  return a.filter(x => b.includes(x));
}

// tested
function calculateWinningBoardScore(lastNumberCalled, winningBoard) {
  const sumOfUnmarkedNumbers = winningBoard
                                .flat()
                                .filter(value => value !== STAR)
                                .reduce((a,b) => a + b);
  return sumOfUnmarkedNumbers * lastNumberCalled;
}

/***** TESTS *****/
function runTests() {
  testPrepBoardData();
  testUpdateBoardDataForCalledNumber();
  testGetIndexesOfAllStarsInRow();
  testCheckForWinner();
  testCheckForColumnOfStars();
  testCalculateWinningBoardScore();
}

function testPrepBoardData() {
  const testChunk = [
    '',
    '83 11 47 61 45',
    '30 74 73 14 66',
    '53 52 10 57 15',
    '64 50 54 28 87',
    '26 85 63 25 86'
  ];

  const expectedBoardData = {
    starCount: 0,
    board: [
      [ 83, 11, 47, 61, 45 ],
      [ 30, 74, 73, 14, 66 ],
      [ 53, 52, 10, 57, 15 ],
      [ 64, 50, 54, 28, 87 ],
      [ 26, 85, 63, 25, 86 ]
    ],
    alreadyWon: false,
  }

  let actualBoardData = prepBoardData(testChunk);
  if (!testUtils.objectsEqual(expectedBoardData, actualBoardData)) {
    throw `testPrepBoardData failed with testChunk. actualResult: ${JSON.stringify(actualBoardData)}`;
  }

  const testChunkWithZero = [
    '',
    ' 0 11 47 61 45',
    '30 74 73 14 66',
    '53 52 10 57 15',
    '64 50 54 28 87',
    '26 85 63 25 86'
  ];

  const expectedBoardDataWithZero = {
    starCount: 0,
    board: [
      [ 0, 11, 47, 61, 45 ],
      [ 30, 74, 73, 14, 66 ],
      [ 53, 52, 10, 57, 15 ],
      [ 64, 50, 54, 28, 87 ],
      [ 26, 85, 63, 25, 86 ]
    ],
    alreadyWon: false,
  }

  actualBoardData = prepBoardData(testChunkWithZero);
  if (!testUtils.objectsEqual(expectedBoardDataWithZero, actualBoardData)) {
    throw `testPrepBoardData failed with testChunkWithZero. actualResult: ${JSON.stringify(actualBoardData)}`;
  }

  console.log('Completed run of testPrepBoardData successfully')
}

function testUpdateBoardDataForCalledNumber() {
  const testCalledNumbers = [ 83, 5, 45, 50, 25, 10, 14];

  const startingBoardData = {
    starCount: 0,
    board: [
      [ 83, 11, 47, 61, 45 ],
      [ 30, 74, 73, 14, 66 ],
      [ 53, 52, 10, 57, 15 ],
      [ 64, 50, 54, 28, 87 ],
      [ 26, 85, 63, 25, 86 ]
    ],
    alreadyWon: false,
  }

  const expectedBoardDataAfterNumber0 = {
    starCount: 1,
    board: [
      [ -1, 11, 47, 61, 45 ],
      [ 30, 74, 73, 14, 66 ],
      [ 53, 52, 10, 57, 15 ],
      [ 64, 50, 54, 28, 87 ],
      [ 26, 85, 63, 25, 86 ]
    ],
    alreadyWon: false,
  }

  const actualBoardDataAfterNumber0 = updateBoardDataForCalledNumber(startingBoardData, testCalledNumbers[0]);
  if (!testUtils.objectsEqual(expectedBoardDataAfterNumber0, actualBoardDataAfterNumber0)) {
    throw `testUpdateBoardDataForCalledNumber failed on Number0. actualResult: ${JSON.stringify(actualBoardDataAfterNumber0)}`;
  }

  // testCalledNumbers[1] is not on board, so we expect same result as previous number (no change to board)
  const actualBoardDataAfterNumber1 = updateBoardDataForCalledNumber(actualBoardDataAfterNumber0, testCalledNumbers[1]);
  if (!testUtils.objectsEqual(expectedBoardDataAfterNumber0, actualBoardDataAfterNumber1)) {
    throw `testUpdateBoardDataForCalledNumber failed on Number1. actualResult: ${JSON.stringify(actualBoardDataAfterNumber1)}`;
  }

  const expectedBoardDataAfterNumber2 = {
    starCount: 2,
    board: [
      [ -1, 11, 47, 61, -1 ],
      [ 30, 74, 73, 14, 66 ],
      [ 53, 52, 10, 57, 15 ],
      [ 64, 50, 54, 28, 87 ],
      [ 26, 85, 63, 25, 86 ]
    ],
    alreadyWon: false,
  }

  const actualBoardDataAfterNumber2 = updateBoardDataForCalledNumber(actualBoardDataAfterNumber1, testCalledNumbers[2]);
  if (!testUtils.objectsEqual(expectedBoardDataAfterNumber2, actualBoardDataAfterNumber2)) {
    throw `testUpdateBoardDataForCalledNumber failed on Number2. actualResult: ${JSON.stringify(actualBoardDataAfterNumber2)}`;
  }

  const expectedBoardDataAfterNumber3 = {
    starCount: 3,
    board: [
      [ -1, 11, 47, 61, -1 ],
      [ 30, 74, 73, 14, 66 ],
      [ 53, 52, 10, 57, 15 ],
      [ 64, -1, 54, 28, 87 ],
      [ 26, 85, 63, 25, 86 ]
    ],
    alreadyWon: false,
  }

  const actualBoardDataAfterNumber3 = updateBoardDataForCalledNumber(actualBoardDataAfterNumber2, testCalledNumbers[3]);
  if (!testUtils.objectsEqual(expectedBoardDataAfterNumber3, actualBoardDataAfterNumber3)) {
    throw `testUpdateBoardDataForCalledNumber failed on Number4. actualResult: ${JSON.stringify(actualBoardDataAfterNumber3)}`;
  }

  const expectedBoardDataAfterNumber4 = {
    starCount: 4,
    board: [
      [ -1, 11, 47, 61, -1 ],
      [ 30, 74, 73, 14, 66 ],
      [ 53, 52, 10, 57, 15 ],
      [ 64, -1, 54, 28, 87 ],
      [ 26, 85, 63, -1, 86 ]
    ],
    alreadyWon: false,
  }

  const actualBoardDataAfterNumber4 = updateBoardDataForCalledNumber(actualBoardDataAfterNumber3, testCalledNumbers[4]);
  if (!testUtils.objectsEqual(expectedBoardDataAfterNumber4, actualBoardDataAfterNumber4)) {
    throw `testUpdateBoardDataForCalledNumber failed on Number4. actualResult: ${JSON.stringify(actualBoardDataAfterNumber4)}`;
  }

  const expectedBoardDataAfterNumber5 = {
    starCount: 5,
    board: [
      [ -1, 11, 47, 61, -1 ],
      [ 30, 74, 73, 14, 66 ],
      [ 53, 52, -1, 57, 15 ],
      [ 64, -1, 54, 28, 87 ],
      [ 26, 85, 63, -1, 86 ]
    ],
    alreadyWon: false,
  }

  const actualBoardDataAfterNumber5 = updateBoardDataForCalledNumber(actualBoardDataAfterNumber4, testCalledNumbers[5]);
  if (!testUtils.objectsEqual(expectedBoardDataAfterNumber5, actualBoardDataAfterNumber5)) {
    throw `testUpdateBoardDataForCalledNumber failed on Number5. actualResult: ${JSON.stringify(actualBoardDataAfterNumber5)}`;
  }

  const expectedBoardDataAfterNumber6 = {
    starCount: 6,
    board: [
      [ -1, 11, 47, 61, -1 ],
      [ 30, 74, 73, -1, 66 ],
      [ 53, 52, -1, 57, 15 ],
      [ 64, -1, 54, 28, 87 ],
      [ 26, 85, 63, -1, 86 ]
    ],
    alreadyWon: false,
  }

  const actualBoardDataAfterNumber6 = updateBoardDataForCalledNumber(actualBoardDataAfterNumber5, testCalledNumbers[6]);
  if (!testUtils.objectsEqual(expectedBoardDataAfterNumber6, actualBoardDataAfterNumber6)) {
    throw `testUpdateBoardDataForCalledNumber failed on Number6. actualResult: ${JSON.stringify(actualBoardDataAfterNumber6)}`;
  }

  console.log('Completed run of testUpdateBoardDataForCalledNumber successfully')
}

function testGetIndexesOfAllStarsInRow() {
  const rowWithNoStars = [ 5, 26, 12, 65, 9 ];
  const expectedEmpty = [];
  let actualResult = getIndexesOfAllStarsInRow(rowWithNoStars, []);
  if (!testUtils.objectsEqual(expectedEmpty, actualResult)) {
    throw 'Failed on row with no stars';
  }

  const rowWithOneStarInPos0 = [ -1, 26, 12, 65, 9 ];
  const expectedPos0 = [ 0 ];
  actualResult = getIndexesOfAllStarsInRow(rowWithOneStarInPos0, []);
  if (!testUtils.objectsEqual(expectedPos0, actualResult)) {
    throw 'Failed on rowWithOneStarInPos0';
  }

  const rowWithOneStarInPos2 = [ 1, 26, -1, 65, 9 ];
  const expectedPos2 = [ 2 ];
  actualResult = getIndexesOfAllStarsInRow(rowWithOneStarInPos2, []);
  if (!testUtils.objectsEqual(expectedPos2, actualResult)) {
    throw 'Failed on rowWithOneStarInPos2';
  }

  const rowWithOneStarAtEnd = [ 1, 26, 9, 65, -1 ];
  const expectedPos4 = [ 4 ];
  actualResult = getIndexesOfAllStarsInRow(rowWithOneStarAtEnd, []);
  if (!testUtils.objectsEqual(expectedPos4, actualResult)) {
    throw 'Failed on rowWithOneStarAtEnd';
  }

  const rowWithTwoStarsPos0And2 = [ -1, 26, -1, 65, 9 ];
  const expectedPos0And2 = [ 0, 2 ];
  actualResult = getIndexesOfAllStarsInRow(rowWithTwoStarsPos0And2, []);
  if (!testUtils.objectsEqual(expectedPos0And2, actualResult)) {
    throw 'Failed on rowWithTwoStarsPos0And2';
  }

  const rowWithTwoStarsPos1And3 = [ 1, -1, 26, -1, 65 ];
  const expectedPos1And3 = [ 1, 3 ];
  actualResult = getIndexesOfAllStarsInRow(rowWithTwoStarsPos1And3, []);
  if (!testUtils.objectsEqual(expectedPos1And3, actualResult)) {
    throw 'Failed on rowWithTwoStarsPos1And3';
  }

  const rowWithFourStars = [ -1, -1, 26, -1, -1 ];
  const expectedFourIndexes = [ 0, 1, 3, 4 ];
  actualResult = getIndexesOfAllStarsInRow(rowWithFourStars, []);
  if (!testUtils.objectsEqual(expectedFourIndexes, actualResult)) {
    throw 'Failed on rowWithFourStars';
  }

  console.log('Completed run of testGetIndexesOfAllStarsInRow successfully')
}

function testCheckForWinner() {
  boardNoBingo = [
    [ -1, 11, 47, 61, -1 ],
    [ 30, 74, 73, -1, 66 ],
    [ 53, 52, -1, 57, 15 ],
    [ 64, -1, 54, 28, 87 ],
    [ 26, 85, 63, -1, 86 ]
  ];

  if (checkForWinner(boardNoBingo) !== false) {
    throw 'testCheckForWinner failed with boardNoBingo';
  }

  boardRow0Bingo = [
    [ -1, -1, -1, -1, -1 ],
    [ 30, 74, 73, -1, 66 ],
    [ 53, 52, -1, 57, 15 ],
    [ 64, -1, 54, 28, 87 ],
    [ 26, 85, 63, -1, 86 ]
  ];

  if (checkForWinner(boardRow0Bingo) !== true) {
    throw 'testCheckForWinner failed with boardRow0Bingo';
  }

  boardRow2Bingo = [
    [ -1, 11, 47, 61, -1 ],
    [ 30, 74, 73, -1, 66 ],
    [ -1, -1, -1, -1, -1 ],
    [ 64, -1, 54, 28, 87 ],
    [ 26, 85, 63, -1, 86 ]
  ];

  if (checkForWinner(boardRow2Bingo) !== true) {
    throw 'testCheckForWinner failed with boardRow2Bingo';
  }

  boardColumnBingo = [
    [ -1, 11, 47, -1, -1 ],
    [ 30, 74, 73, -1, 66 ],
    [ 53, 52, -1, -1, 15 ],
    [ 64, -1, 54, -1, 87 ],
    [ 26, 85, 63, -1, 86 ]
  ];

  if (checkForWinner(boardColumnBingo) !== true) {
    throw 'testCheckForWinner failed with boardColumnBingo';
  }

  console.log('Completed run of testCheckForWinner successfully')
}

function testCheckForColumnOfStars() {
  const indexesArrayTooFewElements = [
    [ 1 ],
    [ 1 ],
    [ 1 ],
    [ 1 ]
  ];
  const expectedError = 'Error: getIndexesOfAllStarsInRow input wrong length: [[1],[1],[1],[1]]';

  try {
    checkForColumnOfStars(indexesArrayTooFewElements);
    if (true) {
      throw 'testCheckForColumnOfStars failed to throw error with indexesArrayTooFewElements';
    }
  } catch (error) {
    if (error !== expectedError) {
      throw 'testCheckForColumnOfStars failed with wrong error message for indexesArrayTooFewElements';
    }  
  }

  const indexesArrayWithEmptyArrayFirst = [
    [],
    [ 1 ],
    [ 1 ],
    [ 1 ],
    [ 1 ],
  ];

  if (checkForColumnOfStars(indexesArrayWithEmptyArrayFirst) !== false) {
    throw 'testCheckForColumnOfStars failed with indexesArrayWithEmptyArrayFirst';
  }

  const indexesArrayWithEmptyArrayMiddle = [
    [ 1 ],
    [ 1 ],
    [],
    [ 1 ],
    [ 1 ],
  ];

  if (checkForColumnOfStars(indexesArrayWithEmptyArrayMiddle) !== false) {
    throw 'testCheckForColumnOfStars failed with indexesArrayWithEmptyArrayMiddle';
  }

  const indexesArrayShortWithBingo = [
    [ 1 ],
    [ 1 ],
    [ 1 ],
    [ 1 ],
    [ 1 ],
  ];

  if (checkForColumnOfStars(indexesArrayShortWithBingo) !== true) {
    throw 'testCheckForColumnOfStars failed with indexesArrayShortWithBingo';
  }

  const indexesArrayLongWithBingo = [
    [ 1, 2, 4 ],
    [ 0, 2 ],
    [ 2, 3 ],
    [ 0, 1, 2 ],
    [ 2, 3, 4 ],
  ];

  if (checkForColumnOfStars(indexesArrayLongWithBingo) !== true) {
    throw 'testCheckForColumnOfStars failed with indexesArrayLongWithBingo';
  }

  const indexesArrayShortNoBingo = [
    [ 1 ],
    [ 1 ],
    [ 2 ],
    [ 1 ],
    [ 1 ],
  ];

  if (checkForColumnOfStars(indexesArrayShortNoBingo) !== false) {
    throw 'testCheckForColumnOfStars failed with indexesArrayShortNoBingo';
  }

  const indexesArrayLongNoBingo = [
    [ 0, 1, 4 ],
    [ 0, 2 ],
    [ 2, 3 ],
    [ 0, 1, 2 ],
    [ 2, 3, 4 ],
  ];

  if (checkForColumnOfStars(indexesArrayLongNoBingo) !== false) {
    throw 'testCheckForColumnOfStars failed with indexesArrayLongNoBingo';
  }

  console.log('Completed run of testCheckForColumnOfStars successfully')
}

function testCalculateWinningBoardScore() {
  const testWinningBoard = [
    [ -1, 11, 47, 61, -1 ],
    [ 30, 74, -1, -1, 66 ],
    [ -1, -1, -1, -1, -1 ],
    [ 64, -1, 54, 28, 87 ],
    [ 26, 85, 63, -1, -1 ]
  ];
  const expectedSum = 696;
  const lastNumberCalled = 25;
  const expectedScore = expectedSum * lastNumberCalled ;

  const actualScore = calculateWinningBoardScore(lastNumberCalled, testWinningBoard);
  if (expectedScore !== actualScore) {
    throw `testCalculateWinningBoardScore failed. actualScore: ${actualScore}`;
  }

  console.log('Completed run of testCalculateWinningBoardScore successfully')
}