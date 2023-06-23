import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { EOL } from 'os';

import { getPathToFile } from '../utils.js';

export default async function calculateHash(pathFileInput) {
    const pathFile = getPathToFile(pathFileInput);

    try {
        const hash = createHash('sha256');
        const input = createReadStream(pathFile);

        await pipeline(input, hash);

        console.log(`${EOL}${hash.digest('hex')}${EOL}`);

    } catch (error) {
        console.log(`${EOL}${error.message}${EOL}`);
    }
};
