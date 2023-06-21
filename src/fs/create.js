import { access, appendFile } from 'fs/promises';
import path from 'path';
import { EOL } from 'os';

export default async function create (nameFile) {
    const pathFile = path.join(process.cwd(), nameFile);
    const errorText = 'A file with the same name already exists';

    try {
        await access(pathFile);
        throw new Error(errorText);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await appendFile(pathFile, '').then(() => console.log(`File add${EOL}`)).catch((err) => {
                console.log(err.message + EOL);
            });
        } else {
            console.error(error.message + EOL);
        }
    }
};
