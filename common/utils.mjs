function objectsEqual(a, b) {
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

function range(start, end) {
  if (start === end) {
    return [ start ];
  }
  const length = Math.abs(end - start) + 1;

  if(end > start) {
    // credit: https://dev.to/mbrookes/comment/k2ff
    return Array.from({ length }, (_, i) => start + i);
  } else {
    return Array.from({ length }, (_, i) => start - i);
  }
}

function splitStringOnSpaces(input) {
  if (typeof input !== 'string') {
    throw 'Error: Input must be a string.';
  }
  return input.split(/\s+/).filter(element => element.length > 0);
}

function splitStringParseInts(input) {
  if (typeof input !== 'string') {
    throw 'Error: Input must be a string.';
  }
  return input.split('').map(element => parseInt(element)).filter(element => !isNaN(element));
}

export { objectsEqual, range, splitStringOnSpaces, splitStringParseInts };
