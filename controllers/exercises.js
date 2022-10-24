const { render } = require("ejs");
const User = require("../models/user");
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");
const workout = require("../models/workout");

module.exports = {
  new: newExercise,
  create,
  delete: deleteExercise,
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
  const exercise = new Exercise(req.body);
  exercise.workout = req.params.id;
  exercise.save(function (err) {
    if (err) return res.redirect("/workout");
    res.redirect(`/workout/${req.params.id}`);
  });
}

function deleteExercise(req, res) {
  console.log(req.params.id, "workout and exercise");
  Exercise.findOneAndDelete(req.params.id, function (err, exercise) {
    console.log(exercise, "exercised");
    exercise.delete(function (err) {});
  });
  res.redirect(`/workout/${req.params.id}`);
}

// function deleteExercise(req, res, next) {
//   Exercise.findOne({ "e._id": req.params.id }, function (err, workout) {
//     workout.exercise(req.params.id).remove();
//     workout.save(function (err) {
//       res.redirect(`/workout/${req.params.id}`);
//     });
//   });
// }

//when you have a get request, that is tied to a page (aka the view), therefor you render that view
//when you have a post request, there is no view for it(whether its a post, update, delete) so it is always a redirect to a route with a view

// function deleteExercise(req, res, next) {
//   Workout.findById(req.params.id, function (err, workout) {
//     Exercise.find(
//       { workout: mongoose.Types.ObjectId(workout._id) },
//       function (err, exercises) {
//         workout.exercise.id(req.params.id).remove();
//         workout.save(function (err) {
//           res.redirect(`/workout/${req.params.id}`);
//         });
//       }
//     );
//   });
// }
