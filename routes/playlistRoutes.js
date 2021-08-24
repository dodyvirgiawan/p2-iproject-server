const router = require('express').Router()
const Controller = require('../controllers/playlistController.js')
const { authentication, playlistAuthorization } = require('../middlewares/auth.js')

router.use(authentication)

router.get('/', Controller.getAllPlaylists)
router.post('/', Controller.addPlaylist)
router.get('/user', Controller.getUserPlaylist)
router.get('/:id', Controller.getPlaylistById)
router.patch('/:id', playlistAuthorization, Controller.editPlaylist)
router.post('/:id/comments', Controller.addComments)

module.exports = router