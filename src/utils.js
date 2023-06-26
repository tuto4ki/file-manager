import { EOL } from 'os';
import path from 'path';
import { INVALID_INPUT } from './constants.js';

export function getPathToFile(pathFile) {
  if (path.isAbsolute(pathFile)) {
      return pathFile;
  }
  return path.join(process.cwd(), pathFile);
}

export function parseArgs() {
  if (/^--/.test(process.argv[2])) {
    const value = process.argv[2].slice(2).split('=');
    return value[1];
  }
  return '';
}

export function getNamesPath(inputStr, countArgs) {
  const args = [];
  let i = 0;

  function funcArg () {
    i += 1;
    if (inputStr[i] === '"') {
      i += 1;
      const index = inputStr.indexOf('"', i);
      if (index === -1){
        throw new Error(`${EOL}${INVALID_INPUT}`);
      }
      args.push(inputStr.slice(i, index));
      i = index + 1;
    } else {
      const index = inputStr.indexOf(' ', i);
      if (index === -1) {
        args.push(inputStr.slice(i, inputStr.length));
        i = inputStr.length;
      } else {
        args.push(inputStr.slice(i, index));
        i = index;
      }
    }
  }

  while (i < inputStr.length) {
    funcArg();
  }

  if (args.length !== countArgs) {
    throw new Error(`${EOL}${INVALID_INPUT}`);
  }

  return args;
}
