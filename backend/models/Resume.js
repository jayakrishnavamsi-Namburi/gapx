import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "My Resume",
    },

    personal: {
      name: String,
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      portfolio: String,
    },

    summary: String,

    skills: [String],

    experience: [
      {
        company: String,
        role: String,
        duration: String,
        description: String,
      },
    ],

    projects: [
      {
        title: String,
        techStack: [String],
        description: String,
        link: String,
      },
    ],

    education: [
      {
        degree: String,
        institution: String,
        year: String,
      },
    ],

    certifications: [String],

    isActive: {
      type: Boolean,
      default: true,
    },

    rawAIText: String,
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
