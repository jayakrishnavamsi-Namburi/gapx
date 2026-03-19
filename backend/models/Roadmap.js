// import mongoose from "mongoose";

// const resourceSchema = new mongoose.Schema(
//   {
//     title: String,
//     url: String,
//     name: String,
//   },
//   { _id: false }
// );

// const weekSchema = new mongoose.Schema(
//   {
//     weekNumber: Number,
//     focus: String,
//     topics: [String],
//     tasks: [String],
//     estimatedHours: Number,

//     resources: {
//       youtube: [
//         {
//           title: String,
//           url: String,
//         },
//       ],
//       websites: [
//         {
//           name: String,
//           url: String,
//         },
//       ],
//     },
//   },
//   { _id: false }
// );

// const roadmapSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     salaryRange: { type: String, required: true },
//     companyType: { type: String, required: true },
//     domain: { type: String, required: true },

//     plan: {
//       title: String,
//       durationWeeks: Number,
//       summary: String,
//       weeks: [weekSchema],
//     },

//     progress: {
//       totalTopics: { type: Number, default: 0 },
//       completedTopics: { type: Number, default: 0 },
//       percentComplete: { type: Number, default: 0 },
//     },

//     completedTopicsList: {
//       type: [String],
//       default: [],
//     },

//     rawAIResponse: String,
//   },
//   { timestamps: true },
  
// );

// export default mongoose.model("Roadmap", roadmapSchema);





import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    name: String,
  },
  { _id: false }
);

const weekSchema = new mongoose.Schema(
  {
    weekNumber: Number,
    focus: String,
    topics: [String],
    tasks: [String],
    estimatedHours: Number,

    resources: {
      youtube: [
        {
          title: String,
          url: String,
        },
      ],
      websites: [
        {
          name: String,
          url: String,
        },
      ],
    },
  },
  { _id: false }
);

const roadmapSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    salaryRange: { type: String, required: true },
    companyType: { type: String, required: true },
    domain: { type: String, required: true },

    plan: {
      title: String,
      durationWeeks: Number,
      summary: String,
      weeks: [weekSchema],
    },

    progress: {
      totalTopics: { type: Number, default: 0 },
      completedTopics: { type: Number, default: 0 },
      percentComplete: { type: Number, default: 0 },
    },

    completedTopicsList: {
      type: [String],
      default: [],
    },

    // ✅ Quiz fields (After 100% complete)
    quizUnlocked: {
      type: Boolean,
      default: false,
    },
    quizStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    quizScore: {
      type: Number,
      default: 0,
    },

    rawAIResponse: String,
  },
  { timestamps: true }
);

export default mongoose.model("Roadmap", roadmapSchema);
