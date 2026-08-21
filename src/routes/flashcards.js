const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const Flashcard = require("../models/Flashcard");
const { generateFlashcards } = require("../services/geminiService");

// Generate flashcards from a note using Gemini, then save them
router.post("/generate/:noteId", async (req, res) => {
  try {
    const note = await Note.findById(req.params.noteId);
    if (!note) return res.status(404).json({ error: "Note not found" });

    const count = req.body.count || 8;
    const generated = await generateFlashcards(note.rawText, count);

    const cards = await Flashcard.insertMany(
      generated.map((c) => ({
        userId: note.userId,
        noteId: note._id,
        question: c.question,
        answer: c.answer,
        difficulty: c.difficulty || "medium",
      }))
    );

    res.status(201).json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get flashcards for a note
router.get("/note/:noteId", async (req, res) => {
  try {
    const cards = await Flashcard.find({ noteId: req.params.noteId });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update review stats after user swipes a card (correct/incorrect)
router.patch("/:id/review", async (req, res) => {
  try {
    const { correct } = req.body;
    const update = { $inc: { timesReviewed: 1 } };
    if (correct) update.$inc.timesCorrect = 1;
    const card = await Flashcard.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
