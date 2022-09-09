const jwt = require('jsonwebtoken');
const { Users } = require('../database/models');
const { SECRET_TOKEN } = require('../config/config');

const expiration = 24 * 60 * 60;

module.exports = {
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
