import express from "express";
import { suggestProjects } from "../controllers/projectSuggestionController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/suggest", protectRoute, suggestProjects);

export default router;
