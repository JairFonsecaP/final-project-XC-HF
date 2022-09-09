const router = require('express').Router();
const { verifyUser } = require('../../middlewares/auth/auth');
const songsController = require('../../controllers/artistController');

router.get('/list/:page?/:perPage?', verifyUser, songsController.list);
router.get('/one/:artist', songsController.findOne);

module.exports = router;
