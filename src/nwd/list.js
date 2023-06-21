import { readdir, stat } from 'fs/promises';
import path from 'path';

const list = async () => {
    const dirName =  process.cwd();
    const errorMessage = 'FS operation failed';

    try {
        const files = await readdir(dirName).catch((err) => {
            if (err?.code === 'ENOENT') {
                throw new Error(errorMessage);
            }
        });
        const arr = [];
        for (const file of files) {
            let statFile = await stat(path.join(dirName, file));

            let type = 'directory';
            if (statFile.isFile()) {
              type = 'file';
            }

            arr.push({
              Name: file,
              Type: type,
            });
        }
        console.table(arr, ['Name', 'Type']);
    } catch (error) {
        console.log(error.message);
    }
};

export { list };