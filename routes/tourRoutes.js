const express = require("express");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/app-data/data.json`));

const getTours = (req, res) => {
  console.log(req.requestedTime);
  res.status(200).json({ result: tours.length, data: tours, status: 200 });
};

const getTourByID = (req, res) => {
  res.status(200).json({
    result: tours.filter((item) => item.id == req.params.id).length,
    data: tours.filter((item) => item.id == req.params.id),
    status: 200,
  });
};

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

const tourRouter = express.Router();

tourRouter.route("/").get(getTours).post(createTour);
tourRouter.route("/:id").get(getTourByID).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;
