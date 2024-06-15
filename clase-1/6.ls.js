const fs = require('node:fs/promises');

fs.readdir('.')
  .then((files) => {
    files.forEach((file) => {
      console.log(file);
    });
  })
  .catch((err) => {
    console.error('Error al leer el directrorio', err);
    return;
  });
