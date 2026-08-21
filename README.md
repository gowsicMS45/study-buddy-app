# Study Buddy Backend

Node.js + Express backend for the Study Buddy Android app.
Takes OCR'd note text from the app and uses Gemini to generate flashcards & quizzes.

## Setup (local)

```bash
npm install
cp .env.example .env
# fill in MONGODB_URI and GEMINI_API_KEY in .env
npm run dev
```

## Getting your keys

1. **MongoDB Atlas** (free): https://www.mongodb.com/cloud/atlas/register
   - Create a free M0 cluster → Database Access (create a user) → Network Access (allow 0.0.0.0/0 for now) → Connect → Drivers → copy connection string into `MONGODB_URI`.
2. **Gemini API key** (free tier): https://aistudio.google.com/apikey
   - Create a key, paste into `GEMINI_API_KEY`.

## API Endpoints

| Method | Route | Purpose |
|---|---|---|
| POST | `/api/notes` | Save OCR'd note text (`{userId, title, rawText, subject}`) |
| GET | `/api/notes/:userId` | Get all notes for a user |
| DELETE | `/api/notes/:id` | Delete a note |
| POST | `/api/flashcards/generate/:noteId` | Generate flashcards from a note via Gemini |
| GET | `/api/flashcards/note/:noteId` | Get flashcards for a note |
| PATCH | `/api/flashcards/:id/review` | Update review stats (`{correct: true/false}`) |
| POST | `/api/quiz/generate/:noteId` | Generate a quiz from a note via Gemini |
| GET | `/api/quiz/:id` | Get a single quiz |
| GET | `/api/quiz/user/:userId` | Get all quizzes for a user |
| POST | `/api/progress` | Record a quiz attempt (`{userId, quizId, score, total}`) |
| GET | `/api/progress/:userId` | Get progress history + avg score % |

## Deploy to Render (free)

1. Push this folder to a GitHub repo.
2. Go to https://render.com → New → Web Service → connect your repo.
3. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
4. Add environment variables in Render dashboard (Environment tab):
   - `MONGODB_URI`
   - `GEMINI_API_KEY`
   - `CORS_ORIGIN` = `*` (or your app's origin later)
5. Deploy. Render gives you a live URL like `https://study-buddy-backend.onrender.com` — use this as `BASE_URL` in the Android app's Retrofit config.

Note: free Render instances sleep after inactivity — first request after idle takes ~30s to wake up. Fine for a portfolio/demo project.
