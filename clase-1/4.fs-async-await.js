/*
 const { promisify } = require('node:util'); Esto es para los módulos nativos
 const readFile = promisify(fs.readFile())   que no tienen promesas nativas
*/
const { readFile } = require('node:fs/promises')

async function init () {
  console.log('Leyendo el primer archivo...')
  const text = await readFile('./archivo.txt', 'utf-8')
  console.log(text)

  console.log('------> Hacer cosas mientras lee el archivo...')

  console.log('Leyendo el primer archivo 2...')
  const secondText = await readFile('./archivo2.txt', 'utf-8')
  console.log(secondText)
}

init()
