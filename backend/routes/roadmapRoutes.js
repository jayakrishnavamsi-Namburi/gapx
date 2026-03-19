import express from "express";
import {
  generateRoadmap,
  getMyRoadmaps,
  getSingleRoadmap,
  regenerateRoadmapWeek, // 👈 NEW
} from "../controllers/roadmapController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

/*
  ⚠️ ROUTE ORDER IS IMPORTANT
  - Static routes first
  - Param routes last
*/

// =============================
// GET ALL ROADMAPS OF LOGGED USER
// =============================
router.get("/mine", protectRoute, getMyRoadmaps);

// =============================
// GENERATE NEW ROADMAP
// =============================
router.post("/generate", protectRoute, generateRoadmap);

// =============================
// REGENERATE SINGLE WEEK (NEW FEATURE)
// =============================
router.post(
  "/:id/regenerate-week",
  protectRoute,
  regenerateRoadmapWeek
);

// =============================
// GET SINGLE ROADMAP BY ID
// =============================
router.get("/:id", protectRoute, getSingleRoadmap);

export default router;
