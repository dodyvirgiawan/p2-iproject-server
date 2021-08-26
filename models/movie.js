'use strict';

const { Model } = require('sequelize')
const algoliasearch = require('algoliasearch')
const client = algoliasearch(process.env.ALGOLIA_APPLICATION_KEY, process.env.ALGOLIA_API_KEY) 
const index = client.initIndex('cineclub')

module.exports = (sequelize, DataTypes) => {
    class Movie extends Model {
        static associate(models) {
            Movie.belongsToMany(models.Playlist, {through: models.PlaylistMovie, foreignKey: 'MovieId'})
        }
    };
    Movie.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Title is required'
                },
                notEmpty: {
                    msg: 'Title is required'
                }
            }
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Genre is required'
                },
                notEmpty: {
                    msg: 'Genre is required'
                }
            }
        },
        runtime: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Runtime is required'
                },
                notEmpty: {
                    msg: 'Runtime is required'
                },
                isNumeric: {
                    msg: 'Runtime must be in numeric format'
                }
            }
        },
        director: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Director is required'
                },
                notEmpty: {
                    msg: 'Director is required'
                }
            }
        },
        imdbRating: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'IMDB Rating is required'
                },
                notEmpty: {
                    msg: 'IMDB Rating is required'
                },
                isNumeric: {
                    msg: 'IMDB Rating must be in numeric format'
                }
            }
        },
        posterUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Poster URL is required'
                },
                notEmpty: {
                    msg: 'Poster URL is required'
                },
                isUrl: {
                    msg: 'Please enter valid URL'
                }
            }
        }
    }, {
        hooks: {
            afterCreate(instance, options) {
                instance.sequelize.models.PlaylistMovie.create({
                    PlaylistId: options.playlistId,
                    MovieId: instance.id
                })
                    .then(() => {
                        instance.sequelize.models.Playlist.findOne({
                            where: { 
                                id: options.playlistId
                            },
                            order: [
                                ['createdAt', 'desc']
                            ],
                            attributes: [
                                ['id', 'objectID'], 
                                'title', 
                                'description'
                            ],
                            include: [
                                {
                                    model: instance.sequelize.models.User,
                                    as: 'author',
                                    attributes: ['first_name', 'last_name', 'email']
                                },
                                {
                                    model: instance.sequelize.models.Movie,
                                    attributes: ['title', 'genre', 'runtime', 'director', 'imdbRating', 'posterUrl'],
                                    through: {
                                        attributes: []
                                    }
                                }
                            ]
                        })
                            .then(foundPlaylist => {
                                index.saveObject(foundPlaylist, { autoGenerateObjectIDIfNotExist: true })
                            })
                    })
            }
        },
        sequelize,
        modelName: 'Movie',
    });
    return Movie;
};