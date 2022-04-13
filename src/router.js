const express = require('express')
const GamesController = require('./controllers/GamesController')
const PageController = require('./controllers/PageController')
const SqlClient = require('./lib/SqlClient')

const router = express.Router()

// Database Client
const sqlClient = new SqlClient()

// Controllers
const pageController = new PageController()
const gamesController = new GamesController(sqlClient)

// Routes
router.get('/', gamesController.renderHomeWithGames)
router.get('/about', pageController.renderAbout)

router.get('/games/create/', gamesController.renderGameCreationForm)
router.post('/games/create/', gamesController.insertAndRenderGame)

router.get('/games/:id', gamesController.renderSingleGame)

router.get('/games/:id/update', gamesController.renderGameUpdateForm)
router.post('/games/:id/update', gamesController.updateAndRenderGame)

router.post('/games/:id/delete', gamesController.deleteGameAndRenderResponse)

router.get('*', pageController.renderNotFound)

module.exports = router
