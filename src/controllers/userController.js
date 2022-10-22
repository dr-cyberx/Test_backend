const fs = require('fs');

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../../app-data/users.json`)
);

exports.getAllUsers = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: users,
  });
};

exports.createNewUser = (req, res, next) => {
  if (Object.keys(req.body).length <= 7) {
    users.push(req.body);
    fs.writeFile(
      `${__dirname}/app-data/users.json`,
      JSON.stringify(users),
      () => {
        res.status(201).json({
          status: 'success',
          data: null,
        });
      }
    );
  }
};
exports.updateUser = (req, res, next) => {};
exports.deleteUser = (req, res, next) => {};
exports.getUser = (req, res, next) => {
  const { id } = req.params;
  const user = users.find((item) => item._id === id);
  res.status(201).json({
    status: 'success',
    data: user,
  });
};
