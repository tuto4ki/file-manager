import { Readable } from 'stream';
import path from 'path';
import fs from 'fs';

export default async function read (pathToFile) {
    const fileName = path.join(process.cwd(), pathToFile);
    class MyReadable extends Readable {
        constructor(fileName, encoding) {
          super();
          this.fileName = fileName;
          this.fileDescriptor = null;
          this.setEncoding = encoding;
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
       
      const readable = new MyReadable(fileName, 'utf8');
      
      let data = '';
      readable.on('data', chunk => data += chunk);
      readable.on('end', () => process.stdout.write(data + '\n'));
};
