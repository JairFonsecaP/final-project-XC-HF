module.exports = {
    development: {
        username: 'api',
        password: 'root',
        database: 'final_project',
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: false
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false
    },
    production: {
        username: 'root',
        password: null,
        database: 'database_production',
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false
    }
};
