const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use((req, res, next) => {
  req.requestedTime = new Date().toISOString();
  next();
});

app.use("/api/v1/tour", tourRouter);

app.use("/api/v1/users", userRouter);

app.get("/api/v1/ishealthy", (req, res) => {
  res.status(200).json({ message: "Hello world", status: 200 });
});

module.exports = app;

// app.get("/api/tours", getTours);
// app.get("/api/tours/:id/:x?/:y?", getTourByID);
// app.get("/api/v1/tours/:id", getTourByID);
// app.post("/api/tours", createTour);
// app.patch("/api/v1/tour/:id", updateTour);
// app.delete("/api/v1/tour/:id", deleteTour);
