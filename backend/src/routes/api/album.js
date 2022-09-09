'use strict';
const router = require('express').Router();
const albumController = require('../../controllers/albumController');

router.get('/search/:name', albumController.search);

module.exports = router;
