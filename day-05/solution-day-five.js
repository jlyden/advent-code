const fileUtils = require('../common/file-utils.js');

function getCountOfPointsWithTwoPlusOverlappingVents(noDiagonals = true, returnLimit = null) {
  // input numbers range from 10 - 989
  const ventLines = fileUtils.getContents('day-05/input.txt', returnLimit);

  // Skip diagonal input lines (x1 != x2 && y1 != y2)

}