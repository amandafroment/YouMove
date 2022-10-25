const { render } = require("ejs");
const User = require("../models/user");
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");
const exercise = require("../models/exercise");
const mongoose = require("mongoose");

module.exports = {
  show,
};

function show(req, res) {
  Workout.findById(req.params.id, function (err, workout) {
    Exercise.find(
      { workout: mongoose.Types.ObjectId(workout._id) },
      function (err, exercises) {
        res.render("workouts/show", {
          user: req.user,
          workout: workout,
          exercises: exercises,
        });
      }
    );
  });

  // the id of the workout I'm looking for is in the url (req.params.id)
}
