const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

/**
 * Strips markdown code fences from a model response so JSON.parse works cleanly.
 */
function cleanJson(text) {
  return text.replace(/```json/g, "").replace(/```/g, "").trim();
}

/**
 * Generates flashcards (Q&A pairs) from raw OCR'd note text.
 */
async function generateFlashcards(rawText, count = 8) {
  const prompt = `You are a study assistant. Read the following notes and generate exactly ${count} flashcards to help a student revise.
Return ONLY a JSON array, no preamble, no markdown fences, in this exact format:
[{"question": "...", "answer": "...", "difficulty": "easy|medium|hard"}]

Notes:
"""
${rawText}
"""`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const parsed = JSON.parse(cleanJson(text));
  return parsed;
}

/**
 * Generates a multiple-choice quiz from raw OCR'd note text.
 */
async function generateQuiz(rawText, count = 5) {
  const prompt = `You are a study assistant. Read the following notes and generate exactly ${count} multiple-choice quiz questions.
Return ONLY a JSON array, no preamble, no markdown fences, in this exact format:
[{"question": "...", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "..."}]
correctIndex is the 0-based index of the correct option in the options array.

Notes:
"""
${rawText}
"""`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const parsed = JSON.parse(cleanJson(text));
  return parsed;
}

module.exports = { generateFlashcards, generateQuiz };
