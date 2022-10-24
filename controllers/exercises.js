const { render } = require("ejs");
const User = require("../models/user");
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");

module.exports = {
  new: newExercise,
  create,
};

function newExercise(req, res) {
  Workout.findById(req.params.id, function (err, workout) {
    res.render("exercise/new", {
      user: req.user,
      workout: workout,
    });
  });
}

function create(req, res) {
  console.log(req.params, "params");
  const exercise = new Exercise(req.body);
  exercise.workout = req.params.id;
  console.log(exercise, "exercise");
  exercise.save(function (err) {
    if (err) return res.redirect("/workout");
    res.redirect(`/workout/${req.params.id}`);
  });
  // do something to add it to my workout show page
}

//when you have a get request, that is tied to a page (aka the view), therefor you render that view
//when you have a post request, there is no view for it(whether its a post, update, delete) so it is always a redirect to a route with a view
