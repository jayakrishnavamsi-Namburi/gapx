import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roadmap",
      required: true,
    },

    domain: {
      type: String,
      default: "General",
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },

    score: {
      type: Number,
      default: 0,
    },

    percent: {
      type: Number,
      default: 0,
    },

    passed: {
      type: Boolean,
      default: false,
    },

    passingPercent: {
      type: Number,
      default: 60, // ✅ passing rule
    },

    // ✅ store user answers
    userAnswers: {
      type: [String],
      default: [],
    },

    // ✅ store wrong question analysis
    wrongAnswers: [
      {
        question: String,
        options: [String],
        correctAnswer: String,
        userAnswer: String,
        topicHint: String, // optional
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("QuizAttempt", attemptSchema);
