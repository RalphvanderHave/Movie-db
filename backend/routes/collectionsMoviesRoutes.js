const express = require("express");

const {
  addMovieToCollection,
  removeMovieFromCollection,
  getCollectionWithMovies,
} = require("../controllers/collectionsMovies.js");

const router = express.Router();

router.post("/collectionsMovies", addMovieToCollection);
router.delete("/collectionsMovies", removeMovieFromCollection);
router.get("/getCollectionWithMovies/:id", getCollectionWithMovies);

module.exports = router;
