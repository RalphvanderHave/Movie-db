const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");

const {
  getCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
  getCollectionsByUserId,
} = require("../controllers/collections.js");

const router = express.Router();

router.get("/collections", getCollections);
router.get("/collections/:id", getCollectionById);
router.post("/collections", createCollection);
router.put("/collections/:id", validateToken, updateCollection);
router.delete("/collections", deleteCollection);
router.get("/users/collections/:id", getCollectionsByUserId);

module.exports = router;
