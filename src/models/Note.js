const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true }, // device id or auth id
    title: { type: String, default: "Untitled Note" },
    rawText: { type: String, required: true }, // text extracted by ML Kit OCR
    subject: { type: String, default: "General" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
