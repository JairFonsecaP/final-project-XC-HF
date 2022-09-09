'use strict';
const { Users } = require('../database/models');
const bcrypt = require('bcryptjs');
const { encode } = require('../services/token');

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

exports.login = async (req, res) => {
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
