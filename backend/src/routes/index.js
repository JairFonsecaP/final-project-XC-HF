'use strict';
const router = require('express').Router();

const usersApi = require('./api/users');
const albumApi = require('./api/album');

router.use('/user', usersApi);
router.use('/album', albumApi);

module.exports = router;
