import copy from './copy.js';
import remove from './delete.js';

export default async function move(pathFileInput, pathNewDirectoryInput) {

  const isCopy = await copy(pathFileInput, pathNewDirectoryInput);

  if (isCopy) {
    await remove(pathFileInput, false);
  }
}
