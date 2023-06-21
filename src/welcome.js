import { EOL } from 'os';

const welcome = () => {
  if (/^--/.test(process.argv[2])) {
    const value = process.argv[2].slice(2).split('=');
    console.log(`Welcome to the File Manager, ${value[1]}!${EOL}`);
  }
}

const goodby = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!${EOL}`) 
}

export { welcome, goodby };