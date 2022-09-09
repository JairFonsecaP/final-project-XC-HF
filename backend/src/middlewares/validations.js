'use strict';
const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const { Users } = require('../database/models');

const validation = {
    /**
     *To valid registration form
     */
    register: [
        body('name').notEmpty().withMessage('You must to enter a name'),
        body('username').notEmpty().withMessage('You must to enter a username'),
        body('password').notEmpty().withMessage('You must to enter a password'),
        body('password2')
            .notEmpty()
            .withMessage('You must to enter a the password confirmation')
            .custom((_, { req }) => {
                if (req.body.password !== req.body.password2) {
                    throw new Error('Both password must to be the same');
                }
                return true;
            })
    ],
    login: [
        body('username').notEmpty().withMessage('You must to enter a username'),
        body('password').notEmpty().withMessage('You must to enter a password')
    ]
};

const verifyValidator = (req, res, next) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        res.status(400).json(resultValidation);
        return;
    }
    next();
};

const existUser = async (req, res, next) => {
    try {
        const user = await Users.findOne({
            where: { username: req.body.username }
        });
        if (user) {
            res.status(409).json({
                errors: [
                    {
                        msg: 'The username already exists, please try another one',
                        param: 'username'
                    }
                ]
            });
            return;
        }
        next();
    } catch (e) {
        res.status(500).json({
            errors: [
                {
                    msg: e.message,
                    param: 'server'
                }
            ]
        });
    }
};

module.exports = { validation, verifyValidator, existUser };
