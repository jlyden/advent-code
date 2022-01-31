module.exports.objectsEqual = function (a, b) {
  const objectsEqual = module.exports.objectsEqual;

  if (isPrimative(a)) {
    return a === b;
  }

  if (Array.isArray(a)) {
    const aLen = a.length;
    if (aLen !== b.length) {
      return false;
    }

    for(let i=0; i<aLen; i++) {
      if (!objectsEqual(a[i], b[i])){
        return false;
      };
    }
  } else {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }

    for (const [key, value] of Object.entries(a)) {
      if (!objectsEqual(value, b[key])){
        return false;
      };
    }
  }

  return true;
}

function isPrimative(a) {
  const primatives = ['string', 'number', 'bigint', 'boolean'];
  return primatives.indexOf(typeof a) !== -1;
}

/***** TESTS *****/
//runTests();

function runTests() {
  testObjectsEqual();
}

function testObjectsEqual() {
  const objectsEqual = module.exports.objectsEqual;

  const baseObject = {
    aString: 'cheese',
    aNumber: 5,
    oneLevelArray: [1, 2, 3],
    twoLevelArray: [
      [4, 5, 6],
      ['x', 'y', 'z'],
    ],
  }

  const flatArray = [1, 2, 3];
  const flatArrayDifferent = [9, 2, 3];

  if (!objectsEqual(flatArray, flatArray)) {
    throw 'Failed: flatArray not equal to itself';
  }

  if (objectsEqual(flatArray, flatArrayDifferent)) {
    throw 'Failed: flatArray different';
  }

  const justString = 'cheese';
  if (!objectsEqual(justString, justString)) {
    throw 'Failed: string not equal to itself';
  }

  if (!objectsEqual(baseObject, baseObject)) {
    throw 'Failed: object not equal to itself';
  }

  const stringDifferent = {
    ...baseObject,
    aString: 'foo',
  }
  if (objectsEqual(baseObject, stringDifferent)) {
    throw 'Failed: missed string difference';
  }

  const numberDifferent = {
    ...baseObject,
    aNumber: 10,
  }

  if (objectsEqual(baseObject, numberDifferent)) {
    throw 'Failed: missed number difference';
  }

  const oneLevelArrayDifferent = {
    ...baseObject,
    oneLevelArray: [1, 2, 9],
  }

  if (objectsEqual(baseObject, oneLevelArrayDifferent)) {
    throw 'Failed: missed one level array difference';
  }

  const twoLevelArrayFlipped = {
    ...baseObject,
    twoLevelArray: [
      ['x', 'y', 'z'],
      [4, 5, 6],
    ],
  }

  if (objectsEqual(baseObject, twoLevelArrayFlipped)) {
    throw 'Failed: missed two level array flipped';
  }

  const twoLevelArrayDifferent = {
    ...baseObject,
    twoLevelArray: [
      [4, 5, 6],
      ['x', 'b', 'z'],
    ],
  }

  if (objectsEqual(baseObject, twoLevelArrayDifferent)) {
    throw 'Failed: missed two level array difference';
  }

  console.log('Completed run of testObjectsEqual successfully.')
}
