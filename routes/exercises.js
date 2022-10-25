var express = require("express");
var router = express.Router();
const exercisesCtrl = require("../controllers/exercises");

router.get("/workout/:id/exercise/new", isLoggedIn, exercisesCtrl.new);
router.post("/workout/:id/exercise", isLoggedIn, exercisesCtrl.create);
router.post("/exercise/:eid/:wid", isLoggedIn, exercisesCtrl.delete);
router.post("/:eid/:wid", isLoggedIn, exercisesCtrl.edit);
router.post(
  "/exercise/workout/:eid/:wid/exercise",
  isLoggedIn,
  exercisesCtrl.update
);
router.post("/exercise/edit/:eid/:wid", isLoggedIn, exercisesCtrl.edit);

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
