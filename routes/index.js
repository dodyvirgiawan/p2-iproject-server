const router = require('express').Router()
const authRouter = require('./authRoutes.js')
const playlistRouter = require('./playlistRoutes.js')
const playlistMovieRouter = require('./playlistMovieRoutes.js')
const movieRouter = require('./movieRoutes.js')
const errorHandler = require('../middlewares/errorHandler.js')

router.use('/', authRouter)
router.use('/playlists', playlistRouter)
router.use('/playlistmovies', playlistMovieRouter)
router.use('/movies', movieRouter)
router.use(errorHandler)

module.exports = router