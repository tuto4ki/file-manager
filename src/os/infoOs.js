import os, { EOL } from 'os';
import {
  CPUS_DESC,
  CPUS_MEASUR,
  INVALID_INPUT,
} from '../constants.js';

export default function infoOs(command) {

  switch(command) {
    case 'EOL':
      console.log(`${os.EOL}${JSON.stringify(os.EOL)}`);
      break;
    case 'cpus':
      const cpus = os.cpus();
      console.log(`${os.EOL}${CPUS_DESC} ${cpus.length}`);
      for(let i = 0; i < cpus.length; i++) {
        const speed = cpus[i].speed / 1000;
        console.log(`${os.EOL}${i + 1}) ${cpus[i].model} ${speed}${CPUS_MEASUR}`);
      }
      break;
    case 'homedir':
      console.log(`${os.EOL}${os.homedir()}`);
      break
    case 'username':
      console.log(`${os.EOL}${os.userInfo().username}`);
      break;
    case 'architecture':
      console.log(`${os.EOL}${os.arch()}`);
      break;
    default:
      console.log(`${EOL}${INVALID_INPUT}`);
  }

}