import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import os, { EOL } from 'os';

import cdDir from './nwd/cdDir.js';
import { list } from './nwd/list.js';
import read from './fs/read.js';
import create from './fs/create.js';
import renameFile from './fs/rename.js';
import remove from './fs/delete.js';
import copy from './fs/copy.js';
import move from './fs/move.js';
import { welcome, goodby } from './welcome.js';
import { getNamesPath, parseArgs } from './utils.js';
import infoOs from './os/infoOs.js';
import calculateHash from './hash/calcHash.js';
import compress from './zip/compress.js';
import decompress from './zip/decompress.js';
import {
  CURRENT_DIRECTORY,
  INVALID_INPUT
} from './constants.js';

const userName = parseArgs();

welcome(userName);

process.chdir(os.homedir());

console.log(`${CURRENT_DIRECTORY} ${process.cwd()}${EOL}`);

const rl = readline.createInterface({ input: stdin, output: stdout });


rl.on('line', (input) => {
  runCommand(input);
});

rl.on('close', () => {
  goodby(userName);
});

async function runCommand(input) {
  rl.pause();
  try {
    if (input === '.exit') {
      rl.close();
      return;
    } else if (input === 'up') {
      process.chdir('../');
    } else if (/^cd /.test(input)) {
      const pathToDirectory= getNamesPath(input.slice(2), 1);
      cdDir(pathToDirectory[0]);
    } else if (input === 'ls') {
      await list();
    } else if (/^cat /.test(input)) {
      const pathToFile = getNamesPath(input.slice(3), 1);
      await read(pathToFile[0]);
    } else if (/^add /.test(input)) {
      const pathFile = getNamesPath(input.slice(3), 1);
      await create(pathFile[0]);
    } else if (/^rn /.test(input)) {
      const fileNameArr = getNamesPath(input.slice(2), 2);
      await renameFile(fileNameArr[0], fileNameArr[1]);
    } else if (/^rm /.test(input)) {
      const fileNameArr = getNamesPath(input.slice(2), 1);
      await remove(fileNameArr[0]);
    } else if (/^cp /.test(input)) {
      const fileNameArr = getNamesPath(input.slice(2), 2);
      await copy(fileNameArr[0], fileNameArr[1]);
    } else if (/^mv /.test(input)) {
      const fileNameArr = getNamesPath(input.slice(2), 2);
      await move(fileNameArr[0], fileNameArr[1]);
    } else if (/^os --/.test(input)) {
      infoOs(input.replace(/^os --/, ''));
    } else if (/^hash /.test(input)) {
      const fileNameArr = getNamesPath(input.slice(4), 1);
      await calculateHash(fileNameArr[0]);
    } else if (/^compress /.test(input)) {
      const fileNameArr = getNamesPath(input.slice(8), 2);
      await compress(fileNameArr[0], fileNameArr[1]);
    } else if (/^decompress /.test(input)) {
      const fileNameArr = getNamesPath(input.slice(10), 2);
      await decompress(fileNameArr[0], fileNameArr[1]);
    } else {
      console.log(`${EOL}${INVALID_INPUT}`);
    }
  } catch (error) {
    console.log( `${error.message}${EOL}`);
  }
  rl.prompt(true);
  console.log(`${EOL}${CURRENT_DIRECTORY} ${process.cwd()}${EOL}`);
}
