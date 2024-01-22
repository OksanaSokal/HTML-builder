const path = require('path');
const pathToStyleFolder = path.join(__dirname, 'styles');
const pathToProjectDistFolder = path.join(__dirname, 'project-dist');
const pathToBundleFile = path.join(pathToProjectDistFolder, 'bundle.css');

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises
  .readdir(pathToStyleFolder)
  .then((files) => files.filter((file) => path.extname(file) === '.css'))
  .then((cssFiles) => {
    const readPromises = cssFiles.map((file) => {
      const cssFilePath = path.join(pathToStyleFolder, file);
      return fs.promises.readFile(cssFilePath, 'utf-8');
    });
    return Promise.all(readPromises);
  })
  .then((style) => {
    return fs.promises.writeFile(pathToBundleFile, style);
  })
  .then(() => console.log('Success: styles merged'))
  .catch((error) => console.log('error:', error));
