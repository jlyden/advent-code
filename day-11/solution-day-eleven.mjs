import { getContents } from "../common/file-utils.mjs";

doSomething();

function doSomething() {
  const initEnergyLevels = getContents('day-11/input.txt');
  console.log(initEnergyLevels);
}

function runAStep() {
  // cycle through each oct
  // if EL = 9, +1 bump => X (flash)
  // if X, cycle through adjacent octs and +1
  // and check for flash ... 
}