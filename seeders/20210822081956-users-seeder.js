'use strict';

const { hashPassword } = require('../helpers/bcrypt.js')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                first_name: 'John',
                last_name: 'Doe',
                email: 'johndoe@email.com',
                password: hashPassword('johndoe'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                first_name: 'Amy',
                last_name: 'May',
                email: 'amymay@email.com',
                password: hashPassword('amymay'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                first_name: 'Joey',
                last_name: 'Tribbiani',
                email: 'joeytribbiani@email.com',
                password: hashPassword('joeytribbiani'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                first_name: 'Rachel',
                last_name: 'Greene',
                email: 'rachelgreene@email.com',
                password: hashPassword('rachelgreene'),
                createdAt: new Date(),
                updatedAt: new Date()
            },
       ], {})
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {})
    }
};
