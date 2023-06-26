import { EOL } from 'os';

import {
  WELCOME,
  GOODBY,
} from './constants.js';

const welcome = () => {
  if (/^--/.test(process.argv[2])) {
    const value = process.argv[2].slice(2).split('=');
    console.log(`${WELCOME} ${value[1]}!${EOL}`);
  }
}

const goodby = (userName) => {
  console.log(`${EOL}${GOODBY.replace('userName', userName)}${EOL}`) 
}

export { welcome, goodby };