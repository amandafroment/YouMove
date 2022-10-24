const User = require("../models/user");
const Workout = require("../models/workout");
const mongoose = require("mongoose");

module.exports = {
  index,
  addWorkout,
};

function index(req, res, next) {
  if (!req.isAuthenticated()) {
    res.redirect("/");
  }
  console.log(req.user, "user");
  Workout.find(
    { user: mongoose.Types.ObjectId(req.user._id) },
    function (err, workouts) {
      console.log(workouts, "workouts");
      console.log(err, "error");
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
