'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Comments', [
            {
                PlaylistId: 1,
                UserId: 3,
                comment: 'Wow! Awesome list! Will be sure to watch with my family during the weekend.',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                PlaylistId: 1,
                UserId: 4,
                comment: 'Great collections!',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                PlaylistId: 2,
                UserId: 4,
                comment: 'After watching these movies, I feel really terrified :( But awesome list nonetheless! Thank you!',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                PlaylistId: 2,
                UserId: 1,
                comment: 'Wow! Those movies are really scary, will recommend this one to my friends as well. Thanks!!',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Comments', null, {})
    }
};
