const Collection = require("../models/collection.js");
const Movie = require("../models/movie.js");
const User = require("../models/user.js");

// Get all collections
const getCollections = async (req, res) => {
  try {
    const collection = await Collection.findAll();
    res.send(collection);
  } catch (err) {
    console.log(err);
  }
};

//Get collection by ID
const getCollectionById = async (req, res) => {
  try {
    const collection = await Collection.findByPk(req.params.id, {
      include: [{ model: Movie }],
    });
    if (collection != null) {
      res.send(collection);
    } else {
      res.send({
        message: `Couldn't find collection with id ${req.params.id}`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//Create a new collection
const createCollection = async (req, res) => {
  const data = req.body;
  const user = await User.findByPk(data.userId);
  if (user === null) {
    res.send({
      message: `Couldn't find user with id ${data.userId}`,
    });
  } else {
    try {
      await Collection.create(data).then((collection) => res.json(collection));
    } catch (err) {
      console.log(err);
    }
  }
};

//Update collection by ID
const updateCollection = async (req, res) => {
  try {
    await Collection.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const collection = await Collection.findByPk(req.params.id);
    res.send(collection);
  } catch (err) {
    console.log(err);
  }
};

//Delete collection by ID
const deleteCollection = async (req, res) => {
  const data = req.body;
  const user = await User.findByPk(data.userId);
  const collection = await Collection.findByPk(data.collectionId);

  try {
    user.removeCollection(collection).then(
      res.send({
        message: `${collection.collectionName} was removed!`,
      })
    );
  } catch (err) {
    console.log(err);
  }
};

const getCollectionsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const collections = await Collection.findAll({
      where: {
        userId: userId,
      },
    });
    if (collections != null) {
      res.send(collections);
    } else {
      res.send({
        message: `Couldn't find any collections for this user`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
  getCollectionsByUserId,
};
