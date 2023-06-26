import { createReadStream, createWriteStream } from 'fs';
import { stat } from 'fs/promises';
import { pipeline } from 'stream/promises';
import { join, basename } from 'path';
import { EOL } from 'os';

import {
  FILE_DONT_EXISTS,
  FILE_COPIED,
  FILE_EXISTS,
} from '../constants.js';
import { getPathToFile } from '../utils.js';

export default async function copy(pathFileInput, pathNewDirectoryInput) {

  const pathFile = getPathToFile(pathFileInput);
  const pathNewDirectory = getPathToFile(pathNewDirectoryInput);
  const pathNewFile = join(pathNewDirectory, basename(pathFileInput));

  try {
    await stat(pathFile).catch(() => {
      throw new Error(FILE_DONT_EXISTS);
    });

    const isNewFile = await stat(pathNewFile).then(() => true).catch(() => false);

    if (!isNewFile) {
      const readStream = createReadStream(pathFile);
      const writeStream = createWriteStream(pathNewFile);

      const isCopy = await pipeline(readStream, writeStream).then(() => true);

      if (isCopy) {
        console.log(`${EOL}${FILE_COPIED}`);
        return true;
      }

    } else {
       throw new Error(FILE_EXISTS);
    }
   
  } catch(error) {
    console.error(`${EOL}${error.message}`);
  }

  return false;
}