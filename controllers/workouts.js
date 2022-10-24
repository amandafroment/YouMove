const { render } = require("ejs");
const User = require("../models/user");
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");
const exercise = require("../models/exercise");

module.exports = {
  show,
};

function show(req, res) {
  Workout.findById(req.params.id, function (err, workout) {
    Exercise.findById(req.params.id, function (err, exercise) {
      // do something?
    });
    res.render("workouts/show", {
      user: req.user,
      workout: workout,
      exercise: exercise,
      // add exercise in after (exercise.find)
    });
  });

  // the id of the workout I'm looking for is in the url (req.params.id)
}
