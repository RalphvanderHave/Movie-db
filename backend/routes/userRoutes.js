const express = require("express");
const { validateToken } = require("../middlewares/AuthMiddleware");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  validateTokenForLogin,
  changePassword,
} = require("../controllers/users.js");

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.get("/auth", validateToken, validateTokenForLogin);
router.post("/users", createUser);
router.put("/users/:id", validateToken, updateUser);
router.delete("/users/:id", validateToken, deleteUser);
router.post("/users/login", loginUser);
router.put("/changepassword", validateToken, changePassword);

module.exports = router;
