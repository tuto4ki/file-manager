import { EOL } from 'os';

import { getPathToFile } from '../utils.js';

export default function cdDir(path) {
  try {
    const pathNew = getPathToFile(path);
    process.chdir(pathNew);

  } catch(error) {
    console.error(`${EOL}${error.message}`);
  }
}
