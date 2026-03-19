import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
  markTaskCompleted,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", protectRoute, createTask);
router.get("/", protectRoute, getMyTasks);
router.put("/:id", protectRoute, updateTask);
router.patch("/:id/complete", protectRoute, markTaskCompleted);
router.delete("/:id", protectRoute, deleteTask);

export default router;
