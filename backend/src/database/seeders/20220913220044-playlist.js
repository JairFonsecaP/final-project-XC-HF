'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const date = new Date();
        await queryInterface.bulkInsert(
            'Playlists',
            [
                {
                    typeId: 1,
                    itemId: '14860897',
                    userId: 1,
                    name: 'YHLQMDLG',
                    createdAt: date,
                    updatedAt: date
                },
                {
                    typeId: 1,
                    itemId: '12014437',
                    userId: 1,
                    name: 'La TierraDel Olvido',
                    createdAt: date,
                    updatedAt: date
                }
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
