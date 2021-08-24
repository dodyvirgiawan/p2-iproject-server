const router = require('express').Router()
const Controller = require('../controllers/playlistMovieController.js')
const { authentication, playlistAuthorization } = require('../middlewares/auth.js')

router.use(authentication)

router.delete('/:id/movies/:movieId', playlistAuthorization, Controller.removeMovieFromPlaylist)

module.exports = router