import mysql from 'mysql2/promise'

const DEFFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '',
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
      // genre: genreInput,
      title,
      year,
      duration,
      director,
      poster,
      rate
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(`
        INSERT INTO movie (id, title, year, director, duration, poster, rate)
        VALUES (UUID_TO_BIN("${uuid}")?, ? ,?, ?, ?, ?);,`,
      [title, year, duration, director, poster, rate]
      )
    } catch (e) {
      throw new Error('Error creating movie')
      // Se pódría enviar el error a una traza o un servicio interno
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
       FROM movies WHERE id = UUID_TO_BIN(?);`, [uuid]
    )

    return movies[0]
  }

  static async delete ({ id }) {}

  static async update ({ id, input }) {}
}
