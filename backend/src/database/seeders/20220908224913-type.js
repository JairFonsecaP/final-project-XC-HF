'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const date = new Date();
        return queryInterface.bulkInsert('Type', [
            {
                type: 'Song',
                createdAt: date,
                updatedAt: date
            },
            {
                type: 'Album',
                createdAt: date,
                updatedAt: date
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Type', null, {});
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
