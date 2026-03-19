// import express from "express";
// import {
//   generateQuiz,
//   getQuiz,
//   submitQuiz,
//   getMyQuizzes,
// } from "../controllers/quizController.js";

// import { protectRoute } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.get("/my", protectRoute, getMyQuizzes);
// router.post("/generate/:roadmapId", protectRoute, generateQuiz);
// router.get("/:roadmapId", protectRoute, getQuiz);
// router.post("/submit/:roadmapId", protectRoute, submitQuiz);

// export default router;



import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";

import {
  generateQuiz,
  getQuiz,
  submitQuiz,
  retryQuiz,
  getMyQuizHistory,
  getDomainWiseHistory,
  getQuizStats,
} from "../controllers/quizController.js";

const router = express.Router();

// ✅ quiz for roadmap
router.post("/generate/:roadmapId", protectRoute, generateQuiz);
router.get("/:roadmapId", protectRoute, getQuiz);
router.post("/submit/:roadmapId", protectRoute, submitQuiz);

// ✅ retry logic
router.post("/retry/:roadmapId", protectRoute, retryQuiz);

// ✅ history + stats
router.get("/history/all", protectRoute, getMyQuizHistory);
router.get("/history/domain-wise", protectRoute, getDomainWiseHistory);
router.get("/stats/me", protectRoute, getQuizStats);

export default router;
