import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';
import { EOL } from 'os';

export default async function calculateHash(pathFileInput) {
    const hash = createHash('sha256');

    let pathFile = path.join(process.cwd(), pathFileInput);
    if (path.isAbsolute(pathFileInput)) {
        pathFile = pathFileInput;
    }
    
    try {
        const input = createReadStream(pathFile);

        await pipeline(input, hash);

        console.log(`${EOL}${hash.digest('hex')}${EOL}`);
    } catch (error) {
        console.log(`${EOL}${error.message}${EOL}`);
    }
};
