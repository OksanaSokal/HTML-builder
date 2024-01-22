const fs = require('fs');
const path = require('path');
const pathFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathFolder, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    const filePath = path.join(pathFolder, file);

    fs.stat(filePath, function (err, stats) {
      if (err) throw err;
      if (stats.isFile()) {
        const fileName = path.parse(file).name;
        const fileExt = path.parse(file).ext.slice(1);
        const fileSize = stats.size / 1024;

        console.log(`${fileName} - ${fileExt} - ${fileSize.toFixed()}kb`);
      }
    });
  });
});
