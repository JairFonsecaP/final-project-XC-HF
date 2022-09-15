'use strict';

/**
 * Importations
 */
const express = require('express');
const app = express();
const router = require('./src/routes/index');
const cors = require('cors');
const morgan = require('morgan');

/**
 * Port in dev
 */
const port = 8080;

/**
 * Shows in console all petitions and code of response
 */
app.use(morgan('dev'));

/**
 * Allows Cross-Origin Resource Sharing
 */
app.use(cors());

/**
 * Returns middleware that parses both json and urlencoded. The options are passed to both middleware.
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * Uses a router
 */
app.use('/v1/api', router);

/**
 * Finds and sets an enviroment varibale "PORT" or use a port for dev
 */
app.set('port', process.env.PORT || port);

/**
 * Runs the application
 */
if (process.env.NODE_ENV !== 'test') {
    app.listen(app.get('port'), () => {
        console.log(`Server on port ${app.get('port')}`);
    });
}

module.exports = app;
