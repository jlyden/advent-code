import { getContents } from '../common/file-utils.mjs';
import { objectsEqual } from '../common/utils.mjs';

const STAR = -1;

console.log(getScoreOfWinningBingoBoard(true)); // 82440
console.log(getScoreOfWinningBingoBoard(false)); // 20774

/**
 * @param returnFirst bool true to return first winning board; false to return last
 * @param returnLimit number | null 
 * @returns number
 */
function getScoreOfWinningBingoBoard(returnFirst = true, returnLimit = null) {
  try {
    const inputFileContents = getContents('day-04/input.txt', returnLimit);
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
  for (let row of board) {
    if (objectsEqual(row, rowOfStars)) {
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

export { prepBoardData, updateBoardDataForCalledNumber, getIndexesOfAllStarsInRow, checkForWinner, checkForColumnOfStars, calculateWinningBoardScore };
