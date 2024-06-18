const express = require('express')
const ditto = require('./pokemon/ditto.json')

const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 1234

const formatDate = (string) => {
  const date = new Date(string).toLocaleDateString('es-Es', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })
  return date
}

app.use(express.json())

// La magia de Express por detrás:
// app.use('/pokemon/*', (req, res, next) => {
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   // Solo llegan request que son POST y que tienen el header Content-Type: application/json
//   let body = ''

//   // Escuchar el evento data
//   req.on('data', (chunk) => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = formatDate(Date.now())
//     // mutar la request y meter la información en el req.body
//     req.body = data
//     next()
//   })
// })

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // Aquí deberíamos guardar en base de datos
  res.status(201).json(req.body)
})

// Último paso a chquear si todo NO va bien (404)
app.use((req, res) => {
  res
    .status(404)
    .send(
      '<img src="https://imgs.search.brave.com/W21YmRCFByF80L488uX9UXNvEOo9aLlwCf8UICiM9EI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMw/MjMzMzMzMS9waG90/by9lcnJvci00MDQt/M2QtcmVuZGVyaW5n/LXBhZ2UtY29uY2Vw/dC5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9aldYN04yVVJr/YUItREdwYmNub2Ns/WFJGZHdzRzBDNzhF/bVdXX3ZfY1pDRT0" width="auto" height="auto" style="justify-content: center; margin: 100px auto; display: flex;" />'
    )
})

app.listen(PORT, () => {
  console.log(`server listening in port http://localhost:${PORT}`)
})
