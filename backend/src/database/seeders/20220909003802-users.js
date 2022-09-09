'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const date = new Date();
        await queryInterface.bulkInsert(
            'Users',
            [
                {
                    name: 'Test',
                    username: 'test',
                    password:
                        '$2a$10$4mGitGojraStEcvOReLCzOXmgrWtmUm7vDG3A9G6wB23LLz4H4zUu',
                    createdAt: date,
                    updatedAt: date
                }
            ],
            {}
        );
        /**
         * Add seed commands here.
         *
         * Example:
         *
         */
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
