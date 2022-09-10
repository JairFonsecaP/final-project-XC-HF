"use strict";
const axios = require("axios");
const { DISCOGS_TOKEN } = require("../config/config");
const { Playlist } = require("../database/models");
const { decode } = require("../services/token");
let responseObject = { code: 200, type: "", description: "" };

exports.addAlbumAsFavorite = async (req, res) => {
  try {
    const { id } = await decode(req.headers.token);
    const data = {
      typeId: 1,
      itemId: req.body.itemId,
      userId: id
    };
    const response = await Playlist.create(data);
    res.status(201).json(response);
  } catch (e) {
    responseObject.code = 500;
    responseObject.type = "error";
    responseObject.description = "Error adding favorite album. " + e.message;
    res.status(500).json(responseObject);
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
    responseObject.code = 500;
    responseObject.type = "error";
    responseObject.description = "Error getting album by name. " + e.message;
    res.status(500).json(responseObject);
  }
};

exports.getAlbumByMasterId = async (req, res) => {
  try {
    //TODO validate parameters
    const { data } = await axios.get(
      `https://api.discogs.com/masters/${req.params.id}`
    );
    if (data) {
      res.status(200).json(data);
    } else {
      responseObject.code = 404;
      responseObject.type = "error";
      responseObject.description = "No results.";
      res.status(404).json(responseObject);
    }
  } catch (e) {
    responseObject.code = 500;
    responseObject.type = "error";
    responseObject.description =
      "Error getting album by Master Id. " + e.message;
    res.status(500).json(responseObject);
  }
};

exports.getFavoritesByMasterId = async master_id => {
  const favorites = await axios.get(
    `https://api.discogs.com/masters/${master_id}`
  );
  return favorites;
};

exports.getFavorites = async (req, res) => {
  try {
    const { id } = await decode(req.headers.token);
    //TODO validate parameters
    let response = await Playlist.findAll(
      { raw: true, neft: true },
      { where: { typeId: 1, userId: id } }
    );

    if (response.length > 0) {
      let newResponse = [];

      for (let i = 0; i < response.length; i++) {
        const { data } = await this.getFavoritesByMasterId(response[i].itemId);
        response[i] = { ...response[i], info: data };
        newResponse.push(response[i]);
      }

      res.status(200).json(newResponse);
    } else {
      res.status(200).json(response);
    }
  } catch (e) {
    responseObject.code = 500;
    responseObject.type = "error";
    responseObject.description = "Error getting favorite albums. " + e.message;
    res.status(500).json(responseObject);
  }
};

exports.deleteFavorite = async (req, res) => {
  try {
    //TODO validate parameters

    console.log("deleteFavorite");
    const { id } = await decode(req.headers.token);
    const response = await Playlist.destroy({
      where: { itemId: req.params.id, userId: id }
    });

    if (response != 0) {
      responseObject.code = 200;
      responseObject.type = "message";
      responseObject.description = "Album deleted successfully!";
      res.status(200).json(responseObject);
    } else {
      responseObject.code = 404;
      responseObject.type = "message";
      responseObject.description =
        "Error deleting favorite album. Album not found.";
      res.status(404).json(responseObject);
    }
  } catch (e) {
    responseObject.code = 500;
    responseObject.type = "error";
    responseObject.description = "Error deleting favorite album. " + e.message;
    res.status(500).json(responseObject);
  }
};
