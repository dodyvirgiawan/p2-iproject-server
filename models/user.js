'use strict';

const { Model } = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Playlist, {foreignKey: 'UserId'})
            User.hasMany(models.Comment, {foreignKey: 'UserId'})
        }
    };
    User.init({
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'First name is required'
                },
                notEmpty: {
                    msg: 'First name is required'
                }
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Last name is required'
                },
                notEmpty: {
                    msg: 'Last name is required'
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'E-mail is required'
                },
                notEmpty: {
                    msg: 'E-mail is required'
                },
                isEmail: {
                    msg: 'Please enter valid e-mail'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Password is required'
                },
                notEmpty: {
                    msg: 'Password is required'
                },
                len: {
                    args: [5, 50],
                    msg: 'Minimum required password length is 5 characters'
                }
            }
        }
    }, {
        hooks: {
            beforeCreate(instance) {
                instance.password = hashPassword(instance.password)
            }
        },
        sequelize,
        modelName: 'User',
    });
    return User;
};