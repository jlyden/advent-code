import { getContents } from '../common/file-utils.mjs';

console.log(calculatePositionArea()); // 2120749
console.log(calculatePositionAreaWithAim()); // 2138382217

function calculatePositionArea(returnLimit = null) {
  let currentHorizontalPosition = 0;
  let currentDepth = 0;

  try {
    const instructions = getContents('day-02/input.txt', returnLimit);

    instructions.forEach(instruction => {
      const directionAndSize = instruction.split(' ');
      if(directionAndSize.length != 2) {
        throw 'Instruction wrong shape';
      }

      const direction = directionAndSize[0];
      const size = parseInt(directionAndSize[1]);

      switch (direction) {
        case 'forward': 
          currentHorizontalPosition += size;
          break;
        case 'down':
          currentDepth += size;
          break;
        case 'up':
          currentDepth -= size;
          break;
      }
    });
    return currentHorizontalPosition * currentDepth;
  } catch (error) {
    console.log(error);
  }
}

function calculatePositionAreaWithAim(returnLimit = null) {
  let currentHorizontalPosition = 0;
  let currentDepth = 0;
  let currentAim = 0;

  try {
    const instructions = getContents('day-02/input.txt', returnLimit);

    instructions.forEach(instruction => {

      const directionAndSize = instruction.split(' ');
      if(directionAndSize.length != 2) {
        throw 'Instruction wrong shape';
      }

      const direction = directionAndSize[0];
      const size = parseInt(directionAndSize[1]);

      switch (direction) {
        case 'forward': 
          currentHorizontalPosition += size;
          currentDepth += currentAim * size;
          break;
        case 'down':
          currentAim += size;
          break;
        case 'up':
          currentAim -= size;
          break;
      }

    });
    return currentHorizontalPosition * currentDepth;
  } catch (error) {
    console.log(error);
  } 
}
