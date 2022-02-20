import { getContents } from '../common/file-utils.mjs';

console.log(calculatePowerConsumption()); // 8020398
console.log(calculateLifeSupportRating()); // 1877139

function calculatePowerConsumption(returnLimit = null) {
  try {
    const reportLines = getContents('day-03/input.txt', returnLimit);
    const moreOnesInPosition = generateMoreOnesInPosition(reportLines);
    const [gammaString, epsilonString] = buildGammaAndEpsilonStrings(moreOnesInPosition);
    return parseInt(gammaString, 2) * parseInt(epsilonString, 2);
    } catch (error) {
    console.log(error)
  }
}

function generateMoreOnesInPosition(reportLines) {
  let moreOnesInPosition = new Array(reportLines[0].length).fill(0);
  
  reportLines.forEach(line => {
    moreOnesInPosition = processLine(line, moreOnesInPosition);
  });

  return moreOnesInPosition;
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

function buildGammaAndEpsilonStrings(moreOnesInPosition) {
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
  return [gammaString, epsilonString];
}

function calculateLifeSupportRating(returnLimit = null) {
  try {
    const reportLines = getContents('day-03/input.txt', returnLimit);
    const [o2GeneratorLines, co2ScrubberLines] = separateArrayByDigit(reportLines, 0);
    const o2GeneratorRating = determineIndividualLifeSupportRating(o2GeneratorLines, 'o2');
    const co2ScrubberRating = determineIndividualLifeSupportRating(co2ScrubberLines, 'co2');

    return o2GeneratorRating * co2ScrubberRating;
  } catch (error) {
    console.log(error)
  }
}

function determineIndividualLifeSupportRating(individualReportLines, ratingType) {
  if (['o2', 'co2'].indexOf(ratingType) === -1) {
    throw 'Invalid ratingType';
  }

  const maxDigits = individualReportLines[0].length;

  // Digit 0 was evaluated in separateInitialLifeSupportValues
  for(let i=1; i<maxDigits; i++) {
    // If down to one reportLine, that's the target value
    if (individualReportLines.length === 1) {
      break;
    }

    let [largerArray, smallerArray] = separateArrayByDigit(individualReportLines, i);
    individualReportLines = ratingType === 'o2' ? largerArray : smallerArray;
  }
  return parseInt(individualReportLines[0], 2);
}

function separateArrayByDigit(anArray, digit) {
  let arrayZero = []; // to be filled with values that have '0' char for specified digit
  let arrayOne = [];  // to be filled with values that have '1' char for specified digit
  anArray.forEach(value => {
    if(value.split('')[digit] === '1') {
      arrayOne.push(value);
    } else {
      arrayZero.push(value);
    }
  });

  const arrayOneLarger = arrayOne.length >= arrayZero.length;
  // Always return the longer array first
  return arrayOneLarger ? [arrayOne, arrayZero] : [arrayZero, arrayOne];
}
