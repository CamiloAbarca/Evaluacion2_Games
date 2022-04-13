class GamesDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, nameGame, plataform, detail, created_at FROM games')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, nameGame, plataform, detail, created_at FROM games WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (game) {
    const response = await this.db.query('INSERT INTO games (nameGame, plataform, detail) VALUES (?, ?, ?)', [game.nameGame, game.plataform, game.detail])
    const result = response[0]
    return result.insertId
  }

  async update (game) {
    const response = await this.db.query('UPDATE games SET nameGame = ?, plataform = ?, detail = ? WHERE id = ?', [game.nameGame, game.plataform, game.detail, game.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM games WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = GamesDAO
