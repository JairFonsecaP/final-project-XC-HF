'use strict';
const token = require('../../services/token');

// Standar error format
const error = {
    errors: [
        {
            msg: 'Please enter your credentials',
            param: 'Login'
        }
    ]
};

module.exports = {
    /**
     * Middleware which checks if a petition has a valid token and allows continue otherwise returns errors.
     * @param {string} req.headers.token
     * @returns 401 if token doesn't exist or the token isn't valid
     */
    verifyUser: async (req, res, next) => {
        try {
            if (!req.headers.token) {
                res.status(401).json(error);
                return;
            }

            const response = await token.decode(req.headers.token);
            if (response) {
                next();
                return;
            }
            res.status(401).send(error);
        } catch (e) {
            res.status(401).send(error);
        }
    }
};
