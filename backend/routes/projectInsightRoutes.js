import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { getProjectInsights } from "../controllers/projectInsightController.js";

const router = express.Router();

router.post("/insights", protectRoute, getProjectInsights);

export default router;
