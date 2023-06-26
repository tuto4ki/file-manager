import { access, appendFile } from 'fs/promises';
import { join } from 'path';
import { EOL } from 'os';

import {
  ERROR_CODE,
  FILE_ADDED,
  FILE_EXISTS
} from '../constants.js';

export default async function create (nameFile) {

  const pathFile = join(process.cwd(), nameFile);

  try {

    await access(pathFile);

    throw new Error(FILE_EXISTS);

  } catch (error) {

    if (error.code === ERROR_CODE.ENOENT) {
      await appendFile(pathFile, '').then(() => console.log(`${EOL}${FILE_ADDED}`)).catch((err) => {
        console.log(`${EOL}${err.message}`);
      });
    } else {
      console.error(`${EOL}${error.message}`);
    }

  }
};
