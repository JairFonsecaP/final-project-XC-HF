const token = require('../../services/token');

const error = {
    errors: [
        {
            msg: 'Please enter your credentials',
            param: 'Login'
        }
    ]
};

module.exports = {
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
