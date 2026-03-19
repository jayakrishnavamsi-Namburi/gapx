import express from "express";
import {
  generateResume,
  downloadResume,
  getMyResumes,
  getSingleResume,
  updateResume,
} from "../controllers/resumeController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/generate", protectRoute, generateResume);
router.get("/mine", protectRoute, getMyResumes);

router.get("/:id/download", protectRoute, downloadResume);
router.get("/:id", protectRoute, getSingleResume);
router.put("/:id", protectRoute, updateResume);
export default router;
