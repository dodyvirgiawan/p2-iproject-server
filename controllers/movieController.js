const { Movie } = require('../models')

class MovieController {
    static async addMovieToPlaylist(req, res, next) {  //? Add movie after initial creation (Source can be either from Manual Input or OMDB Api, bebas tergantung front end)
        try {
            const { title, genre, runtime, director, imdbRating, posterUrl } = req.body
            const playlistId = +req.params.id

            await Movie.create(
                { 
                    title, 
                    genre, 
                    runtime, 
                    director, 
                    imdbRating, 
                    posterUrl 
                },
                {
                    playlistId
                }
            )

            res.status(201).json({message: `${title} has been succesfully added to the playlist!`})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = MovieController