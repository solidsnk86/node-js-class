const path = require('node:path')

// Barras separadoras de carpetas según SO
// Win -----> \
// Unix ----> /
console.log(path.sep)

// unir rutas con path.join
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename('/tp/solidsnk-secrets/password.txt')
console.log(base)

const fileName = path.basename('/tp/solidsnk-secrets/password.txt', '.txt')
console.log(fileName)

const extension = path.extname('my.super.com.image.jpg')
console.log(extension)
