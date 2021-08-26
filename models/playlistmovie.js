'use strict';

const { Model } = require('sequelize');
const algoliasearch = require('algoliasearch')
const client = algoliasearch(process.env.ALGOLIA_APPLICATION_KEY, process.env.ALGOLIA_API_KEY) 
const index = client.initIndex('cineclub')

module.exports = (sequelize, DataTypes) => {
    class PlaylistMovie extends Model {
        static associate(models) {
            // define association here
        }
    };
    PlaylistMovie.init({
        PlaylistId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Playlist Id is required'
                },
                notEmpty: {
                    msg: 'Playlist Id is required'
                }
            }
        },
        MovieId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Movie Id is required'
                },
                notEmpty: {
                    msg: 'Movie Id is required'
                }
            }
        }
    }, {
        hooks: {
            afterDestroy(instance, options) {
                instance.sequelize.models.Playlist.findOne({
                    where: { 
                        id: options.PlaylistId
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
            }
        },
        sequelize,
        modelName: 'PlaylistMovie',
    });
    return PlaylistMovie;
};