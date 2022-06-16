const express = require("express");
const rootRouter = express.Router();

const user = require("./userRoutes.js");
const movie = require("./movieRoutes.js");
const collection = require("./collectionRoutes.js");
const collectionMovie = require("./collectionsMoviesRoutes.js");

rootRouter.use(user);
rootRouter.use(movie);
rootRouter.use(collection);
rootRouter.use(collectionMovie);

module.exports = rootRouter;
