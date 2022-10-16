const express = require("express");
const {
  createNewUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(createNewUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
