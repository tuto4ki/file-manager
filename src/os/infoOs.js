import os from 'os';

export default function infoOs(command) {
  switch(command) {
    case 'EOL':
      console.log(`${os.EOL}${JSON.stringify(os.EOL)}${os.EOL}`);
      break;
    case 'cpus':
      const cpus = os.cpus();
      console.log(`${os.EOL}Overall amount of CPUS ${cpus.length}${os.EOL}`);
      for(let i = 0; i < cpus.length; i++) {
        console.log(`${i + 1}) ${cpus[i].model} ${cpus[i].speed / 1000}GHz${os.EOL}`);
      }
      break;
    case 'homedir':
      console.log(`${os.EOL}${os.homedir()}${os.EOL}`);
      break
    case 'username':
      console.log(`${os.EOL}${os.userInfo().username}${os.EOL}`);
      break;
    case 'architecture':
      console.log(`${os.EOL}${os.arch()}${os.EOL}`);
      break;
    default:
      console.log('Invalid input');
  }
}