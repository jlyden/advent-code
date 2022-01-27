const fileUtils = require('../common/file-utils.js');

function determinePowerConsumption(returnLimit = null) {
  try {
    const reportLines = fileUtils.getContents('day-03/input.txt', returnLimit);
    let moreOnesInPosition = new Array(reportLines[0].length).fill(0);
  
    reportLines.forEach(line => {
      moreOnesInPosition = processLine(line, moreOnesInPosition);
    });

    return calculatePowerConsumption(moreOnesInPosition);
  } catch (error) {
    console.log(error)
  }
}

function processLine(line, moreOnesInPosition) {
  const digits = line.split('');
  const digitsLen = digits.length;

  for(let i=0; i<digitsLen; i++) {
    if (digits[i] === '1') {
      moreOnesInPosition[i] += 1; 
    } else {
      moreOnesInPosition[i] -= 1; 
    }
  }

  return moreOnesInPosition;
}

function calculatePowerConsumption(moreOnesInPosition) {
  let gammaString = '';
  let epsilonString = '';
  moreOnesInPosition.forEach(value => {
    if (value > 0) {
      gammaString += '1';
      epsilonString += '0';
    } else {
      gammaString += '0';
      epsilonString += '1';
    }
  });
  return parseInt(gammaString, 2) * parseInt(epsilonString, 2);
}

console.log(determinePowerConsumption());

// TODO: https://adventofcode.com/2021/day/3#part2