'use strict';
const { Users } = require('../database/models');
const bcrypt = require('bcryptjs');
const { encode } = require('../services/token');

/**
 * Encrypts the password and save the user information on db
 * @param {string} req.body.name (required)
 * @param {string} res.body.username (required)
 * @param {string} res.body.password (required)
 * @returns {json} 201 if all is correct
 */
exports.register = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const newUser = {
            name: req.body.name,
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, salt)
        };

        await Users.create(newUser);
        res.status(201).json({
            success: { msg: 'User created, you can login now' }
        });
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
 * Searchs the user in the db, compares the passwords and returns a token if the user exists and the password id correct
 * @param {string} req.body.username
 * @param {string} res.body.password
 * @returns {json} 200 and a token if all is correct
 */
exports.login = async (req, res) => {
    // Standar error format and message
    const error = {
        errors: [
            {
                msg: 'Username or password invalid please try again.',
                param: 'login'
            }
        ]
    };

    try {
        const user = await Users.findOne({
            where: { username: req.body.username }
        });

        if (!user) {
            res.status(401).json(error);
            return;
        }

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            res.status(401).json(error);
            return;
        }
        const token = encode(user.id, user.username);
        res.status(200).json({ token });
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
