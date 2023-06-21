import { join } from 'path';

const cdDir = (path) => {
  try {
    const pathNew = join(process.cwd(), path.slice(3));
    process.chdir(pathNew);
  } catch(error) {
    console.log(error.message);
  }
}

export { cdDir };