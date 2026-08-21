const express = require("express");
const router = express.Router();
const Progress = require("../models/Progress");

// Record a quiz attempt result
router.post("/", async (req, res) => {
  try {
    const { userId, quizId, score, total } = req.body;
    if (!userId || score === undefined || !total) {
      return res.status(400).json({ error: "userId, score, total are required" });
    }
    const progress = await Progress.create({ userId, quizId, score, total });
    res.status(201).json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get progress history + simple stats for a user
router.get("/:userId", async (req, res) => {
  try {
    const history = await Progress.find({ userId: req.params.userId }).sort({ attemptedAt: -1 });
    const totalAttempts = history.length;
    const avgScorePct = totalAttempts
      ? Math.round(
          (history.reduce((sum, p) => sum + p.score / p.total, 0) / totalAttempts) * 100
        )
      : 0;
    res.json({ history, totalAttempts, avgScorePct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
