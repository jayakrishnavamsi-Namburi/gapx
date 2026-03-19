// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { sendEmail } from "../utils/sendEmail.js"; // ✅ ADD THIS

// // ✅ Generate JWT token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };

// // ✅ Generate OTP
// const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// /* =========================================================
//    ✅ REGISTER USER + SEND OTP
// ========================================================= */
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // ✅ validation
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const userExists = await User.findOne({ email });

//     if (userExists) {
//       return res.status(400).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     // ✅ Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       isEmailVerified: false,
//     });

//     // ✅ Generate OTP + store
//     const otp = generateOtp();
//     user.otpCode = otp;
//     user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
//     await user.save();

//     // ✅ Send OTP via email
//     await sendEmail(
//       user.email,
//       "Verify Your Email (OTP)",
//       `Your OTP is: ${otp}\n\nThis OTP is valid for 5 minutes.`
//     );

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully ✅ OTP sent to email",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         isEmailVerified: user.isEmailVerified,
//       },
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.log("Register Error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* =========================================================
//    ✅ LOGIN USER (BLOCK if OTP not verified)
// ========================================================= */
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email }).select("+password");
//     if (!user) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // ✅ Block login until email verification
//     if (!user.isEmailVerified) {
//       return res.status(403).json({
//         success: false,
//         message: "Please verify your email using OTP first",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Login successful",
//       token: generateToken(user._id),
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         isEmailVerified: user.isEmailVerified,
//       },
//     });
//   } catch (error) {
//     console.log("Login Error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* =========================================================
//    ✅ GET LOGGED-IN USER
// ========================================================= */
// export const getMe = async (req, res) => {
//   res.json({
//     success: true,
//     user: req.user,
//   });
// };

// /* =========================================================
//    ✅ UPDATE PROFILE
// ========================================================= */
// export const updateProfile = async (req, res) => {
//   try {
//     const { name, email } = req.body;

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user._id,
//       { name, email },
//       { new: true }
//     ).select("-password");

//     res.json({
//       success: true,
//       message: "Profile updated",
//       user: updatedUser,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* =========================================================
//    ✅ CHANGE PASSWORD
// ========================================================= */
// export const changePassword = async (req, res) => {
//   try {
//     const { oldPassword, newPassword } = req.body;

//     const user = await User.findById(req.user._id).select("+password");

//     const isMatch = await bcrypt.compare(oldPassword, user.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Old password is incorrect",
//       });
//     }

//     user.password = await bcrypt.hash(newPassword, 10);
//     await user.save();

//     res.json({
//       success: true,
//       message: "Password changed successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* =========================================================
//    ✅ DELETE ACCOUNT
// ========================================================= */
// export const deleteAccount = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.user._id);

//     res.json({
//       success: true,
//       message: "Account deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };





import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import admin from "../config/firebaseAdmin.js"; // ✅ Firebase Admin

/* =========================================================
   ✅ GENERATE JWT
========================================================= */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/* =========================================================
   ✅ REGISTER USER (NO OTP)
========================================================= */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isGoogleUser: false,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Register Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   ✅ LOGIN USER (EMAIL/PASSWORD)
========================================================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ❗ Block if Google user
    if (user.isGoogleUser) {
      return res.status(400).json({
        success: false,
        message: "Please login using Google",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =========================================================
   ✅ GOOGLE LOGIN (FIREBASE)
========================================================= */
export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = await admin.auth().verifyIdToken(token);

    const { email, name, picture } = decoded;

    let user = await User.findOne({ email });

    // ❗ Prevent conflict
    if (user && !user.isGoogleUser) {
      return res.status(400).json({
        success: false,
        message: "Please login using email & password",
      });
    }

    if (!user) {
      user = await User.create({
        name,
        email,
        profilePic: picture, // ✅ fixed
        isGoogleUser: true,
      });
    }

    res.json({
      success: true,
      message: "Google login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic, // ✅ fixed
      },
    });
  } catch (error) {
    console.log("Google Auth Error:", error);
    res.status(401).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};

/* =========================================================
   ✅ GET LOGGED-IN USER
========================================================= */
export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

/* =========================================================
   ✅ UPDATE PROFILE
========================================================= */
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================================================
   ✅ CHANGE PASSWORD
========================================================= */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password");

    // ❗ Block Google users
    if (user.isGoogleUser) {
      return res.status(400).json({
        success: false,
        message: "Google users cannot change password",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* =========================================================
   ✅ DELETE ACCOUNT
========================================================= */
export const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};