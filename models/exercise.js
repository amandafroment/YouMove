const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: String,
  sets: Number,
  reps: Number,
  weights: Number,
  notes: String,
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workout",
  },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
