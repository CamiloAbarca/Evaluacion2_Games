const GamesDAO = require('../models/dao/GamesDAO')

class GamesController {
  constructor (db) {
    this.gamesDao = new GamesDAO(db)
    this.renderHomeWithGames = this.renderHomeWithGames.bind(this)
    this.renderSingleGame = this.renderSingleGame.bind(this)
    this.renderGameCreationForm = this.renderGameCreationForm.bind(this)
    this.renderGameUpdateForm = this.renderGameUpdateForm.bind(this)
    this.insertAndRenderGame = this.insertAndRenderGame.bind(this)
    this.updateAndRenderGame = this.updateAndRenderGame.bind(this)
    this.deleteGameAndRenderResponse = this.deleteGameAndRenderResponse.bind(this)
  }

  async renderHomeWithGames (req, res) {
    const games = await this.gamesDao.getAll()
    res.render('home', {
      games
    })
  }

  async renderSingleGame (req, res) {
    const id = req.params.id

    try {
      const game = await this.gamesDao.getById(id)

      if (!game) {
        res.status(404).render('404')
        return
      }

      res.render('game', {
        id,
        nameGame: game.nameGame,
        plataform: game.plataform,
        detail: game.detail,
        created_at: game.created_at
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderGameCreationForm (req, res) {
    res.render('game-form')
  }

  async renderGameUpdateForm (req, res) {
    const id = req.params.id

    try {
      const game = await this.gamesDao.getById(id)

      if (!game) {
        res.status(404).render('404')
        return
      }

      res.render('game-form', {
        id,
        nameGame: game.nameGame,
        plataform: game.plataform,
        detail: game.detail,
        created_at: game.created_at
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderGame (req, res) {
    const nameGame = req.body.nameGame
    const plataform = req.body.plataform
    const detail = req.body.detail

    const game = { nameGame, plataform, detail }

    try {
      const id = await this.gamesDao.create(game)

      res.redirect(`/games/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderGame (req, res) {
    const id = req.params.id
    const nameGame = req.body.nameGame
    const plataform = req.body.plataform
    const detail = req.body.detail

    try {
      const game = { nameGame, plataform, detail, id }

      await this.gamesDao.update(game)

      res.redirect(`/games/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deleteGameAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const game = await this.gamesDao.getById(id)

      if (!game) {
        res.status(404).render('404')
        return
      }

      await this.gamesDao.delete(id)

      res.render('game-deleted', {
        id,
        nameGame: game.nameGame
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = GamesController
