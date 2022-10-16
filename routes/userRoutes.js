const express = require("express");

const users = JSON.parse(fs.readFileSync(`${__dirname}/app-data/users.json`));

const getAllUsers = (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: users,
  });
};

const createNewUser = (req, res, next) => {
  if (Object.keys(req.body).length <= 7) {
    users.push(req.body);
    fs.writeFile(
      `${__dirname}/app-data/users.json`,
      JSON.stringify(users),
      (err) => {
        res.status(201).json({
          status: "success",
          data: null,
        });
      }
    );
  }
};
const updateUser = (req, res, next) => {};
const deleteUser = (req, res, next) => {};
const getUser = (req, res, next) => {
  const id = req.params.id;
  const user = users.find((item) => item._id === id);
  res.status(201).json({
    status: "success",
    data: user,
  });
};

const userRouter = express.Router();

userRouter.route("/api/v1/users").get(getAllUsers).post(createNewUser);
userRouter
  .route("/api/v1/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = userRouter;
