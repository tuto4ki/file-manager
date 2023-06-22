import { unlink } from 'fs/promises';
import { EOL } from 'os';
import path from 'path';

export default async function remove (patFile, isShowMessage = true) {
    const filesName = path.join(process.cwd(), patFile);
    const errorMessage = 'FS operation failed';

    try {
        await unlink(filesName).then(() => {
          if (isShowMessage) {
            console.log(`${EOL}File remove${EOL}`);
          }
        }).catch((error) => {
            if (error.code === 'ENOENT') {
                throw new Error(errorMessage);
            }
        });
    } catch(err) {
        console.error(err.message);
    }
};
