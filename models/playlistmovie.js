'use strict';

const { Model } = require('sequelize');

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
        sequelize,
        modelName: 'PlaylistMovie',
    });
    return PlaylistMovie;
};