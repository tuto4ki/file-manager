import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { EOL } from 'os';

import { getPathToFile } from '../utils.js';
import { FILE_DECOMPRESS } from '../constants.js';

export default async function decompress (pathCompressFileInput, pathFileInput) {
  try {
  
  let pathGzip = getPathToFile(pathCompressFileInput);

  let pathFile = getPathToFile(pathFileInput);

  const unzip = createBrotliDecompress();
  const source = createReadStream(pathGzip);
  const destination = createWriteStream(pathFile);

  await pipeline(source, unzip, destination).then(() => {
    console.log(`${EOL}${FILE_DECOMPRESS}`);
  });
  } catch (error) {
    console.error(`${EOL}${error.message}`);
  }
};
