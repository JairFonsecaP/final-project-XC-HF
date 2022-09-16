"use strict";
/**
 * Importations
 */
const axios = require("axios");
const { DISCOGS_TOKEN } = require("../config/config");
const { Playlist } = require("../database/models");
const { decode } = require("../services/token");

/**
 * Gets from discogs an album and all its details like tracklist and links to youtube
 * @param {number} req.params.id
 * @error returns 500 and a message for knowing where is the error
 * @returns 200 and a json with the information
 */
exports.detailAlbum = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.discogs.com/releases/${req.params.id}`
    );
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      errors: [
        {
          msg: "Error getting album. " + e.message,
          param: "Internal server"
        }
      ]
    });
  }
};

/**
 * Stores on db an album as favorite, verifies user by token.
 * @param {Number} req.body.itemId
 * @param {string} req.body.name
 * @param {string} req.headers.token
 * @returns 201 and a json with the information
 */
exports.addAlbumAsFavorite = async (req, res) => {
  try {
    const { id } = await decode(req.headers.token);
    const data = {
      typeId: 1,
      itemId: req.body.itemId,
      name: req.body.name,
      userId: id
    };
    await Playlist.create(data);
    res.status(201).json({
      success: { msg: "Album was added as favorite" }
    });
  } catch (e) {
    res.status(500).json({
      errors: [
        {
          msg: "Error adding favorite album. " + e.message,
          param: "Internal server"
        }
      ]
    });
  }
};

/**
 * Gets all albums wiht a name, then checks for each album if this user has it as favorite
 * @param {string} req.headers.token
 * @param {string} req.params.name
 */
exports.getAlbumByName = async (req, res) => {

    try {
        const { id } = await decode(req.headers.token);
        const { data } = await axios.get(
            `https://api.discogs.com/database/search?token=${DISCOGS_TOKEN}&release_title=${req.params.name}`
        );
        const response = await Playlist.findAll(
            { where: { userId: id } },
            { raw: true, neft: true }
        );
        console.log(response);
        let toReturn = [];
        for (let i = 0; i < data.results.length; i++) {
            let album = data.results[i];
            for (let j = 0; j < response.length; j++) {
                const save = response[j];
                console.log(save.itemId, album.id);
                if (save.itemId === album.id) {
                    album = { ...album, favorite: 1 };
                    break;
                } else {
                    album = { ...album, favorite: 0 };
                }
            }
            toReturn = [...toReturn, album];

        }
      }
      toReturn = [...toReturn, album];
    }
    res.status(200).json(toReturn);
  } catch (e) {
    res.status(500).json({
      errors: [
        {
          msg: "Error getting album by name. " + e.message,
          param: "Internal server"
        }
      ]
    });
  }
};

/**
 * Gets from db all albumns strored for this user and does a petition to discogs api for get more information for each album
 * @param {string} req.headers.token
 */
exports.getFavorites = async (req, res) => {
    try {
        const { id } = await decode(req.headers.token);

        const response = await Playlist.findAll(
            { where: { userId: id } },
            { raw: true, neft: true }
        );
        console.log(response);
        let newResponse = [];

    for (let i = 0; i < response.length; i++) {
      const { data } = await axios.get(
        `https://api.discogs.com/database/search?token=${DISCOGS_TOKEN}&release_title=${response[i].name}`
      );

      const filtered = data.results.filter(
        album => album.id === response[i].itemId
      );
      if (filtered.length > 0) {
        filtered[0].favorite = 1;
        newResponse = [...newResponse, filtered[0]];
      }
    }
    res.status(200).json(newResponse);
  } catch (e) {
    res.status(500).json({
      errors: [
        {
          msg: "Error getting favorite album. " + e.message,
          param: "Internal server"
        }
      ]
    });
  }
};

/**
 * Deletes on db the album stored
 * @param {string} req.headers.token
 * @param {number} req.params.id
 */
exports.deleteFavorite = async (req, res) => {
  try {
    const { id } = await decode(req.headers.token);
    const response = await Playlist.destroy({
      where: { itemId: req.params.id, userId: id }
    });

    if (response !== 0) {
      res.status(200).json({
        success: [
          {
            msg: "Album deleted successfully!",
            param: "Success"
          }
        ]
      });
    } else {
      res.status(404).json({
        errors: [
          {
            msg: "Error deleting favorite album. Album not found.",
            param: "Not found"
          }
        ]
      });
    }
  } catch (e) {
    res.status(500).json({
      errors: [
        {
          msg: "Error deleting favorite album. " + e.message,
          param: "Internal server"
        }
      ]
    });
  }
};
