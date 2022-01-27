const path = require('path');
const fs = require('fs');

module.exports.getContents = function (filenameWithPath) {
  const source = path.resolve(filenameWithPath);
  return fs.readFileSync(source, 'utf8').toString().split('\n');
}