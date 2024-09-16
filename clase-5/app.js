import express, { json } from 'express' // require -> commonJS
import { createMoviesRouter } from './routes/movies.js'
import 'dotenv/config'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.disable('x-powered-by')

  app.use('/movies', createMoviesRouter({ movieModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
