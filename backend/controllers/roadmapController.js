


// import Roadmap from "../models/Roadmap.js";
// import { generateAIResponse } from "../services/geminiService.js";


// /* ================= HELPER ================= */
// const isYouTubeVideoAvailable = async (url) => {
//   try {
//     const res = await fetch(
//       `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
//     );
//     return res.ok;
//   } catch {
//     return false;
//   }
// };

// // =============================
// // GENERATE NEW ROADMAP
// // =============================
// export const generateRoadmap = async (req, res) => {
//   try {
//     const { salaryRange, companyType, domain } = req.body;

//     // 1️⃣ Validate input
//     if (!salaryRange || !companyType || !domain) {
//       return res.status(400).json({
//         success: false,
//         message: "salaryRange, companyType, and domain are required",
//       });
//     }

//     // 2️⃣ AI Prompt (WITH RESOURCES)
//     const prompt = `
// You are an expert career mentor.

// Create a detailed WEEK-BY-WEEK study roadmap.

// STRICT RULES:
// - Return ONLY valid JSON
// - No markdown
// - No backticks
// - No explanations
// - Every week MUST include learning resources

// JSON FORMAT:
// {
//   "title": "",
//   "durationWeeks": 0,
//   "summary": "",
//   "weeks": [
//     {
//       "weekNumber": 1,
//       "focus": "",
//       "topics": [],
//       "tasks": [],
//       "estimatedHours": 10,
//       "resources": {
//         "youtube": [
//           { "title": "", "url": "" }
//         ],
//         "websites": [
//           { "name": "", "url": "" }
//         ]
//       }
//     }
//   ]
// }

// RESOURCE RULES:
// - YouTube: free educational videos
// - Websites: W3Schools, GeeksForGeeks, MDN, Official Docs
// - Minimum 1 YouTube + 1 Website per week

// Student Preferences:
// Salary Range: ${salaryRange}
// Company Type: ${companyType}
// Domain: ${domain}
// `;

//     // 3️⃣ Get AI response
//     let raw = await generateAIResponse(prompt);
//     raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

//     // 4️⃣ Parse JSON
//     let plan;
//     try {
//       plan = JSON.parse(raw);
//     } catch (err) {
//       console.error("AI JSON Error:", raw);
//       return res.status(500).json({
//         success: false,
//         message: "AI returned invalid JSON",
//       });
//     }

//     if (!Array.isArray(plan.weeks)) {
//       return res.status(500).json({
//         success: false,
//         message: "Invalid roadmap JSON: weeks missing",
//       });
//     }

//     // 5️⃣ Normalize weeks
//     plan.weeks = plan.weeks.map((week, index) => ({
//       weekNumber: week.weekNumber || index + 1,
//       focus: week.focus || "",
//       topics: Array.isArray(week.topics) ? week.topics : [],
//       tasks: Array.isArray(week.tasks) ? week.tasks : [],
//       estimatedHours: week.estimatedHours || 10,
//       resources: {
//         youtube: Array.isArray(week.resources?.youtube)
//           ? week.resources.youtube
//           : [],
//         websites: Array.isArray(week.resources?.websites)
//           ? week.resources.websites
//           : [],
//       },
//     }));

//     // 6️⃣ Calculate total topics
//     const totalTopics = plan.weeks.reduce(
//       (sum, w) => sum + w.topics.length,
//       0
//     );

//     // 7️⃣ Save to DB
//     const roadmap = await Roadmap.create({
//       user: req.user._id,
//       salaryRange,
//       companyType,
//       domain,
//       plan,
//       rawAIResponse: raw,
//       progress: {
//         totalTopics,
//         completedTopics: 0,
//         percentComplete: 0,
//       },
//       completedTopicsList: [],
//     });

//     res.status(201).json({
//       success: true,
//       message: "Roadmap generated successfully",
//       roadmap,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // =============================
// // GET ALL USER ROADMAPS
// // =============================
// export const getMyRoadmaps = async (req, res) => {
//   try {
//     const roadmaps = await Roadmap.find({
//       user: req.user._id,
//     }).sort({ createdAt: -1 });

//     res.json({
//       success: true,
//       roadmaps,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // =============================
// // GET SINGLE ROADMAP
// // =============================
// export const getSingleRoadmap = async (req, res) => {
//   try {
//     const roadmap = await Roadmap.findOne({
//       _id: req.params.id,
//       user: req.user._id,
//     });

//     if (!roadmap) {
//       return res.status(404).json({
//         success: false,
//         message: "Roadmap not found",
//       });
//     }

//     res.json({
//       success: true,
//       roadmap,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // =============================
// // REGENERATE SINGLE WEEK
// // =============================
// export const regenerateRoadmapWeek = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { weekNumber } = req.body;

