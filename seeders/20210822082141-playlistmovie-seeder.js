'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('PlaylistMovies', [
            {
                PlaylistId: 1,
                MovieId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                PlaylistId: 1,
                MovieId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                PlaylistId: 2,
                MovieId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                PlaylistId: 2,
                MovieId: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                PlaylistId: 2,
                MovieId: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('PlaylistMovies', null, {})
    }
};
