const { render } = require("ejs");
const User = require("../models/user");
const Workout = require("../models/workout");

module.exports = {
  show,
};

function show(req, res) {
  Workout.findById(req.params.id, function (err, workout) {
    res.render("workouts/show", {
      user: req.user,
      workout: workout,
    });
  });

  // the id of the workout I'm looking for is in the url (req.params.id)
}
