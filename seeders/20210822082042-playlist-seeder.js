'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Playlists', [
            {
                title: 'Movie that will entertain your day',
                description: 'Hello guys! Today I will be sharing my awesome movie playlist for you to watch during weekend. For me, these movies are really great to watch, especially when you are spending your time with your family. What do you think?',
                UserId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Movies that has the best jumpscare',
                description: 'Hi ho! I will be sharing my movie playlist that involves heart-wrecking jumpscare. These movies are a must-watch if you are a fans of horror movies. These are my top recommendations so far. Do you have any other recommendation as well? Please let me know!',
                UserId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Playlists', null, {})
    }
};
