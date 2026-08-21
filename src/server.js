require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const notesRoutes = require("./routes/notes");
const flashcardsRoutes = require("./routes/flashcards");
const quizRoutes = require("./routes/quiz");
const progressRoutes = require("./routes/progress");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "2mb" })); // OCR text can be long, so higher limit

app.get("/", (req, res) => {
  res.json({ status: "Study Buddy API is running 🚀" });
});

app.use("/api/notes", notesRoutes);
app.use("/api/flashcards", flashcardsRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/progress", progressRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
});
