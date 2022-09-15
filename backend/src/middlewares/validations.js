'use strict';
const { body } = require('express-validator');
const { validationResult } = require('express-validator');
const { Users, Playlist } = require('../database/models');

const { decode } = require('../services/token');

/**
 * Validation object of express  validation
 */
const validation = {
    /**
     * Validates if all required fields aren't empty and both password are the same
     * Uses express-validator
     *
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
    /**
     * Validates if all required fields aren't empty
     * Uses express-validator
     */
    login: [
        body('username').notEmpty().withMessage('You must to enter a username'),
        body('password').notEmpty().withMessage('You must to enter a password')
    ]
};

/**
 * Checks if errors exist otherwise allows petition cointinues
 * @param {Array} req.errors
 * @returns 400 and errors
 */
const verifyValidator = (req, res, next) => {
    const resultValidation = validationResult(req);
    if (resultValidation.errors.length > 0) {
        res.status(400).json(resultValidation);
        return;
    }
    next();
};

/**
 * Checks on db if the user exists, otherwise allows petition cointinues
 * @param {string} req.body.username
 * @returns 409 if user exists and returns error
 */
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

/**
 * Checks on db if the album was stored for the same user, otherwise allows petition cointinues
 * @param {string} req.headers.token
 * @param {Number} req.body.itemId
 * @returns 409
 * */
const existFavoriteAlbum = async (req, res, next) => {
    try {
        const { id } = await decode(req.headers.token);
        const favorite = await Playlist.findOne({
            where: { typeId: 1, itemId: req.body.itemId, userId: id }
        });
        if (favorite) {
            res.status(409).json({
                errors: [
                    {
                        msg: 'The favorite already exists, please try another one',
                        param: 'favorite Album'
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

module.exports = { validation, verifyValidator, existUser, existFavoriteAlbum };
