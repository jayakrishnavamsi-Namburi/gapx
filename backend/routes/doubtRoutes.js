import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { askDoubt, getMyChat, clearChat } from "../controllers/doubtController.js";

const router = express.Router();

router.get("/my", protectRoute, getMyChat);
router.post("/ask", protectRoute, askDoubt);
router.delete("/clear", protectRoute, clearChat);

export default router;
