const path = require('path');
const folderPath = path.join(__dirname, 'files-copy');
const originalFolderPath = path.join(__dirname, 'files');

const fs = require('fs');
const fsPromises = fs.promises;

fsPromises
  .mkdir(folderPath, { recursive: true })
  .then(() => fsPromises.readdir(originalFolderPath))
  .then((files) => {
    return fsPromises
      .readdir(folderPath)
      .then((copiedFiles) => ({ files, copiedFiles }));
  })
  .then(({ files, copiedFiles }) => {
    const deletePromises = copiedFiles
      .filter((file) => !files.includes(file))
      .map((removeFile) =>
        fsPromises.unlink(path.join(folderPath, removeFile)),
      );

    return Promise.all(deletePromises).then(() => files);
  })
  .then((files) => {
    const copyPromises = files.map((file) => {
      const origPath = path.join(originalFolderPath, file);
      const copyPath = path.join(folderPath, file);
      return fsPromises.copyFile(origPath, copyPath);
    });
    return Promise.all(copyPromises);
  })
  .then(() => console.log('Success: files copied'))
  .catch((error) => console.log('error:', error));
