const User = require("../models/user.js");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const Collection = require("../models/collection.js");
const Movie = require("../models/movie.js");

//Get all users
const getUsers = async (req, res) => {
  try {
    const user = await User.findAll();
    res.send(user);
  } catch (err) {
    console.log(err);
  }
};

//Get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Collection,
          include: [
            {
              model: Movie,
            },
          ],
        },
      ],
    });
    if (user != null) {
      res.send(user);
    } else {
      res.send({
        message: `Couldn't find user with id ${req.params.id}`,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//Create a new user
const createUser = async (req, res) => {
  try {
    const email = req.body.userEmail;
    const userName = req.body.userName;
    const password = req.body.userPassword;

    let users = await User.findAll({
      where: {
        [Op.or]: [{ userName: userName }, { userEmail: email }],
      },
    });

    if (users.length > 0) {
      res.status(400).send({
        message: "user already exists",
      });
    } else {
      const hash = bcrypt.hashSync(password, 8);
      const user = {
        userName: userName,
        userEmail: email,
        userPassword: hash,
      };
      User.create(user).then((user) => res.json(user));
      console.log(user);
    }
  } catch (err) {
    console.log(err);
  }
};

//Login
const loginUser = async (req, res) => {
  const { userEmail, password } = req.body;

  const user = await User.findOne({ where: { userEmail: userEmail } });
  if (!user) res.json({ error: "Wrong username and password combination" });

  bcrypt.compare(password, user.userPassword).then((match) => {
    if (!match) res.json({ error: "Wrong username and password combination" });

    const accesToken = sign(
      { userEmail: user.userEmail, id: user.id },
      "importantSecret"
    );

    res.json({ accesToken: accesToken, userEmail: userEmail, id: user.id });
  });
};

//Update user by ID
const updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (err) {
    console.log(err);
  }
};

//Delete user by ID
const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "User deleted",
    });
  } catch (err) {
    console.log(err);
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findOne({ where: { userEmail: req.user.userEmail } });

  bcrypt.compare(oldPassword, user.userPassword).then((match) => {
    if (!match) res.json({ error: "Wrong password entered!" });

    const hash = bcrypt.hashSync(newPassword, 8);
    User.update({ userPassword: hash }, { where: { id: req.user.id } });
    res.json("SUCCESS");
  });
};

//Validate token for login
const validateTokenForLogin = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  validateTokenForLogin,
  changePassword,
};
