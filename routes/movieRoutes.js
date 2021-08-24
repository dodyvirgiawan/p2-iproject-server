const router = require('express').Router()
const Controller = require('../controllers/movieController.js')
const { authentication, playlistAuthorization } = require('../middlewares/auth.js')

router.use(authentication)

router.post('/playlist/:id', playlistAuthorization, Controller.addMovieToPlaylist)

module.exports = router