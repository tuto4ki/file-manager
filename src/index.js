import { welcome, goodby } from './welcome.js';
import { parseArgs } from './args.js';
import readline from 'readline/promises';
import { stdin, stdout } from 'process';
import { EOL } from 'os';
import { cdDir } from './nwd/cd.js';
import { list } from './nwd/list.js';
import read from './fs/read.js';

const userName = parseArgs();

welcome(userName);

console.log(`You are currently in: ${process.cwd()}${EOL}`);

const rl = readline.createInterface({ input: stdin, output: stdout });

rl.on('line', (input) => {
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
  } else {
    console.log(`Invalid input${EOL}`);
  }
  
  console.log(`You are currently in: ${process.cwd()}${EOL}`);
});

rl.on('close', () => {
  goodby(userName);
})
