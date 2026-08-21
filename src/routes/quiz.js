const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const Quiz = require("../models/Quiz");
const { generateQuiz } = require("../services/geminiService");

// Generate a quiz from a note using Gemini, then save it
router.post("/generate/:noteId", async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) return res.status(404).json({ error: "Note not found" });

    const count = req.body.count || 5;
    const questions = await generateQuiz(note.rawText, count);

    const quiz = await Quiz.create({
      userId: note.userId,
      noteId: note._id,
      title: `Quiz: ${note.title}`,
      questions,
    });

    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single quiz
router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all quizzes for a user
router.get("/user/:userId", async (req, res) => {
  try {
    const quizzes = await Quiz.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
