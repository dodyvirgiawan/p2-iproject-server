'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            Comment.belongsTo(models.User, {as: 'author', foreignKey: 'UserId'})
            Comment.belongsTo(models.Playlist, {foreignKey: 'PlaylistId'})
        }
    };
    Comment.init({
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
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please type the comment'
                },
                notEmpty: {
                    msg: 'Please type the comment'
                }
            }
        },
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};