//     if (!weekNumber) {
//       return res.status(400).json({
//         success: false,
//         message: "weekNumber is required",
//       });
//     }

//     const roadmap = await Roadmap.findOne({
//       _id: id,
//       user: req.user._id,
//     });

//     if (!roadmap) {
//       return res.status(404).json({
//         success: false,
//         message: "Roadmap not found",
//       });
//     }

//     const weekIndex = roadmap.plan.weeks.findIndex(
//       (w) => w.weekNumber === weekNumber
//     );

//     if (weekIndex === -1) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid week number",
//       });
//     }

//     const prompt = `
// You are an expert career mentor.

// Regenerate ONLY Week ${weekNumber}.

// Return ONLY valid JSON.

// JSON FORMAT:
// {
//   "weekNumber": ${weekNumber},
//   "focus": "",
//   "topics": [],
//   "tasks": [],
//   "estimatedHours": 10,
//   "resources": {
//     "youtube": [{ "title": "", "url": "" }],
//     "websites": [{ "name": "", "url": "" }]
//   }
// }

// Context:
// Domain: ${roadmap.domain}
// Company Type: ${roadmap.companyType}
// Salary Range: ${roadmap.salaryRange}
// `;

//     let raw = await generateAIResponse(prompt);
//     raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

//     let newWeek;
//     try {
//       newWeek = JSON.parse(raw);
//     } catch {
//       return res.status(500).json({
//         success: false,
//         message: "AI returned invalid JSON",
//       });
//     }

//     const normalizedWeek = {
//       weekNumber,
//       focus: newWeek.focus || "",
//       topics: Array.isArray(newWeek.topics) ? newWeek.topics : [],
//       tasks: Array.isArray(newWeek.tasks) ? newWeek.tasks : [],
//       estimatedHours: newWeek.estimatedHours || 10,
//       resources: {
//         youtube: newWeek.resources?.youtube || [],
//         websites: newWeek.resources?.websites || [],
//       },
//     };

//     roadmap.plan.weeks[weekIndex] = normalizedWeek;

//     roadmap.progress.totalTopics = roadmap.plan.weeks.reduce(
//       (sum, w) => sum + w.topics.length,
//       0
//     );

//     await roadmap.save();

//     res.json({
//       success: true,
//       message: `Week ${weekNumber} regenerated successfully`,
//       updatedWeek: normalizedWeek,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };





import Roadmap from "../models/Roadmap.js";
import { generateAIResponse } from "../services/geminiService.js";

