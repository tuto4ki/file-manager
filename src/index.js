import { welcome, goodby } from './welcome.js';
import { parseArgs } from './args.js';
import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import { EOL } from 'os';
import { cdDir } from './nwd/cd.js';
import { list } from './nwd/list.js';
import read from './fs/read.js';
import create from './fs/create.js';
import rename from './fs/rename.js';

const userName = parseArgs();

welcome(userName);

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
