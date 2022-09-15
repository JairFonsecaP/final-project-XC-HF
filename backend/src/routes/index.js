'use strict';
/**
 * Intance a router
 */
const router = require('express').Router();

const usersApi = require('./api/users');
const albumApi = require('./api/album');

/**
 * sets a router for each model
 */
router.use('/user', usersApi);
router.use('/album', albumApi);

module.exports = router;
