const { User, Playlist } = require('../models')
const { verifyToken } = require('../helpers/jwt.js')

async function authentication(req, res, next) {
    try {
        const { access_token } = req.headers
        const payload = verifyToken(access_token)

        if(!payload) {
            throw({name: 'InvalidToken'})
        } else {
            const { id, first_name, last_name, email } = payload

            const foundUser = await User.findOne({ where: { id, email }})

            if(!foundUser) {
                throw({name: 'InvalidToken'})
            } else {
                req.user = {
                    id,
                    first_name,
                    last_name,
                    email
                }

                next()
            }
        }
    } catch (err) {
        next(err)
    }
}

async function playlistAuthorization(req, res, next) {
    try {
        const playlistId = +req.params.id
        const foundPlaylist = await Playlist.findByPk(playlistId)

        if(!foundPlaylist) {
            throw({name: 'PlaylistNotFound'})
        } else {
            if(foundPlaylist.UserId !== req.user.id) {
                throw({name: 'PlaylistUnauthorized'})
            } else {
                next()
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { authentication, playlistAuthorization }
