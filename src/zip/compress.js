import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';

export default async function compress (pathFileInput, pathCompressFileInput) {
    
    let pathFile = path.join(process.cwd(), pathFileInput);
    if (path.isAbsolute(pathFileInput)) {
        pathFile = pathFileInput;
    }
    
    let pathGzip = path.join(process.cwd(), pathCompressFileInput);
    if (path.isAbsolute(pathCompressFileInput)) {
        pathGzip = pathCompressFileInput;
    }

    try {
        const gzip = createBrotliCompress();
        const source = createReadStream(pathFile);
        const destination = createWriteStream(pathGzip);

        await pipeline(source, gzip, destination);
    } catch (error) {
        console.log(error.message);
    }
};
