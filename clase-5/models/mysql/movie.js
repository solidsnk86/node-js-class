import mysql from 'mysql2/promise'

const DEFFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'miPerroMañosoNeo.2018',
  database: 'moviesdb'
}

const connectionString = process.env.DATABASE_URL ?? DEFFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )

      if (genres.length === 0) return []

      const [{ id }] = genres

      return [id]
    }

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) FROM movie;'
    )
    if (movies.length === 0) return null

    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query(
      `SELECT title, year, director, poster, rate, BIN_TO_UUID(id) 
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
    )
    return movies[0]
  }

  static async create ({ input }) {
    const {
      genre: genreInput, // genre is an array
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    // todo: crear la conexión de genre
    try {
      const [genre] = await connection.query('SELECT name FROM genre WHERE name = ?', [genreInput])
      if (genre.affectedRows === 0) {
        return []
      }
      if (genre) {
        return genre[0]
      }
    } catch (e) {
      throw new Error('Error to get genre movie')
    }

    // crypto.randomUUID()
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
          VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
        [title, year, director, duration, poster, rate]
      )
    } catch (e) {
      // puede enviarle información sensible
      throw new Error('Error creating movie')
      // enviar la traza a un servicio interno
      // sendLog(e)
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {
    try {
      const [result] = await connection.query(`
        DELETE FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
      )

      if (result.affectedRows === 0) {
        throw new Error('Movie not found')
      }

      return { message: 'Movie deleted successfully' }
    } catch (e) {
      throw new Error('Error deleting movie')
    }
  }

  static async update ({ id, input }) {
    const {
      genre,
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input

    try {
      // La función COALESCE en SQL devuelve el primer valor no nulo de una lista de expresiones.
      const [result] = await connection.query(`
        UPDATE movie 
        SET title = COALESCE(?, title),
            year = COALESCE(?, year),
            director = COALESCE(?, director),
            genre = COALESCE(?, genre),
            duration = COALESCE(?, duration),
            poster = COALESCE(?, poster),
            rate = COALESCE(?, rate)
        WHERE id = UUID_TO_BIN(?);`,
      [title, year, director, genre, duration, poster, rate, id]
      )

      if (result.affectedRows === 0) {
        throw new Error('Movie not found')
      }

      const [updatedMovies] = await connection.query(`
        SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
        FROM movie WHERE id = UUID_TO_BIN(?);`,
      [id]
      )

      return updatedMovies[0]
    } catch (e) {
      throw new Error('Error updating movie')
    }
  }
}
