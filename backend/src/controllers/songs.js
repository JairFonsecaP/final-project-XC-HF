const { favorites } = require("../database/models");
const { DISCOGS_TOKEN } = require("../config/config");
const axios = require("axios");
responseObject = { code: 200, type: "", description: "" };

exports.addSongAsFavorite = async (req, res) => {
    try {
        //TODO validate parameters
        const response = await favorites.create(req.body);
        if (response) {
            res.status(201).json(response);
        } else {
            responseObject.code = 400;
            responseObject.type = "error";
            responseObject.description = "Error adding song as favorite";
            res.status(400).json(responseObject);
        }
    } catch (e) {
        responseObject.code = 500;
        responseObject.type = "error";
        responseObject.description = "Error adding favorite song. " + e.message;
        res.status(500).json(responseObject);
    }
};

exports.getSongByName = async (req, res) => {
    try {
        //TODO validate parameters
        const { data } = await axios.get(
            `https://api.discogs.com/database/search?token=${DISCOGS_TOKEN}&track=${req.params.name}`
        );

        if (data.results.length > 0) {
            res.status(200).json(data);
        } else {
            responseObject.code = 404;
            responseObject.type = "error";
            responseObject.description = "Song not found. No results.";
            res.status(404).json(responseObject);
        }
    } catch (e) {
        responseObject.code = 500;
        responseObject.type = "error";
        responseObject.description = "Error getting song by name. " + e.message;
        res.status(500).json(responseObject);
    }
};

exports.getFavorites = async (req, res) => {
    try {
        //TODO validate parameters
        const response = await favorites.findAll({ where: { item_type: 1 } });
        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            responseObject.code = 404;
            responseObject.type = "message";
            responseObject.description = "No results.";
            res.status(404).json(responseObject);
        }
    } catch (e) {
        responseObject.code = 500;
        responseObject.type = "error";
        responseObject.description =
            "Error getting favorite songs. " + e.message;
        res.status(500).json(responseObject);
    }
};

exports.deleteFavorite = async (req, res) => {
    try {
        //TODO validate parameters
        const response = await favorites.destroy({
            where: { master_id: req.params.id }
        });

        if (response != 0) {
            responseObject.code = 200;
            responseObject.type = "message";
            responseObject.description = "Song deleted successfully!";
            res.status(200).json(responseObject);
        } else {
            responseObject.code = 404;
            responseObject.type = "message";
            responseObject.description =
                "Error deleting favorite song. Song not found.";
            res.status(404).json(responseObject);
        }
    } catch (e) {
        responseObject.code = 500;
        responseObject.type = "error";
        responseObject.description =
            "Error deleting favorite song. " + e.message;
        res.status(500).json(responseObject);
    }
};
