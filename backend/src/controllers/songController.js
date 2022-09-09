'use strict';
const axios = require('axios');
const { DISCOGS_TOKEN } = require('../config/config');
const { Playlist } = require('../database/models');
const { decode } = require('../services/token');

exports.search = async (req, res) => {
    try {
        const { data } = await axios.get(
            `https://api.discogs.com/database/search?token=${DISCOGS_TOKEN}&track=${req.params.name}`
        );
        res.status(200).json(data);
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
exports.getAll = async (req, res) => {
    try {
        const { id } = await decode(req.headers.token);
        const response = await Playlist.findAll({
            where: { typeId: 1, userId: id }
        });
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
exports.add = async (req, res) => {
    try {
        const { id } = await decode(req.headers.token);
        const data = {
            typeId: req.body.typeId,
            itemId: req.body.itemId,
            userId: id
        };
        const response = await Playlist.create(data);
        res.status(201).json(response);
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
exports.deleteFav = async (req, res) => {
    try {
        const { id } = await decode(req.headers.token);
        const item = req.params.item;

        const response = Playlist.destroy({
            where: { itemId: item, userId: id }
        });
        if (response > 0) {
            res.status(200).json({
                success: [
                    {
                        msg: 'Item deleted',
                        param: 'Deleted'
                    }
                ]
            });
        } else {
            res.status(404).json({
                errors: [
                    {
                        msg: 'Item not found',
                        param: 'Data base'
                    }
                ]
            });
        }
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
