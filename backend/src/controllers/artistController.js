'use strict';
const axios = require('axios');
const DISCOGS_TOKEN = require('../config/config').DISCOGS_TOKEN;

/**
 * @param {*} req
 * @param {*} res
 */
exports.list = async (req, res) => {
    try {
        let page = 1;
        let perPage = 12;
        if (req.params.perPage) {
            perPage = req.params.perPage;
        }
        if (req.params.page) {
            page = req.params.page;
        }
        const { data } = await axios.get(
            `https://api.discogs.com/database/search?page=${page}&per_page=${perPage}&token=${DISCOGS_TOKEN}`
        );

        delete data.pagination.urls;
        delete data.pagination.items;
        data.pagination.total = data.pagination.pages * data.pagination.per_page;
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({
            errors: [
                {
                    msg: e.message,
                    param: 'Internal server'
                }
            ]
        });
    }
};

/**
 * @param {*} req
 * @param {*} res
 */
exports.findOne = async (req, res) => {
    try {
        const name = req.params.artist;
        const query = `https://api.discogs.com/database/search?artist=${name}&country=canada&token=${DISCOGS_TOKEN}`;

        const list = await axios.get(query);
        res.status(200).json(list.data.results);
    } catch (e) {
        res.status(500).json({
            errors: [
                {
                    msg: e.message,
                    param: 'Internal server'
                }
            ]
        });
    }
};
