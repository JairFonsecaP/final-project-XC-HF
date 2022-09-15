'use strict';
const router = require('express').Router();

/**
 * Imports controllers
 */
const userController = require('../../controllers/userController');
const validations = require('../../middlewares/validations');

/**
 * Route {/v1/api/user/register}
 * Method POST for registing  a new user.
 * Uses validations.register middleware which validate all fields
 * Uses existUser middleware which search others users with the same "Username"
 * Uses Register controller for resolving the petition
 */
router.post(
    '/register',
    validations.validation.register,
    validations.verifyValidator,
    validations.existUser,
    userController.register
);

/**
 * Route {/v1/api/user/login}
 * Method POST for login an user.
 * Uses validations.login middleware which validate all fields
 * Uses login controller for resolving the petition
 */
router.post(
    '/login',
    validations.validation.login,
    validations.verifyValidator,
    userController.login
);

module.exports = router;
