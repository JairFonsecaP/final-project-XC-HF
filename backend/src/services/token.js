'use strict';
const jwt = require('jsonwebtoken');
const { Users } = require('../database/models');
const { SECRET_TOKEN } = require('../config/config');

const expiration = 24 * 60 * 60;

module.exports = {
    /**
     *Creates a token signed by jwt
     * @param {string || Number} id
     * @param {string} username
     * @returns String Token
     */
    encode: (id, username) => {
        const token = jwt.sign(
            {
                id,
                username
            },
            SECRET_TOKEN,
            { expiresIn: expiration }
        );
        return token;
    },

    /**
     * Checks if a token is valid and the user exists in db
     * @param {string} token
     * @returns user or boolean
     */
    decode: async (token) => {
        try {
            const { id } = await jwt.verify(token, SECRET_TOKEN);
            const user = await Users.findByPk(id, { raw: true, netf: true });
            delete user.password;
            return user || false;
        } catch (e) {
            return false;
        }
    }
};
