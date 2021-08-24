const { Playlist, User, Comment, Movie } = require('../models')

class PlaylistController {
    static async getAllPlaylists(req, res, next) {
        try {
            const playlists = await Playlist.findAll({
                order: [
                    ['createdAt', 'desc']
                ],
                attributes: {
                    exclude: ['UserId', 'updatedAt']
                },
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['first_name', 'last_name', 'email']
                    },
                    {
                        model: Comment,
                        attributes: ['comment', 'createdAt'],
                        include: {
                            model: User,
                            as: 'author',
                            attributes: ['first_name', 'last_name', 'email']
                        }
                    },
                    {
                        model: Movie,
                        attributes: ['title', 'genre', 'runtime', 'director', 'imdbRating', 'posterUrl'],
                        through: {
                            attributes: []
                        }
                    }
                ]
            })

            res.status(200).json(playlists)
        } catch (err) {
            next(err)
        }
    }

    static async addPlaylist(req, res, next) { //! First initial creation of playlist + included movie (source from API)
        try {
            const { playlist_title, playlist_description, movie_title, movie_genre, movie_runtime, movie_director, movie_imdbRating, movie_posterUrl } = req.body

            const createdPlaylist = await Playlist.create({
                title: playlist_title, 
                description: playlist_description, 
                UserId: req.user.id
            })

            await Movie.create({ 
                    title: movie_title, 
                    genre: movie_genre, 
                    runtime: movie_runtime, 
                    director: movie_director, 
                    imdbRating: movie_imdbRating, 
                    posterUrl: movie_posterUrl 
                },
                {
                    playlistId: createdPlaylist.id
                }
            )

            res.status(201).json({message: `${movie_title} has been successfully added to the playlist`})
        } catch (err) {
            next(err)
        }
    }

    static async getUserPlaylist(req, res, next) {
        try {
            const playlists = await Playlist.findAll({
                order: [
                    ['createdAt', 'desc']
                ],
                attributes: {
                    exclude: ['updatedAt']
                },
                include: [
                    {
                        model: User,
                        as: 'author',
                        where: {
                            email: req.user.email
                        },
                        attributes: ['first_name', 'last_name', 'email']
                    },
                    {
                        model: Comment,
                        attributes: ['comment', 'createdAt'],
                        include: {
                            model: User,
                            as: 'author',
                            attributes: ['first_name', 'last_name', 'email']
                        }
                    },
                    {
                        model: Movie,
                        attributes: ['title', 'genre', 'runtime', 'director', 'imdbRating', 'posterUrl'],
                        through: {
                            attributes: []
                        }
                    }
                ]
            })

            res.status(200).json(playlists)

        } catch (err) {
            next(err)
        }
    }

    static async getPlaylistById(req, res, next) {
        try {
            const id = req.params.id

            const foundPlaylist = await Playlist.findOne({
                where: { 
                    id 
                },
                order: [
                    ['createdAt', 'desc']
                ],
                attributes: {
                    exclude: ['UserId', 'updatedAt']
                },
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['first_name', 'last_name', 'email']
                    },
                    {
                        model: Comment,
                        attributes: ['comment', 'createdAt'],
                        include: {
                            model: User,
                            as: 'author',
                            attributes: ['first_name', 'last_name', 'email']
                        }
                    },
                    {
                        model: Movie,
                        attributes: ['title', 'genre', 'runtime', 'director', 'imdbRating', 'posterUrl'],
                        through: {
                            attributes: []
                        }
                    }
                ]
            })

            if(!foundPlaylist) {
                throw({name: 'PlaylistNotFound'})
            } else {
                res.status(200).json(foundPlaylist)
            }
        } catch (err) {
            next(err)
        }
    }

    static async editPlaylist(req, res, next) {
        try {
            const { title, description } = req.body
            const playlistId = +req.params.id
            
            const foundPlaylist = await Playlist.findByPk(playlistId)

            if(!foundPlaylist) {
                throw({name: 'PlaylistNotFound'})
            } else {
                await Playlist.update({title, description}, {
                    where: { 
                        id: playlistId 
                    },
                    individualHooks: true
                })

                res.status(200).json({message: 'Playlist successfully updated!'})
            }
        } catch (err) {
            next(err)
        }
    }

    static async addComments(req, res, next) {
        try {
            const { comment } = req.body
            const playlistId = +req.params.id

            const foundPlaylist = await Playlist.findByPk(playlistId)

            if(!foundPlaylist) {
                throw({name: 'PlaylistNotFound'})
            } else {
                await Comment.create({PlaylistId: playlistId, UserId: req.user.id, comment})
                res.status(201).json({message: `Your comment has been successfully added!`})
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = PlaylistController