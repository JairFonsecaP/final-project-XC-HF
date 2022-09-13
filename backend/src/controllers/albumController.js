'use strict';
const axios = require('axios');
const { DISCOGS_TOKEN } = require('../config/config');
const { Playlist } = require('../database/models');
const { decode } = require('../services/token');

exports.addAlbumAsFavorite = async (req, res) => {
    try {
        const { id } = await decode(req.headers.token);
        const data = {
            typeId: 1,
            itemId: req.body.itemId,
            name: req.body.name,
            userId: id
        };
        const response = await Playlist.create(data);
        res.status(201).json(response);
    } catch (e) {
        res.status(500).json({
            errors: [
                {
                    msg: 'Error adding favorite album. ' + e.message,
                    param: 'Internal server'
                }
            ]
        });
    }
};

exports.getAlbumByName = async (req, res) => {
    try {
        //TODO validate parameters
        const { data } = await axios.get(
            `https://api.discogs.com/database/search?token=${DISCOGS_TOKEN}&release_title=${req.params.name}`
        );
        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({
            errors: [
                {
                    msg: 'Error getting album by name. ' + e.message,
                    param: 'Internal server'
                }
            ]
        });
    }
};

exports.getAlbumByMasterId = async (req, res) => {
    try {
        //TODO validate parameters
        const { data } = await axios.get(
            `https://api.discogs.com/masters/${req.params.id}`
        );

        res.status(200).json(data);
    } catch (e) {
        res.status(500).json({
            errors: [
                {
                    msg: 'Error getting album by Master Id. ' + e.message,
                    param: 'Internal server'
                }
            ]
        });
    }
};

exports.getFavoritesByMasterId = async (master_id) => {
    const favorites = await axios.get(
        `https://api.discogs.com/masters/${master_id}`
    );
    return favorites;
};

exports.getFavorites = async (req, res) => {
    try {
        const { id } = await decode(req.headers.token);
        let response = await Playlist.findAll(
            { raw: true, neft: true },
            { where: { typeId: 1, userId: id } }
        );

        let newResponse = [];

        for (let i = 0; i < response.length; i++) {
            const { data } = await axios.get(
                `https://api.discogs.com/database/search?token=${DISCOGS_TOKEN}&release_title=${response[i].name}`
            );

            let filtered = data.results.filter(
                (album) => album.id === response[i].itemId
            );

            filtered[0].favorite = 1;
            newResponse = [...newResponse, filtered[0]];
        }
        res.status(200).json(newResponse);
    } catch (e) {
        res.status(500).json({
            errors: [
                {
                    msg: 'Error getting favorite album. ' + e.message,
                    param: 'Internal server'
                }
            ]
        });
    }
};

exports.deleteFavorite = async (req, res) => {
    try {
        //TODO validate parameters
        const { id } = await decode(req.headers.token);
        const response = await Playlist.destroy({
            where: { itemId: req.params.id, userId: id }
        });

        if (response != 0) {
            res.status(200).json({
                success: [
                    {
                        msg: 'Album deleted successfully!',
                        param: 'Success'
                    }
                ]
            });
        } else {
            res.status(404).json({
                errors: [
                    {
                        msg: 'Error deleting favorite album. Album not found.',
                        param: 'Not found'
                    }
                ]
            });
        }
    } catch (e) {
        res.status(500).json({
            errors: [
                {
                    msg: 'Error deleting favorite album. ' + e.message,
                    param: 'Internal server'
                }
            ]
        });
    }
};
