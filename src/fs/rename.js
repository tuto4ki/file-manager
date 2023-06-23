import { stat, rename } from 'fs/promises';
import path from 'path';
import { EOL } from 'os';

import { getPathToFile } from '../utils.js';
import {
  FILE_EXISTS,
  FILE_DONT_EXISTS,
  FILE_RENAMED,
} from '../constants.js';

export default async function renameFile (oldFileNameInput, newFileNameInput) {

    const fileOldName = getPathToFile(oldFileNameInput);
    const fileNewName = path.join(path.dirname(fileOldName), newFileNameInput);

    try {
      const isFileExists = await stat(fileNewName).then(() => true).catch((err) => {
        if (err.code === 'ENOENT') {
          return false;
        }
        throw err;
      });

      if (isFileExists) {
        throw new Error(`${FILE_EXISTS} ${fileNewName}`);
      }
       
      await rename(fileOldName, fileNewName).then(() => {
        console.log(`${FILE_RENAMED}${EOL}`);
      }).catch((err) => {
        if (err?.code === 'ENOENT') {
          throw new Error(`${FILE_DONT_EXISTS} ${fileOldName}`);
        }
        throw err;
      });
      
    } catch (error) {
      console.error(`${error.message}${EOL}`)
    }
};
