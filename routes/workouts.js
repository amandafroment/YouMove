var express = require("express");
var router = express.Router();
const workoutsCtrl = require("../controllers/workouts");

router.get("/workout/:id", isLoggedIn, workoutsCtrl.show);
// router.post("/workout/:id/exercise", isLoggedIn, workoutsCtrl.create);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
