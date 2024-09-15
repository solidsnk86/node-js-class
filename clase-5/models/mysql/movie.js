import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'miPerroMañosoNeo.2018',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

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
      'SELECT title, year, director, poster, rate, BIN_TO_UUID(id) FROM movie;'
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
      genre: genreInput,
      title,
      year,
      duration,
      director,
      poster,
      rate
    } = input

    const result = await connection.query(`
    INSERT INTO movie (title, year, director, duration, poster, rate)
    VALUES (?, ? ,?, ?, ?, ?);,`,
    [title, year, duration, director, poster, rate]
    )
    console.log(result)
  }

  static async delete ({ id }) {}

  static async update ({ id, input }) {}
}
