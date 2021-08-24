'use strict';

const { Model } = require('sequelize');

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
            }
        },
        sequelize,
        modelName: 'Movie',
    });
    return Movie;
};