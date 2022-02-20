function sumArray(arr) {
  if (!Array.isArray(arr) || !isNumberArray(arr)) {
    throw `Invalid param: ${JSON.stringify(arr)}`;
  }

  return arr.reduce((a, b) => a + b);
}

function isNumberArray(arr) {
  const strings = arr.filter(x => typeof x === 'string');
  return strings.length === 0;
}

function getComplementOfArray(longerArray, shorterArray) {
  validateArrayOrder(longerArray, shorterArray);
  return longerArray.filter(x => !shorterArray.includes(x));
}

function getIntersectionOfArrays(longerArray, shorterArray) {
  validateArrayOrder(longerArray, shorterArray);
  return longerArray.filter(x => shorterArray.includes(x));
}

// TODO: test
function getArraysWithValue(arrayOfArrays, value) {
  return arrayOfArrays.filter(subArray => subArray.includes(value));
}

// tested in testGetComplementOfArray and testGetIntersectionOfArrays
function validateArrayOrder(arrOne, arrTwo) {
  if (arrOne.length < arrTwo.length ) {
    throw 'Error: Please reverse array params so longer array is first';
  }
}

export { sumArray, getComplementOfArray, getIntersectionOfArrays, getArraysWithValue };
