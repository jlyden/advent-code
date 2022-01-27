const path = require('path');
const fs = require('fs');

module.exports.getContents = function (filenameWithPath, returnLimit = null) {
  const source = path.resolve(filenameWithPath);
  const contents = fs.readFileSync(source, 'utf8').toString().split('\n');
  return returnLimit ? contents.splice(0, returnLimit) : contents;
}