const mongoose = require("mongoose");

const FlashcardSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: "Note", required: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" },
    timesReviewed: { type: Number, default: 0 },
    timesCorrect: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Flashcard", FlashcardSchema);
