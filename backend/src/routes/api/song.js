'use strict';
const router = require('express').Router();
const { verifyUser } = require('../../middlewares/auth/auth');
const songController = require('../../controllers/songController');

router.get('/search/:name', verifyUser, songController.search);
router.get('/all', verifyUser, songController.getAll);
router.post('/new', verifyUser, songController.add);
router.delete('/delete/:item', verifyUser, songController.deleteFav);

module.exports = router;
