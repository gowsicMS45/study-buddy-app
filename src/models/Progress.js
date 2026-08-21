const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
    score: { type: Number, required: true }, // correct answers
    total: { type: Number, required: true },
    attemptedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Progress", ProgressSchema);
