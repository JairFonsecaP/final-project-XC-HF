'use strict';
const router = require('express').Router();
const albumController = require('../../controllers/albumController');
const { verifyUser } = require('../../middlewares/auth/auth');
const { existFavoriteAlbum } = require('../../middlewares/validations');

/**
 * Route {/v1/api/album/getAlbum/{name}}
 * Method GET for getting an album by name.
 * Uses verifyUser middleware which valid that the petition was doing for a valid user
 * Uses getAlbumByName controller for resolving the petition
 */
router.get('/getAlbum/:name', verifyUser, albumController.getAlbumByName);

/**
 * Route {/v1/api/album/favorites}
 * Method GET for getting all albums as favorites of an user.
 * Uses verifyUser middleware which valid that the petition was doing for a valid user
 * Uses getFavorites controller for resolving the petition
 */
router.get('/favorites', verifyUser, albumController.getFavorites);

/**
 * Route {/v1/api/album/detail/{id}}
 * Method GET for getting the detail of an album by id.
 * Uses verifyUser middleware which valid that the petition was doing for a valid user
 * Uses detailAlbum controller for resolving the petition
 */
router.get('/detail/:id', verifyUser, albumController.detailAlbum);

/**
 * Route {/v1/api/album/addFavorite}
 * Method POST for adding an album to the playlist.
 * Uses verifyUser middleware which valid that the petition was doing for a valid user
 * Uses existFavoriteAlbum which Checks if this user doesn't have in her/his playlist
 * Uses addAlbumAsFaborite controller for resolving the petition
 */
router.post(
    '/addFavorite',
    verifyUser,
    existFavoriteAlbum,
    albumController.addAlbumAsFavorite
);

/**
 * Route {/v1/api/album//delete/{id}}
 * Method DELETE for deleting an album as favorite of an user.
 * Uses verifyUser middleware which valid that the petition was doing for a valid user
 * Uses deleteFavorite controller for resolving the petition
 */
router.delete('/delete/:id', verifyUser, albumController.deleteFavorite);

module.exports = router;
