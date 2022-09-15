'use strict';
module.exports = {
    // Credential for development db
    development: {
        username: 'test',
        password: 'test',
        database: 'musicplaylist',
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    },
    // Credential for test db
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false
    },
    // Credential for production db
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false
    }
};