/* =====================================================
   HELPER: CHECK YOUTUBE VIDEO AVAILABILITY (NO API KEY)
===================================================== */
const isYouTubeVideoAvailable = async (url) => {
  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`
    );
    return res.ok;
  } catch (error) {
    return false;
  }
};

/* =====================================================
   GENERATE NEW ROADMAP
===================================================== */
export const generateRoadmap = async (req, res) => {
  try {
    const { salaryRange, companyType, domain } = req.body;

    // 1️⃣ Validate input
    if (!salaryRange || !companyType || !domain) {
      return res.status(400).json({
        success: false,
        message: "salaryRange, companyType, and domain are required",
      });
    }

    // 2️⃣ AI Prompt
    const prompt = `
You are an expert career mentor.

Create a detailed WEEK-BY-WEEK study roadmap.

STRICT RULES:
- Return ONLY valid JSON
- No markdown
- No backticks
- No explanations
- Every week MUST include learning resources

JSON FORMAT:
{
  "title": "",
  "durationWeeks": 0,
  "summary": "",
  "weeks": [
    {
      "weekNumber": 1,
      "focus": "",
      "topics": [],
      "tasks": [],
      "estimatedHours": 10,
      "resources": {
        "youtube": [{ "title": "", "url": "" }],
        "websites": [{ "name": "", "url": "" }]
      }
    }
  ]
}

RESOURCE RULES:
- YouTube: free educational videos
- Websites: W3Schools, GeeksForGeeks, MDN, Official Docs
- Minimum 1 YouTube + 1 Website per week

Student Preferences:
Salary Range: ${salaryRange}
Company Type: ${companyType}
Domain: ${domain}
`;

    // 3️⃣ Get AI response
    let raw = await generateAIResponse(prompt);
    raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

    // 4️⃣ Parse JSON
    let plan;
    try {
      plan = JSON.parse(raw);
    } catch (err) {
      console.error("❌ AI JSON Error:", raw);
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
      });
    }

    if (!Array.isArray(plan.weeks)) {
      return res.status(500).json({
        success: false,
        message: "Invalid roadmap JSON: weeks missing",
      });
    }

    // 5️⃣ Normalize weeks
    plan.weeks = plan.weeks.map((week, index) => ({
      weekNumber: week.weekNumber || index + 1,
      focus: week.focus || "",
      topics: Array.isArray(week.topics) ? week.topics : [],
      tasks: Array.isArray(week.tasks) ? week.tasks : [],
      estimatedHours: week.estimatedHours || 10,
      resources: {
        youtube: Array.isArray(week.resources?.youtube)
          ? week.resources.youtube
          : [],
        websites: Array.isArray(week.resources?.websites)
          ? week.resources.websites
          : [],
      },
    }));

    // 6️⃣ FILTER DEAD YOUTUBE LINKS (IMPORTANT)
    for (const week of plan.weeks) {
      if (week.resources?.youtube) {
        const validVideos = [];

        for (const yt of week.resources.youtube) {
          if (
            yt.url &&
            (yt.url.includes("youtube.com/watch?v=") ||
              yt.url.includes("youtu.be/")) &&
            (await isYouTubeVideoAvailable(yt.url))
          ) {
            validVideos.push(yt);
          }
        }

        week.resources.youtube = validVideos;
      }
    }

    // 7️⃣ Calculate total topics
    const totalTopics = plan.weeks.reduce(
      (sum, w) => sum + w.topics.length,
      0
    );

    // 8️⃣ Save to DB
    const roadmap = await Roadmap.create({
      user: req.user._id,
      salaryRange,
      companyType,
      domain,
      plan,
      rawAIResponse: raw,
      progress: {
        totalTopics,
        completedTopics: 0,
        percentComplete: 0,
      },
      completedTopicsList: [],
    });

    res.status(201).json({
      success: true,
      message: "Roadmap generated successfully",
      roadmap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   GET ALL USER ROADMAPS
===================================================== */
export const getMyRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      roadmaps,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   GET SINGLE ROADMAP
===================================================== */
export const getSingleRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    res.json({
      success: true,
      roadmap,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   REGENERATE SINGLE WEEK
===================================================== */
export const regenerateRoadmapWeek = async (req, res) => {
  try {
    const { id } = req.params;
    const { weekNumber } = req.body;

    if (!weekNumber) {
      return res.status(400).json({
        success: false,
        message: "weekNumber is required",
      });
    }

    const roadmap = await Roadmap.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    const weekIndex = roadmap.plan.weeks.findIndex(
      (w) => w.weekNumber === weekNumber
    );

    if (weekIndex === -1) {
      return res.status(400).json({
        success: false,
        message: "Invalid week number",
      });
    }

    const prompt = `
You are an expert career mentor.

Regenerate ONLY Week ${weekNumber}.

Return ONLY valid JSON.

JSON FORMAT:
{
  "weekNumber": ${weekNumber},
  "focus": "",
  "topics": [],
  "tasks": [],
  "estimatedHours": 10,
  "resources": {
    "youtube": [{ "title": "", "url": "" }],
    "websites": [{ "name": "", "url": "" }]
  }
}

Context:
Domain: ${roadmap.domain}
Company Type: ${roadmap.companyType}
Salary Range: ${roadmap.salaryRange}
`;

    let raw = await generateAIResponse(prompt);
    raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

    let newWeek;
    try {
      newWeek = JSON.parse(raw);
    } catch {
      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
      });
    }

    const normalizedWeek = {
      weekNumber,
      focus: newWeek.focus || "",
      topics: Array.isArray(newWeek.topics) ? newWeek.topics : [],
      tasks: Array.isArray(newWeek.tasks) ? newWeek.tasks : [],
      estimatedHours: newWeek.estimatedHours || 10,
      resources: {
        youtube: Array.isArray(newWeek.resources?.youtube)
          ? newWeek.resources.youtube
          : [],
        websites: Array.isArray(newWeek.resources?.websites)
          ? newWeek.resources.websites
          : [],
      },
    };

    // 🔥 FILTER DEAD YOUTUBE LINKS FOR REGENERATED WEEK
    if (normalizedWeek.resources.youtube.length > 0) {
      const validVideos = [];

      for (const yt of normalizedWeek.resources.youtube) {
        if (
          yt.url &&
          (yt.url.includes("youtube.com/watch?v=") ||
            yt.url.includes("youtu.be/")) &&
          (await isYouTubeVideoAvailable(yt.url))
        ) {
          validVideos.push(yt);
        }
      }

      normalizedWeek.resources.youtube = validVideos;
    }

    roadmap.plan.weeks[weekIndex] = normalizedWeek;

    roadmap.progress.totalTopics = roadmap.plan.weeks.reduce(
      (sum, w) => sum + w.topics.length,
      0
    );

    await roadmap.save();

    res.json({
      success: true,
      message: `Week ${weekNumber} regenerated successfully`,
      updatedWeek: normalizedWeek,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
