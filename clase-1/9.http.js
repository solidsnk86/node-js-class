const http = require('node:http')
const { findAvalaiblePort } = require('./10.free-port')

const desairdePort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('Request received')
  res.end(`
  Hoy es ${new Date().toLocaleDateString('es-Es', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })}
  `)
})

findAvalaiblePort(desairdePort).then((port) => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
})
