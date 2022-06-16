const CollectionMovie = require("../models/collectionsMovies.js");
const { Op } = require("sequelize");

const Movie = require("../models/movie.js");
const Collection = require("../models/collection.js");

// Add movie to collection
const addMovieToCollection = async (req, res) => {
  try {
    const data = req.body;
    const movie = await Movie.findByPk(data.movieID);
    const collection = await Collection.findByPk(data.collectionID);
    const relation = await CollectionMovie.findOne({
      where: { collectionID: data.collectionID, movieID: data.movieID },
    });

    if (movie == null) {
      res.send({
        message: `Couldn't find movie with id ${req.params.movieID}`,
      });
    } else if (collection == null) {
      res.send({
        message: `Couldn't find collection with id ${req.params.collectionID}`,
      });
    } else if (relation != null) {
      console.log("already in collection");
      res.send({
        message: `${movie.movieTitle} already is part of ${collection.collectionName}`,
      });
    } else {
      await collection.addMovie(movie).then(
        res.send({
          message: `${movie.movieTitle} has been added to ${collection.collectionName}`,
        })
      );
      console.log("hasmovie" + collection.hasMovie(movie));
    }
  } catch (err) {
    console.log(err);
  }
};

// Remove movie from collection

const removeMovieFromCollection = async (req, res) => {
  const data = req.body;
  console.log(data);
  console.log("Check");
  console.log(req.params.movieID);
  const movie = await Movie.findByPk(data.movieID);
  const collection = await Collection.findByPk(data.collectionID);

  if (movie == null) {
    res.send({
      message: `Couldn't find movie with id ${data.movieID}`,
    });
  } else if (collection == null) {
    res.send({
      message: `Couldn't find collection with id ${req.params.collectionID}`,
    });
  } else if (!collection.hasMovie(movie)) {
    res.send({
      message: `${movie.movieTitle} is not part of ${collection.collectionName}`,
    });
  } else {
    collection.removeMovie(movie).then(
      res.send({
        message: `${movie.movieTitle} was removed from ${collection.collectionName}`,
      })
    );
  }
};

const getCollectionWithMovies = async (req, res) => {
  try {
    const collection = await Collection.findByPk(req.params.id, {
      include: [
        {
          model: Movie,
          through: { attributes: [] },
        },
      ],
    });
    if (collection != null) {
      res.send(collection);
    } else {
      res.send({
        message: "Error while getting the collection",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addMovieToCollection,
  removeMovieFromCollection,
  getCollectionWithMovies,
};
