const { PlaylistMovie, Movie } = require('../models')

class PlaylistMovieController {
    static async removeMovieFromPlaylist(req, res, next) {
        try {
            const PlaylistId = +req.params.id
            const MovieId = +req.params.movieId

            const foundPlaylistMovie = await PlaylistMovie.findOne({ where: { PlaylistId, MovieId } })

            if(!foundPlaylistMovie) {
                throw({name: 'PlaylistOrMovieNotFound'})
            } else {
                await PlaylistMovie.destroy({ where: { PlaylistId, MovieId }, individualHooks: true }, { PlaylistId })
                res.status(200).json({message: 'Movie has been successfully removed from the playlist'})
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = PlaylistMovieController