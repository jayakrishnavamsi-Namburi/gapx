import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    scheduledAt: {
      type: Date,
      required: true,
    },

    reminderMinutes: {
      type: Number,
      default: 30,
    },

    reminderSent: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
