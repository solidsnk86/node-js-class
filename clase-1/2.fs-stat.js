const fs = require('node:fs');

const stats = fs.statSync('./archivo.txt');

console.log(`
Es un archivo: ${stats.isFile()}
Es un directorio: ${stats.isDirectory()}
Es un enlace simbólico: ${stats.isSymbolicLink()}
Tamaño del archivo: ${stats.size} bytes
`);
