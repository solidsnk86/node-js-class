const fs = require('node:fs')

console.log('Leyendo el primer archivo...')
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  // <----- Ejecuta éste callback (solo cuando termine éste)
  if (text) {
    console.log('Primer texto', text)
  } else {
    console.log(err)
  }
})

console.log('Hacer cosas mientras lee el archivo...')

console.log('Leyendo el primer archivo 2...')
fs.readFile('./archivo2.txt', 'utf-8', (err, text2) => {
  if (text2) {
    console.log('Segundo texto', text2)
  } else {
    console.log(err)
  }
})
