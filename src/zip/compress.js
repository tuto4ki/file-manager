import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { EOL } from 'os';

import { getPathToFile } from '../utils.js';
import { FILE_COMPRESS } from '../constants.js';

export default async function compress (pathFileInput, pathCompressFileInput) {
    
  let pathFile = getPathToFile(pathFileInput);

  let pathGzip = getPathToFile(pathCompressFileInput);

  try {
    const gzip = createBrotliCompress();
    const source = createReadStream(pathFile);
    const destination = createWriteStream(pathGzip);

    await pipeline(source, gzip, destination).then(() => {
      console.log(`${EOL}${FILE_COMPRESS}`);
    });
  } catch (error) {
    console.error(`${EOL}${error.message}`);
  }
};
