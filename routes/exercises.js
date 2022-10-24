var express = require("express");
var router = express.Router();
const exercisesCtrl = require("../controllers/exercises");

// router.get("/workout/:id/exercise", isLoggedIn, exercisesCtrl.show);
router.get("/workout/:id/exercise/new", isLoggedIn, exercisesCtrl.new);
router.post("/workout/:id/exercise", isLoggedIn, exercisesCtrl.create);

// because it doesn't have the get then its not going to look for the post

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
