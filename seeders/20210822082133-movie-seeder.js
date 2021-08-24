'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Movies', [
            {
                title: 'Blade Runner 2049',
                genre: 'Action',
                runtime: 164,
                director: 'Denis Villeneuve',
                imdbRating: 8,
                posterUrl: 'https://upload.wikimedia.org/wikipedia/id/f/f2/Blade_Runner_2049_Poster.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Ready Player One',
                genre: 'Science Fiction',
                runtime: 140,
                director: 'Steven Spielberg',
                imdbRating: 7.4,
                posterUrl: 'https://upload.wikimedia.org/wikipedia/id/0/0c/Ready_player_one_ver2_xlg.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'The Babadook',
                genre: 'Horror',
                runtime: 94,
                director: 'Jennifer Kent',
                imdbRating: 6.8,
                posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTk0NzMzODc2NF5BMl5BanBnXkFtZTgwOTYzNTM1MzE@._V1_FMjpg_UX1000_.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'The Shining',
                genre: 'Horror',
                runtime: 146,
                director: 'Stanley Kubrick',
                imdbRating: 8.4,
                posterUrl: 'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Hereditary',
                genre: 'Horror',
                runtime: 89,
                director: 'Ari Aster',
                imdbRating: 7.3,
                posterUrl: 'https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_FMjpg_UX1000_.jpg',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Movies', null, {})
    }
};
