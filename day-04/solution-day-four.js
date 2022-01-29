const fileUtils = require('../common/file-utils.js');

function getScoreOfWinningBingoBoard(returnLimit = null) {
  try {
    const inputFileContents = fileUtils.getContents('day-04/input.txt', returnLimit);
    const [ calledNumbers, bingoBoards ] = prepareDataObjects(inputFileContents);
    const winningBoard = findWinningBoard(calledNumbers, bingoBoards)

    // Goal 2: calculate the correct score
    // score = (sum of unmarked #s on winning board) * number-that-triggered-win

  } catch(error) {
    console.log(error)
  }
}

function prepareDataObjects(contents) {
  // First row is comma-delimited string of numbers
  const calledNumbers = (contents.shift()).split(',');
  console.log(JSON.stringify(calledNumbers));
  const bingoBoards = prepareBingoBoards(contents);
  return [ calledNumbers, bingoBoards ];
}

function prepareBingoBoards(fullArray) {
  const fullArrayLen = fullArray.length;
  const chunkSize = 6; // blank row precedes 5 rows of numbers
  let bingoBoards = [];

  for (let i=0; i<fullArrayLen; i+=chunkSize) {
    let board = [];
    let chunk = fullArray.slice(i, i+chunkSize);
    let blankRow = chunk.shift(); // remove leading blank row (empty array)
    if (!blankRow.length > 0) {
      throw `Blank row was not: i = ${i}; blankRow = ${blankRow}`;
    }
    chunk.forEach(row => {
      board.push(row.split(' ').trim());
    });
    console.log(JSON.stringify(board));

    let boardData = {
      starCount: 0,
      board,
    }

    bingoBoards.push(boardData);
  }

  return bingoBoards;
}

function findWinningBoard(calledNumbers, bingoBoards) {
  return;
  // foreach calledNumber
    // loop through boards array looking for number in each
    // if found, replace with * and increment starCount

    // after calledNumber[4], start checking starCount
    // if starCount > 4, evaluate board

    // set checkCols = true
    // check each row for 5 stars -> break
    // while checking rows, if any row has 0 starts, checkCols = false 
    // if checkCols = true, look through cols for 5 stars

}

getScoreOfWinningBingoBoard();