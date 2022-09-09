const router = require('express').Router();
const userController = require('../../controllers/userController');
const validations = require('../../middlewares/validations');

router.post(
    '/register',
    validations.validation.register,
    validations.verifyValidator,
    validations.existUser,
    userController.register
);
router.post(
    '/login',
    validations.validation.login,
    validations.verifyValidator,
    userController.login
);

module.exports = router;
