import path from 'path';
import fs from 'fs';

function getContents(filenameWithPath, returnLimit = null, splitter = '\n') {
  const source = path.resolve(filenameWithPath);
  const contents = fs.readFileSync(source, 'utf8').toString().split(splitter);
  return returnLimit ? contents.splice(0, returnLimit) : contents;
}

export { getContents };