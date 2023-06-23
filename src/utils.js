import path from 'path';

function getPathToFile(pathFile) {
  if (path.isAbsolute(pathFile)) {
      return pathFile;
  }
  return path.join(process.cwd(), pathFile);
}

export { getPathToFile };