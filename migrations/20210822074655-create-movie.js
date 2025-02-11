'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Movies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING
            },
            genre: {
                allowNull: false,
                type: Sequelize.STRING
            },
            runtime: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            director: {
                allowNull: false,
                type: Sequelize.STRING
            },
            imdbRating: {
                allowNull: false,
                type: Sequelize.FLOAT
            },
            posterUrl: {
                allowNull: false,
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Movies');
    }
};