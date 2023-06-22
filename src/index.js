import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import os, { EOL } from 'os';

import { cdDir } from './nwd/cd.js';
import { list } from './nwd/list.js';
import read from './fs/read.js';
import create from './fs/create.js';
import rename from './fs/rename.js';
import remove from './fs/delete.js';
import copy from './fs/copy.js';
import move from './fs/move.js';
import { welcome, goodby } from './welcome.js';
import { parseArgs } from './args.js';
import infoOs from './os/infoOs.js';
import calculateHash from './hash/calcHash.js';

const userName = parseArgs();

welcome(userName);

process.chdir(os.homedir());

console.log(`You are currently in: ${process.cwd()}${EOL}`);

const rl = readline.createInterface({ input: stdin, output: stdout });

rl.on('line', (input) => {
  try {
    if (input === '.exit') {
      rl.close();
      return;
    } else if (input === 'up') {
      process.chdir('../');
    } else if (/^cd /.test(input)) {
      cdDir(input);
    } else if (input === 'ls') {
      list();
    } else if (/^cat /.test(input)) {
      read(input.slice(4));
    } else if (/^add /.test(input)) {
      create(input.slice(4));
    } else if (/^rn /.test(input)) {
      const fileNameArr = input.trim().split(' ');
      
      if (fileNameArr.length < 3) {
        throw new Error(`${EOL}Enter correct data${EOL}`);
      }
      rename(fileNameArr[1], fileNameArr[2]);
    } else if (/^rm /.test(input)) {
      remove(input.split(' ')[1]);
    } else if (/^cp /.test(input)) {
      const args = input.trim().split(' ');
      if (args.length < 3) {
        throw new Error(`${EOL}Enter correct data${EOL}`);
      }
      copy(args[1], args[2]);
    } else if (/^mv /.test(input)) {
      const args = input.trim().split(' ');
      if (args.length < 3) {
        throw new Error(`${EOL}Enter correct data${EOL}`);
      }
      move(args[1], args[2]);
    } else if (/^os --/.test(input)) {
      infoOs(input.replace(/^os --/, ''));
    } else if (/^hash /.test(input)) {
      calculateHash(input.replace(/^hash /, ''));
    } else {
      console.log(`Invalid input${EOL}`);
    }
  } catch (error) {
    console.log(error.message);
  }
  
  console.log(`You are currently in: ${process.cwd()}${EOL}`);
});

rl.on('close', () => {
  goodby(userName);
})
