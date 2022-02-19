const fileUtils = require('../common/file-utils.js');
const utils = require('../common/utils.js');

console.log(getSumOfLowPointRiskLevels());

function getSumOfLowPointRiskLevels(returnLimit = null) {
  const rows = fileUtils.getContents('day-09/input-small.txt', returnLimit);
  const rowMatrix = buildRowMatrix(rows);

  // get low points
  const lowPoints = getLowPoints(rowMatrix);
  // calcuate sum of low points risk levels
  return lowPoints;
}

function buildRowMatrix(rows) {
  const rowMatrix = [];
  rows.forEach(row => {
    rowMatrix.push(utils.splitStringParseInts(row));
  });
  return rowMatrix;
}

function getLowPoints(rowMatrix) {
  let lowPoints = [];
  // i could loop through each row
  // and loop through each value in row
  const matrixHeight = rowMatrix.length;
  const matrixWidth = rowMatrix[0].length;
  for(let i=1; i<matrixHeight-1; i++) {
    for(let j=1; j<matrixWidth-1; j++) {
      const currentPoint = rowMatrix[i][j];
      const previousPoint = getPrevious(rowMatrix, i, j);
      const nextPoint = rowMatrix[i][j+1];
      const pointBelow = rowMatrix[i+1][j];
      const pointAbove = rowMatrix[i-1][j];
      if (neighborIsHigherOrUndefined(currentPoint, previousPoint)
        && neighborIsHigherOrUndefined(currentPoint, nextPoint)
        && neighborIsHigherOrUndefined(currentPoint, pointBelow)
        && neighborIsHigherOrUndefined(currentPoint, pointAbove)) {
          lowPoints.push(currentPoint);
          console.log(previousPoint, pointAbove, currentPoint, pointBelow, nextPoint);
        }
    }
  }
  //// but i also know those four other values cannot be a low point (by def)
  //// how to keep track of that? probably not worth it ... still having to find those values in storage

  return lowPoints;
}

function getPrevious(rowMatrix, i, j) {
  return j > 0 ? rowMatrix[i][j-1] : undefined;
}

function getNext(rowMatrix, i, j) {
  
}

function neighborIsHigherOrUndefined(point, neighbor) {
  return neighbor ? neighbor > point : true;
}