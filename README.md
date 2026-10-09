# Study Buddy Backend

Backend API for a Study Buddy Android application that converts OCR note text into flashcards, quizzes, and progress insights using Gemini AI.

## Overview

Study Buddy is designed to help students turn raw notes into revision material. The backend stores notes, generates AI-powered learning content, and tracks quiz progress through a REST API built for Android app integration.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Gemini API
- dotenv
- CORS

## Features

- Save OCR-generated notes
- Generate flashcards from note content
- Generate quizzes from notes
- Track quiz progress
- REST API structure for Android app integration
- Environment-based configuration

## Project Structure

```text
src/
  config/      Database configuration
  models/      Mongoose models
  routes/      API routes
  services/    AI and business logic services
  server.js    Application entry point
```

## API Endpoints

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/notes` | Save OCR note text |
| GET | `/api/notes/:userId` | Get all notes for a user |
| DELETE | `/api/notes/:id` | Delete a note |
| POST | `/api/flashcards/generate/:noteId` | Generate flashcards from a note |
| GET | `/api/flashcards/note/:noteId` | Get flashcards for a note |
| PATCH | `/api/flashcards/:id/review` | Update flashcard review stats |
| POST | `/api/quiz/generate/:noteId` | Generate a quiz from a note |
| GET | `/api/quiz/:id` | Get one quiz |
| GET | `/api/quiz/user/:userId` | Get all quizzes for a user |
| POST | `/api/progress` | Record a quiz attempt |
| GET | `/api/progress/:userId` | Get progress history and average score |

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Fill the required values in `.env` using your own credentials.

## Environment Variables

Use `.env.example` as a reference for required local configuration.

Required values include:

- `MONGODB_URI`
- `GEMINI_API_KEY`
- `CORS_ORIGIN`

Do not commit real API keys, database credentials, JWT secrets, or production values.

## Deployment

This backend can be deployed to Render or a similar Node.js hosting provider.

Recommended deployment settings:

- Build command: `npm install`
- Start command: `npm start`
- Environment variables configured in the hosting dashboard

Free hosting services may sleep after inactivity, so the first request after idle time can take longer.

## Production Notes

- Keep real API keys and database credentials out of Git.
- Configure environment variables in the hosting provider dashboard.
- Avoid using production database data for development testing.
- Only connect to MongoDB when needed for actual functional verification.

## Author

Gowsic M S
