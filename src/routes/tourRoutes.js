const express = require("express");
const {
  createTour,
  deleteTour,
  getTourByID,
  getTours,
  updateTour,
} = require("../controllers/tourController");

const tourRouter = express.Router();

tourRouter.route("/").get(getTours).post(createTour);
tourRouter.route("/:id").get(getTourByID).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;
