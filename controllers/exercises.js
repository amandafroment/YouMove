const { render } = require("ejs");
const User = require("../models/user");
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");
const workout = require("../models/workout");

module.exports = {
  new: newExercise,
  create,
  delete: deleteExercise,
  edit: editExercise,
  update,
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
  console.log(req.params, "deletefunction");
  let eid = req.params.eid;

  Exercise.findById(req.params.eid, function (err, exercise) {
    console.log(exercise, "delete exercise");
    exercise.delete(function (err) {});
  });
  res.redirect(`/workout/${req.params.wid}`);
}

function editExercise(req, res) {
  console.log(req.params, "edit");
  let eid = req.params.eid;
  let id = req.params.wid;
  let exercise;
  Exercise.findById(req.params.eid, function (err, exercise) {
    exercise = exercise;
    res.render(`./exercise/edit`, {
      exercise,
      id,
      eid,
    });
  });
}

function update(req, res) {
  Exercise.findOneAndUpdate(req.params.eid, req.body);
  Exercise.findByIdAndUpdate(
    req.params.eid,
    {
      name: req.body.name,
      sets: req.body.sets,
      reps: req.body.reps,
      weights: req.body.weights,
      notes: req.body.notes,
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log("Updated User : ", docs);
      }
    }
  );
  res.redirect(`/workout/${req.params.wid}`);
}

//when you have a get request, that is tied to a page (aka the view), therefor you render that view
//when you have a post request, there is no view for it(whether its a post, update, delete) so it is always a redirect to a route with a view
