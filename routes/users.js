var express = require("express");
var router = express.Router();
const usersCtrl = require("../controllers/users");

/* GET users listing. */
router.get("/", usersCtrl.index);
router.post("/workout", isLoggedIn, usersCtrl.addWorkout);

// router.post("/", isLoggedIn, usersCtrl.addWorkout); //may need to change this after for adding a workout instead

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}

module.exports = router;
