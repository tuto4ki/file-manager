import { Readable } from 'stream';
import fs from 'fs';
import { EOL } from 'os';

import { getPathToFile } from '../utils.js';
import { FILE_DONT_EXISTS } from '../constants.js';

export default async function read (pathToFile) {

  const fileName = getPathToFile(pathToFile);

  class MyReadable extends Readable {
    constructor(fileName) {
      super();
      this.fileName = fileName;
      this.fileDescriptor = null;
    }

    _construct(callback) {
      fs.open(this.fileName, (error, fileDescriptor) => {
        if (error) {
          callback(error);
        } else {
          this.fileDescriptor = fileDescriptor;
          callback();
        }
      });
    }
      
      _read(size) {
        const buffer = Buffer.alloc(size);
        fs.read(this.fileDescriptor, buffer, 0, size, null, (error, bytes) => {
          if (error) {
            this.destroy(error);
          } else {
            this.push(bytes ? buffer : null);
          }
        });
      }
      
      _destroy(error, callback) {
        if (this.fileDescriptor) {
          fs.close(this.fileDescriptor, (errorClose) => error ? callback(error) : callback(errorClose));
        } else {
          callback(error);
        }
      }
  }
  try {

    await fs.promises.stat(fileName).catch(() => {
      throw new Error(`${FILE_DONT_EXISTS} ${fileName}`);
    });

    const readable = new MyReadable(fileName);
    readable.on('data', chunk => process.stdout.write(chunk));
    readable.on('end', () => console.log(EOL));
    readable.on('error', (error) => console.error(error.message));

  } catch (error) {
    console.error(`${EOL}${error.message}`);
  }
};
