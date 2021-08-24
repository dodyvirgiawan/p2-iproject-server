'use strict';

const { Model } = require('sequelize')
const algoliasearch = require('algoliasearch')
const client = algoliasearch(process.env.ALGOLIA_APPLICATION_KEY, process.env.ALGOLIA_API_KEY) 
const index = client.initIndex('cineclub')

module.exports = (sequelize, DataTypes) => {
    class Playlist extends Model {
        static associate(models) {
            Playlist.belongsTo(models.User, {as: 'author', foreignKey: 'UserId'})
            Playlist.hasMany(models.Comment, {foreignKey: 'PlaylistId'})
            Playlist.belongsToMany(models.Movie, {through: models.PlaylistMovie, foreignKey: 'PlaylistId'})
        }
    };
    Playlist.init({
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
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Description is required'
                },
                notEmpty: {
                    msg: 'Description is required'
                }
            }
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'User Id is required'
                },
                notEmpty: {
                    msg: 'User Id is required'
                }
            }
        }
    }, {
        hooks: {
            afterUpdate(instance, options) {
                instance.sequelize.models.Playlist.findOne({
                    where: { 
                        id: instance.id
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
        modelName: 'Playlist',
    });
    return Playlist;
};