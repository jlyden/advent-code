const fileUtils = require('../common/file-utils.js');

function calculatePositionArea() {
  let currentHorizontalPosition = 0;
  let currentDepth = 0;

  try {
    const instructions = fileUtils.getContents('js/day-two/input.txt');

    instructions.forEach(instruction => {
      const directionAndSize = instruction.split(' ');
      if(directionAndSize.length != 2) {
        console.log('Error: Instruction wrong shape');
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

console.log(calculatePositionArea());

function calculatePositionAreaWithAim() {
  let currentHorizontalPosition = 0;
  let currentDepth = 0;
  let currentAim = 0;

  try {
    const instructions = fileUtils.getContents('js/day-two/input.txt');

    instructions.forEach(instruction => {

      const directionAndSize = instruction.split(' ');
      if(directionAndSize.length != 2) {
        console.log('Error: Instruction wrong shape');
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

console.log(calculatePositionAreaWithAim());
