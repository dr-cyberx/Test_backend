const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../../app-data/tours.json`)
);

exports.checkTourBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(200).json({
      message: "Missing Name or Price",
      data: null,
    });
  }
  next();
};

exports.checkID = (req, res, next, value) => {
  console.log("value of param is -> ", value);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  next();
};

exports.getTours = (req, res) => {
  console.log(req.requestedTime);
  res.status(200).json({ result: tours.length, data: tours, status: 200 });
};

exports.getTourByID = (req, res) => {
  res.status(200).json({
    result: tours.filter((item) => item.id == req.params.id).length,
    data: tours.filter((item) => item.id == req.params.id),
    status: 200,
  });
};

exports.createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/app-data/data.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tours: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "updating data....",
    },
  });
};

exports.deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};
