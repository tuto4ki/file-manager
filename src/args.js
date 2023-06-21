const parseArgs = () => {
  if (/^--/.test(process.argv[2])) {
    const value = process.argv[2].slice(2).split('=');
    return value[1];
  }
  return '';
}

export { parseArgs };