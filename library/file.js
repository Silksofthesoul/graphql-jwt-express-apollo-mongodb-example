const fs = require('fs');

const readFile = async (pathToFile) => {
  const fsp = fs.promises;
  let file = '';
  try {
    file = await fsp.readFile(pathToFile);
    file = file.toString('utf8');
  } catch (e) {
    return `Error library/readFile. Cannot get file path ${pathToFile}`;
  }
  return file;
};

exports.readFile = readFile;
