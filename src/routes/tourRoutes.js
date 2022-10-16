const express = require("express");
const {
  createTour,
  deleteTour,
  getTourByID,
  getTours,
  updateTour,
  checkID,
  checkTourBody,
} = require("../controllers/tourController");

const tourRouter = express.Router();

tourRouter.param("id", checkID);

tourRouter.route("/").get(getTours).post(checkTourBody, createTour);
tourRouter.route("/:id").get(getTourByID).patch(updateTour).delete(deleteTour);

module.exports = tourRouter;
