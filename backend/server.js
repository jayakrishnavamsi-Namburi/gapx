import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet"; // ✅ ADD THIS

import connectDB from "./config/db.js";
import { generateAIResponse } from "./config/gemini.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import projectSuggestionRoutes from "./routes/projectSuggestionRoutes.js";
import projectInsightRoutes from "./routes/projectInsightRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import doubtRoutes from "./routes/doubtRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

import { protectRoute } from "./middlewares/authMiddleware.js";
import { startReminderCron } from "./cron/reminderCron.js";

dotenv.config();

const app = express();

/* ===============================
   🔥 SECURITY FIX (IMPORTANT)
================================= */
app.use(
  helmet({
    crossOriginOpenerPolicy: false, // fixes Firebase popup issue
  })
);

/* ===============================
   🔥 CORS FIX
================================= */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://gapx-frontend.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());

/* ===============================
   🚀 INIT
================================= */
connectDB();
startReminderCron();

/* ===============================
   🌐 ROUTES
================================= */
app.get("/", (req, res) => {
  res.send("🌐 AI Career Guidance Backend is Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

app.use("/api/roadmap", progressRoutes);
app.use("/api/roadmap", roadmapRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/projects", projectSuggestionRoutes);
app.use("/api/project-insights", projectInsightRoutes);

app.use("/api/quiz", quizRoutes);
app.use("/api/doubt", doubtRoutes);

app.get("/api/me", protectRoute, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

app.post("/api/test-ai", async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await generateAIResponse(prompt);

    res.json({
      success: true,
      output: aiResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ===============================
   🚀 SERVER
================================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});