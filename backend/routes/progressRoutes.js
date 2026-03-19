import express from "express";
import { updateProgress } from "../controllers/progressController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.patch("/progress/:id", protectRoute, updateProgress);

export default router;
