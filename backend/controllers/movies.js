const Movie = require("../models/movie.js");
const { Op } = require("sequelize");

// Get all movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.send(movies);
  } catch (err) {
    console.log(err);
  }
};

//Get movie by ID
const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (movie != null) {
      res.send(movie);
    } else {
      res.send({
        message: `Couldn't find movie with id ${req.params.id}`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//Create a new movie
const createMovie = async (req, res) => {
  try {
    const tmdbID = req.body.tmdbID;
    let movies = await Movie.findAll({
      where: {
        [Op.or]: [{ tmdbID: tmdbID }],
      },
    });

    if (movies.length === 0) {
      await Movie.create(req.body).then((movie) => res.json(movie));
    } else {
      res.json(movies[0]);
    }
  } catch (err) {
    console.log(err);
  }
};

//Update movie by ID
const updateMovie = async (req, res) => {
  try {
    await Movie.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const movie = await Movie.findByPk(req.params.id);
    res.send(movie);
  } catch (err) {
    console.log(err);
  }
};

//Delete movie by ID
const deleteMovie = async (req, res) => {
  try {
    await Movie.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Movie deleted",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
