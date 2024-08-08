import fs from 'node:fs' // EScmas modules

console.log('Leyendo el primer archivo...')
fs.readFile('./archivo.txt', 'utf-8').then((text) => {
  console.log(text)
})

console.log('------> Hacer cosas mientras lee el archivo...')

console.log('Leyendo el primer archivo 2...')
fs.readFile('./archivo2.txt', 'utf-8').then((text2) => {
  console.log(text2)
})
