import { unlink } from 'fs/promises';
import { EOL } from 'os';

import { getPathToFile } from '../utils.js';
import {
  FILE_DONT_EXISTS,
  FILE_REMOVED,
  ERROR_CODE,
} from '../constants.js';

export default async function remove (patFile, isShowMessage = true) {

  const filesName = getPathToFile(patFile);

  try {

    await unlink(filesName).then(() => {
      if (isShowMessage) {
        console.log(`${FILE_REMOVED}${EOL}`);
      }
    }).catch((error) => {
      if (error.code === ERROR_CODE.ENOENT) {
          throw new Error(FILE_DONT_EXISTS);
      }
    });
    
  } catch(err) {
    console.error(`${err.message}${EOL}`);
  }
};
