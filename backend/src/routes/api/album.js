"use strict";
const router = require("express").Router();
const albumController = require("../../controllers/albumController");
const { verifyUser } = require("../../middlewares/auth/auth");
const { existFavoriteAlbum } = require("../../middlewares/validations");
//ALBUM ROUTES
router.post(
  "/addFavorite",
  verifyUser,
  existFavoriteAlbum,
  albumController.addAlbumAsFavorite
);
router.get("/getAlbum/:name", verifyUser, albumController.getAlbumByName);
router.get(
  "/getAlbum/masterId/:id",
  verifyUser,
  albumController.getAlbumByMasterId
);
router.get("/favorites", verifyUser, albumController.getFavorites);
router.delete("/delete/:id", verifyUser, albumController.deleteFavorite);

module.exports = router;
