import fs from 'fs';
import path from 'path';

export default async function rename (oldFileNameInput, newFileNameInput) {
    const filesOldName = path.join(process.cwd(), oldFileNameInput);
    const fileNewName = path.join(process.cwd(), newFileNameInput);

    const errorMessage = 'FS operation failed';
    
    fs.stat(fileNewName, (err) => {
        if (!err) {
            throw new Error(errorMessage);
        } else if (err.code === 'ENOENT') {
            fs.rename(filesOldName, fileNewName, (err) => {
                if (err?.code === 'ENOENT') {
                    throw new Error(errorMessage);
                }
            });
        }
    });
};
