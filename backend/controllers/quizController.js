import Quiz from "../models/Quiz.js";
import Roadmap from "../models/Roadmap.js";
import QuizAttempt from "../models/QuizAttempt.js";

/* ================================
   ✅ Generate Quiz when Roadmap = 100%
================================ */
export const generateQuiz = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const roadmap = await Roadmap.findOne({
      _id: roadmapId,
      user: req.user._id,
    });

    if (!roadmap) {
      return res.status(404).json({ success: false, message: "Roadmap not found" });
    }

    if (roadmap.progress.percentComplete !== 100) {
      return res.status(400).json({
        success: false,
        message: "Roadmap not completed yet. Finish 100% to unlock quiz.",
      });
    }

    // ✅ If quiz already exists return it
    const existingQuiz = await Quiz.findOne({
      roadmap: roadmapId,
      user: req.user._id,
    });

    if (existingQuiz) {
      return res.json({
        success: true,
        message: "Quiz already generated",
        quiz: existingQuiz,
      });
    }

    // ✅ Collect all topics from roadmap weeks
    const allTopics = [];

    if (roadmap.plan?.weeks?.length > 0) {
      roadmap.plan.weeks.forEach((week) => {
        if (week.topics?.length > 0) {
          allTopics.push(...week.topics);
        }
      });
    }

    const uniqueTopics = [...new Set(allTopics)];

    if (uniqueTopics.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No topics found in roadmap plan to generate quiz",
      });
    }

    // ✅ shuffle topics
    const shuffledTopics = uniqueTopics.sort(() => Math.random() - 0.5);

    // ✅ Select 20 topics
    const selectedTopics = shuffledTopics.slice(0, 20);

    while (selectedTopics.length < 20) {
      selectedTopics.push(uniqueTopics[selectedTopics.length % uniqueTopics.length]);
    }

    // ✅ Create questions
    const questions = selectedTopics.map((topic, index) => ({
      question: `Q${index + 1}. What is the main idea of "${topic}"?`,
      options: [
        `Basics of ${topic}`,
        `Advanced concepts of ${topic}`,
        `Not related to ${topic}`,
        `None of the above`,
      ],
      correctAnswer: `Basics of ${topic}`,
      topicHint: topic,
    }));

    const quiz = await Quiz.create({
      roadmap: roadmapId,
      user: req.user._id,
      questions,
    });

    return res.json({
      success: true,
      message: "Quiz generated successfully",
      quiz,
    });
  } catch (err) {
    console.error("Generate Quiz Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================================
   ✅ Get Quiz
================================ */
export const getQuiz = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    const quiz = await Quiz.findOne({
      roadmap: roadmapId,
      user: req.user._id,
    });

    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    return res.json({ success: true, quiz });
  } catch (err) {
    console.error("Get Quiz Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================================
   ✅ Submit Quiz + Mistakes + Retry Logic + Attempt History
================================ */
export const submitQuiz = async (req, res) => {
  try {
    const { roadmapId } = req.params;
    const { answers } = req.body; // expected array of answers

    const quiz = await Quiz.findOne({
      roadmap: roadmapId,
      user: req.user._id,
    });

    if (!quiz) {
      return res.status(404).json({ success: false, message: "Quiz not found" });
    }

    if (quiz.isSubmitted) {
      return res.status(400).json({
        success: false,
        message: "Quiz already submitted. Retry by generating new quiz.",
      });
    }

    const roadmap = await Roadmap.findOne({
      _id: roadmapId,
      user: req.user._id,
    });

    const domain = roadmap?.domain || "General";

    let score = 0;
    let wrongAnswers = [];

    const userAnswers = Array.isArray(answers) ? answers : [];

    quiz.questions.forEach((q, index) => {
      const userAnswer = userAnswers[index] || "";

      if (userAnswer === q.correctAnswer) {
        score++;
      } else {
        wrongAnswers.push({
          question: q.question,
          options: q.options,
          correctAnswer: q.correctAnswer,
          userAnswer: userAnswer || "Not Answered",
          topicHint: q.topicHint || "",
        });
      }
    });

    const total = quiz.questions.length;
    const percent = total === 0 ? 0 : Math.round((score / total) * 100);

    const passingPercent = 60;
    const passed = percent >= passingPercent;

    // ✅ mark quiz submitted
    quiz.score = score;
    quiz.isSubmitted = true;
    await quiz.save();

    // ✅ Create Attempt History
    const attempt = await QuizAttempt.create({
      user: req.user._id,
      roadmap: roadmapId,
      domain,
      totalQuestions: total,
      score,
      percent,
      passed,
      passingPercent,
      userAnswers,
      wrongAnswers,
    });

    // ✅ Update Roadmap quiz status
    await Roadmap.updateOne(
      { _id: roadmapId, user: req.user._id },
      {
        quizStatus: "completed",
        quizScore: score,
      }
    );

    // ✅ Compare with previous attempt
    const prevAttempt = await QuizAttempt.findOne({
      user: req.user._id,
      roadmap: roadmapId,
      _id: { $ne: attempt._id },
    }).sort({ createdAt: -1 });

    const prevScore = prevAttempt?.score ?? null;
    const improvement = prevScore === null ? null : score - prevScore;

    return res.json({
      success: true,
      message: passed
        ? "Quiz submitted successfully ✅"
        : "Quiz submitted ❌ You failed. Please retry again ✅",
      result: {
        score,
        total,
        percent,
        passed,
        passingPercent,
        wrongCount: wrongAnswers.length,
        correctCount: score,
        improvement,
        prevScore,
        domain,
      },
      mistakes: wrongAnswers, // ✅ send for frontend mistake display
      attemptId: attempt._id,
      retryAllowed: !passed, // ✅ retry logic
    });
  } catch (err) {
    console.error("Submit Quiz Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================================
   ✅ Retry Quiz (Delete old quiz and generate new)
================================ */
export const retryQuiz = async (req, res) => {
  try {
    const { roadmapId } = req.params;

    // delete existing quiz so user can generate again
    await Quiz.deleteOne({
      roadmap: roadmapId,
      user: req.user._id,
    });

    return res.json({
      success: true,
      message: "Quiz reset successfully ✅ Now generate again",
    });
  } catch (err) {
    console.error("Retry Quiz Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================================
   ✅ Full Quiz History (All attempts)
================================ */
export const getMyQuizHistory = async (req, res) => {
  try {
    const history = await QuizAttempt.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .select("-userAnswers"); // ✅ don’t send long data (optional)

    return res.json({
      success: true,
      history,
    });
  } catch (err) {
    console.error("Quiz History Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================================
   ✅ Domain Wise Quiz History
================================ */
export const getDomainWiseHistory = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    const grouped = {};

    attempts.forEach((a) => {
      const key = a.domain || "General";
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(a);
    });

    return res.json({
      success: true,
      groupedHistory: grouped,
    });
  } catch (err) {
    console.error("Domain History Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================================
   ✅ Dashboard Quiz Stats (Graphs)
================================ */
export const getQuizStats = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ user: req.user._id }).sort({
      createdAt: 1,
    });

    if (attempts.length === 0) {
      return res.json({
        success: true,
        stats: {
          totalAttempts: 0,
          avgScore: 0,
          bestScore: 0,
          lastScore: 0,
          chart: [],
        },
      });
    }

    const totalAttempts = attempts.length;
    const scores = attempts.map((a) => a.score);
    const bestScore = Math.max(...scores);
    const lastScore = attempts[attempts.length - 1].score;

    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / totalAttempts);

    // ✅ chart data for graphs
    const chart = attempts.map((a, index) => ({
      attempt: index + 1,
      score: a.score,
      percent: a.percent,
      domain: a.domain,
      date: a.createdAt,
    }));

    return res.json({
      success: true,
      stats: {
        totalAttempts,
        avgScore,
        bestScore,
        lastScore,
        chart,
      },
    });
  } catch (err) {
    console.error("Quiz Stats Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};



// import Quiz from "../models/Quiz.js";
// import Roadmap from "../models/Roadmap.js";

// /* =========================================================
//    ✅ 1) GENERATE QUIZ (20 Questions after 100%)
// ========================================================= */
// export const generateQuiz = async (req, res) => {
//   try {
//     const { roadmapId } = req.params;

//     const roadmap = await Roadmap.findOne({
//       _id: roadmapId,
//       user: req.user._id,
//     });

//     if (!roadmap) {
//       return res.status(404).json({
//         success: false,
//         message: "Roadmap not found",
//       });
//     }

//     if (roadmap.progress.percentComplete !== 100) {
//       return res.status(400).json({
//         success: false,
//         message: "Roadmap not completed yet. Finish 100% to unlock quiz.",
//       });
//     }

//     // ✅ If quiz already exists return it
//     const existingQuiz = await Quiz.findOne({
//       roadmap: roadmapId,
//       user: req.user._id,
//     });

//     if (existingQuiz) {
//       return res.json({
//         success: true,
//         message: "Quiz already generated",
//         quiz: existingQuiz,
//       });
//     }

//     // ✅ Collect all topics from roadmap plan weeks
//     const allTopics = [];

//     if (roadmap.plan?.weeks && roadmap.plan.weeks.length > 0) {
//       roadmap.plan.weeks.forEach((week) => {
//         if (week.topics && week.topics.length > 0) {
//           allTopics.push(...week.topics);
//         }
//       });
//     }

//     const uniqueTopics = [...new Set(allTopics)];

//     if (uniqueTopics.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No topics found in roadmap plan to generate quiz",
//       });
//     }

//     // ✅ Shuffle topics
//     const shuffledTopics = uniqueTopics.sort(() => Math.random() - 0.5);

//     // ✅ pick first 20 topics
//     const selectedTopics = shuffledTopics.slice(0, 20);

//     // ✅ if topics < 20 repeat
//     while (selectedTopics.length < 20) {
//       selectedTopics.push(uniqueTopics[selectedTopics.length % uniqueTopics.length]);
//     }

//     // ✅ Generate 20 MCQ questions
//     const questions = selectedTopics.map((topic, index) => ({
//       question: `Q${index + 1}. What is the main idea of "${topic}"?`,
//       options: [
//         `Basics of ${topic}`,
//         `Advanced concepts of ${topic}`,
//         `Not related to ${topic}`,
//         `None of the above`,
//       ],
//       correctAnswer: `Basics of ${topic}`,
//     }));

//     // ✅ Create quiz
//     const quiz = await Quiz.create({
//       roadmap: roadmapId,
//       user: req.user._id,
//       title: `${roadmap.domain} - Final Quiz`,
//       questions,
//     });

//     // ✅ unlock quiz in roadmap (optional)
//     roadmap.quizUnlocked = true;
//     roadmap.quizStatus = "pending";
//     await roadmap.save({ validateBeforeSave: false });

//     return res.json({
//       success: true,
//       message: "Quiz generated successfully",
//       quiz,
//     });
//   } catch (err) {
//     console.error("Generate Quiz Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// /* =========================================================
//    ✅ 2) GET QUIZ (by roadmapId)
// ========================================================= */
// export const getQuiz = async (req, res) => {
//   try {
//     const { roadmapId } = req.params;

//     const quiz = await Quiz.findOne({
//       roadmap: roadmapId,
//       user: req.user._id,
//     });

//     if (!quiz) {
//       return res.status(404).json({
//         success: false,
//         message: "Quiz not found",
//       });
//     }

//     return res.json({
//       success: true,
//       quiz,
//     });
//   } catch (err) {
//     console.error("Get Quiz Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// /* =========================================================
//    ✅ 3) SUBMIT QUIZ (Score + store submittedAt)
// ========================================================= */
// export const submitQuiz = async (req, res) => {
//   try {
//     const { roadmapId } = req.params;
//     const { answers } = req.body;

//     const quiz = await Quiz.findOne({
//       roadmap: roadmapId,
//       user: req.user._id,
//     });

//     if (!quiz) {
//       return res.status(404).json({
//         success: false,
//         message: "Quiz not found",
//       });
//     }

//     if (quiz.isSubmitted) {
//       return res.status(400).json({
//         success: false,
//         message: "Quiz already submitted",
//       });
//     }

//     let score = 0;

//     quiz.questions.forEach((q, index) => {
//       const userAnswer = answers?.[index];

//       if (userAnswer && userAnswer === q.correctAnswer) {
//         score++;
//       }
//     });

//     quiz.score = score;
//     quiz.isSubmitted = true;
//     quiz.submittedAt = new Date();

//     await quiz.save();

//     // ✅ Update roadmap quiz status & score
//     await Roadmap.updateOne(
//       { _id: roadmapId, user: req.user._id },
//       {
//         quizStatus: "completed",
//         quizScore: score,
//         quizUnlocked: true,
//       }
//     );

//     return res.json({
//       success: true,
//       message: "Quiz submitted successfully",
//       score,
//       total: quiz.questions.length,
//     });
//   } catch (err) {
//     console.error("Submit Quiz Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// /* =========================================================
//    ✅ 4) GET MY QUIZZES (History + Results)
//    Route: GET /api/quiz/my
// ========================================================= */
// export const getMyQuizzes = async (req, res) => {
//   try {
//     const quizzes = await Quiz.find({
//       user: req.user._id,
//     })
//       .populate("roadmap", "domain companyType salaryRange")
//       .sort({ createdAt: -1 });

//     return res.json({
//       success: true,
//       quizzes,
//     });
//   } catch (err) {
//     console.error("Get My Quizzes Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
