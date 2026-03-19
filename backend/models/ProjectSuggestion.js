import mongoose from "mongoose";

const projectSuggestionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    salaryRange: String,
    domain: String,

    projects: [
      {
        title: String,
        level: String,
        description: String,
        techStack: [String],
        whyThisProject: String,
        resources: [
          {
            title: String,
            link: String,
            type: String, // YouTube | Docs | GitHub
          },
        ],
      },
    ],

    rawAIResponse: String,
  },
  { timestamps: true }
);

export default mongoose.model("ProjectSuggestion", projectSuggestionSchema);
