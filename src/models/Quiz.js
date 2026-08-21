const mongoose = require("mongoose");

const QuizQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true }, // 4 options
    correctIndex: { type: Number, required: true }, // 0-3
    explanation: { type: String, default: "" },
  },
  { _id: false }
);

const QuizSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: "Note", required: true },
    title: { type: String, default: "Quiz" },
    questions: { type: [QuizQuestionSchema], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", QuizSchema);
