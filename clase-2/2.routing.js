const http = require('node:http')
const dittoJSON = require('./pokemon/ditto.json')

const PORT = process.env.PORT ?? 3003
function formatDate (string) {
  const date = new Date(string).toLocaleDateString('es-Es', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })
  return date
}

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8') // Corregido el encabezado
          return res.end(JSON.stringify(dittoJSON))
        case '/about':
          res.statusCode = 200 // Añadido el estado de respuesta
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>About</h1>') // Añadido contenido para /about
        default:
          res.statusCode = 400
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>400</h1>')
      }

    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          // Escuchar el evento data
          req.on('data', (chunk) => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // Llamar a una base de datos para guardar la info
            res.writeHead(201, {
              'Content-Type': 'application/json; charset=utf-8'
            })
            data.timestamp = formatDate(Date.now())
            res.end(JSON.stringify(data))
          })
          break // Añadido el break para salir del case
        }
      }
      break

    default:
      res.statusCode = 405 // Añadido manejo de métodos no permitidos
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return res.end('<h1>405 - Method Not Allowed</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
