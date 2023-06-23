import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';

export default async function decompress (pathCompressFileInput, pathFileInput) {
 try {
    
    let pathGzip = path.join(process.cwd(), pathCompressFileInput);
    if (path.isAbsolute(pathCompressFileInput)) {
        pathGzip = pathCompressFileInput;
    }

    let pathFile = path.join(process.cwd(), pathFileInput);
    if (path.isAbsolute(pathFileInput)) {
        pathFile = pathFileInput;
    }

    const unzip = createBrotliDecompress();
    const source = createReadStream(pathGzip);
    const destination = createWriteStream(pathFile);

    await pipeline(source, unzip, destination);
    } catch (error) {
        console.log(error.message);
    }
};
