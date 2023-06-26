import { readdir, stat } from 'fs/promises';
import path from 'path';
import { EOL } from 'os';

import { ERROR_FILED, TYPE_FILE } from '../constants.js'

const list = async () => {
  const dirName =  process.cwd();

  try {
    const files = await readdir(dirName).catch(() => {
      throw new Error(ERROR_FILED);
    });

    const arr = [];
    for (const file of files) {
      let statFile = await stat(path.join(dirName, file));
      let type = TYPE_FILE.unknown;

      if (statFile.isFile()) {
        type = TYPE_FILE.file;
      } else if (statFile.isDirectory()) {
        type = TYPE_FILE.directory;
      }

      arr.push({
        Name: file,
        Type: type,
      });
    }
    console.table(arr, ['Name', 'Type']);
  } catch (error) {
    console.log(`${EOL}${error.message}`);
  }
};

export { list };