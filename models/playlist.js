'use strict';

const { Model } = require('sequelize');

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
        sequelize,
        modelName: 'Playlist',
    });
    return Playlist;
};