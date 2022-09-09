'use strict';
const router = require('express').Router();
const artistApi = require('./api/artist');
const usersApi = require('./api/users');
const albumApi = require('./api/album');
const songApi = require('./api/song');

router.use('/artist', artistApi);
router.use('/user', usersApi);
router.use('/album', albumApi);
router.use('/song', songApi);

module.exports = router;
