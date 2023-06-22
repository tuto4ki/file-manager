import { createReadStream, createWriteStream } from 'fs';
import { stat } from 'fs/promises';
import { pipeline } from 'stream/promises';
import path from 'path';
import { EOL } from 'os';

export default async function copy(pathFileInput, pathNewDirectoryInput) {
  const pathFile = path.join(process.cwd(), pathFileInput);
  const pathNewFile = path.join(pathNewDirectoryInput, path.basename(pathFileInput));

  try {
    await stat(pathFile).catch(() => {
      throw new Error(`No such file${EOL}`);
    });

    const isNewFile = await stat(pathNewFile).then(() => true).catch(() => false);

    if (!isNewFile) {
      const readStream = createReadStream(pathFile, 'utf-8');
      const writeStream = createWriteStream(pathNewFile, 'utf-8');

      const isCopy = await pipeline(readStream, writeStream).then(() => true);

      if (isCopy) {
        console.log(`File copied!${EOL}`)
        return true;
      }

    } else {
       throw new Error(`A file with the same name already exists in directory${EOL}`);
    }
   
  } catch(error) {
    console.log(`${EOL}${error.message}${EOL}`);
  }

  return false;
}