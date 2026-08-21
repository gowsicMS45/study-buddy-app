const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// Create a note (from OCR'd text sent by Android app)
router.post("/", async (req, res) => {
  try {
    const { userId, title, rawText, subject } = req.body;
    if (!userId || !rawText) {
      return res.status(400).json({ error: "userId and rawText are required" });
    }
    const note = await Note.create({ userId, title, rawText, subject });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all notes for a user
router.get("/:userId", async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
