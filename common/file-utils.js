const path = require('path');
const fs = require('fs');

module.exports.getContents = function (filenameWithPath, returnLimit = null, splitter = '\n') {
  const source = path.resolve(filenameWithPath);
  const contents = fs.readFileSync(source, 'utf8').toString().split(splitter);
  return returnLimit ? contents.splice(0, returnLimit) : contents;
}