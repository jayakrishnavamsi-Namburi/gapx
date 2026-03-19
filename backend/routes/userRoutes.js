

// import express from "express";
// import {
//   getMyProfile,
//   updateProfile,
//   changePassword,
//   deleteAccount,
//   sendOtp,
//   verifyOtp,
// } from "../controllers/userController.js";

// import { protectRoute } from "../middlewares/authMiddleware.js";
// import upload from "../middlewares/multer.js";

// const router = express.Router();

// router.get("/me", protectRoute, getMyProfile);
// router.put("/update", protectRoute, upload.single("profilePic"), updateProfile);
// router.put("/change-password", protectRoute, changePassword);
// router.delete("/delete", protectRoute, deleteAccount);

// router.post("/send-otp", protectRoute, sendOtp);
// router.post("/verify-otp", protectRoute, verifyOtp);

// export default router;




import express from "express";
import {
  getMyProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../controllers/userController.js";

import { protectRoute } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

/* =========================================================
   🔒 PROTECTED USER ROUTES
========================================================= */

// ✅ Get logged-in user
router.get("/me", protectRoute, getMyProfile);

// ✅ Update profile (with image upload)
router.put(
  "/update",
  protectRoute,
  upload.single("profilePic"),
  updateProfile
);

// ✅ Change password
router.put("/change-password", protectRoute, changePassword);

// ✅ Delete account
router.delete("/delete", protectRoute, deleteAccount);

export default router;