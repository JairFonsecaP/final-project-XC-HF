'use strict';
const axios = require('axios');
const { DISCOGS_TOKEN } = require('../config/config');

exports.search = async (req, res) => {
    try {
        const { data } = await axios.get(`https://api.discogs.com/database/search?token=${DISCOGS_TOKEN}&release_title=${req.params.name}`);

        let response = data.results.filter((one) => one.format && one.format.includes('Album'));
        response = {
            pagination: {
                items: response.length
            },
            results: response
        };
        res.status(200).json(response);
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
