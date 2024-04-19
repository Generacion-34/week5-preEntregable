const { getAll, create, getOne, remove, update, setGenres } = require('../controllers/artist.controllers');
const express = require('express');

const routerArtist = express.Router();

routerArtist.route('/') // /artists
  .get(getAll)
  .post(create);

routerArtist.route('/:id/genres')
  .post(setGenres)

routerArtist.route('/:id') // /artists/id
  .get(getOne)
  .delete(remove)
  .put(update);

module.exports = routerArtist;