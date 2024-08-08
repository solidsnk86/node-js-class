const fs = require('node:fs')

const stats = fs.statSync('./1.os-info.mjs')

console.log(`
Es un archivo: ${stats.isFile()}
Es un directorio: ${stats.isDirectory()}
Es un enlace simbólico: ${stats.isSymbolicLink()}
Tamaño del archivo: ${stats.size} bytes
`)
