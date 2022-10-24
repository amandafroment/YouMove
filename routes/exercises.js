var express = require("express");
var router = express.Router();
const exercisesCtrl = require("../controllers/exercises");

router.get("/workout/:id/exercise/new", isLoggedIn, exercisesCtrl.new);
router.post("/workout/:id/exercise", isLoggedIn, exercisesCtrl.create);
router.delete("/exercise/:id/:id", isLoggedIn, exercisesCtrl.delete);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
