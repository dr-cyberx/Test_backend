const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/app-data/data.json`));

const isHealthy = (req, res) => {
  console.log(req.params);
  res.status(200).json({ message: "Hello world", status: 200 });
};

const getTours = (req, res) => {
  res.status(200).json({ result: tours.length, data: tours, status: 200 });
};

const getTourByID = (req, res) => {
  console.log(req.params);
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

app.get("/api/v1/ishealthy", isHealthy);
// app.get("/api/tours", getTours);
// app.get("/api/tours/:id/:x?/:y?", getTourByID);
// app.get("/api/v1/tours/:id", getTourByID);
// app.post("/api/tours", createTour);
// app.patch("/api/v1/tour/:id", updateTour);
// app.delete("/api/v1/tour/:id", deleteTour);

app.route("/api/vi/tours").get(getTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTourByID)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(4000, () => {
  console.log("The server is up at http://localhost:4000");
});
