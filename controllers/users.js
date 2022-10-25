const User = require("../models/user");
const Workout = require("../models/workout");
const mongoose = require("mongoose");

module.exports = {
  index,
  addWorkout,
  deleteWorkout,
};

function index(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  }
  Workout.find(
    { user: mongoose.Types.ObjectId(req.user._id) },
    function (err, workouts) {
      res.render("users/user", {
        user: req.user,
        workouts: workouts,
      });
    }
  );
}

function addWorkout(req, res) {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  }

  const workout = new Workout(req.body);
  workout.user = req.user;

  workout.save(function (err) {
    if (err) return res.redirect("/");
    console.log(workout);
    res.redirect("/users");
  });
}

function deleteWorkout(req, res) {
  console.log(req.params, "deletefunction");

  Workout.findById(req.params.id, function (err, workout) {
    console.log(workout, "delete workout");
    workout.delete(function (err) {});
  });
  res.redirect(`/users`);
}
