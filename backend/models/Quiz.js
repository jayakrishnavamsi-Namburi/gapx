import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    roadmap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roadmap",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "Roadmap Quiz",
    },

    questions: [
      {
        question: { type: String, required: true },
        options: { type: [String], required: true },
        correctAnswer: { type: String, required: true },
      },
    ],

    isSubmitted: { type: Boolean, default: false },
    score: { type: Number, default: 0 },

    submittedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
