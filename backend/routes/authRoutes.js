// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   getMe,
//   updateProfile,
//   changePassword,
//   deleteAccount,
// } from "../controllers/authController.js";
// import { protectRoute } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // Public routes
// router.post("/register", registerUser);
// router.post("/login", loginUser);

// // Protected routes
// router.get("/me", protectRoute, getMe);
// router.put("/update", protectRoute, updateProfile);
// router.put("/change-password", protectRoute, changePassword);
// router.delete("/delete", protectRoute, deleteAccount);

// export default router;




import express from "express";
import {
  registerUser,
  loginUser,
  googleAuth, // ✅ ADD THIS
  getMe,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controllers/authController.js";

import { protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* =========================================================
   ✅ PUBLIC ROUTES
========================================================= */

// Email/password
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔥 Google Login (Firebase)
router.post("/google", googleAuth);


/* =========================================================
   🔒 PROTECTED ROUTES
========================================================= */

router.get("/me", protectRoute, getMe);
router.put("/update", protectRoute, updateProfile);
router.put("/change-password", protectRoute, changePassword);
router.delete("/delete", protectRoute, deleteAccount);

export default router;