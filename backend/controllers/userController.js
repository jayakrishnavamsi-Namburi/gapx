


// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import cloudinary from "../config/cloudinary.js";
// import { sendEmail } from "../utils/sendEmail.js";

// /* ===============================
//    ✅ Helpers
// ================================= */
// const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// /* ===============================
//    ✅ GET /api/user/me
// ================================= */
// export const getMyProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");

//     return res.json({
//       success: true,
//       user,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ===============================
//    ✅ PUT /api/user/update
//    - Update name/email
//    - Upload profilePic to Cloudinary
// ================================= */
// export const updateProfile = async (req, res) => {
//   try {
//     const { name, email } = req.body;

//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // ✅ Update fields if provided
//     if (name) user.name = name;
//     if (email) user.email = email;

//     // ✅ Upload profile pic if file is provided
//     if (req.file) {
//       const b64 = Buffer.from(req.file.buffer).toString("base64");
//       const dataURI = `data:${req.file.mimetype};base64,${b64}`;

//       const uploaded = await cloudinary.uploader.upload(dataURI, {
//         folder: "intern_profile_pics",
//       });

//       user.profilePic = uploaded.secure_url;
//     }

//     await user.save();

//     return res.json({
//       success: true,
//       message: "Profile updated successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         profilePic: user.profilePic,
//         isEmailVerified: user.isEmailVerified,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ===============================
//    ✅ PUT /api/user/change-password
// ================================= */
// export const changePassword = async (req, res) => {
//   try {
//     const { oldPassword, newPassword } = req.body;

//     if (!oldPassword || !newPassword) {
//       return res.status(400).json({
//         success: false,
//         message: "oldPassword and newPassword required",
//       });
//     }

//     // ✅ Password is select:false in schema so must select it manually
//     const user = await User.findById(req.user._id).select("+password");

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const isMatch = await bcrypt.compare(oldPassword, user.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Old password is incorrect",
//       });
//     }

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);

//     await user.save();

//     return res.json({
//       success: true,
//       message: "Password changed successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ===============================
//    ✅ DELETE /api/user/delete
// ================================= */
// export const deleteAccount = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.user._id);

//     return res.json({
//       success: true,
//       message: "Account deleted successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ===============================
//    ✅ POST /api/user/send-otp
// ================================= */
// export const sendOtp = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const otp = generateOtp();

//     user.otpCode = otp;
//     user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // ✅ 5 minutes
//     await user.save();

//     await sendEmail(
//       user.email,
//       "Verify Your Email (OTP)",
//       `Your OTP is: ${otp}\n\nThis OTP is valid for 5 minutes.`
//     );

//     return res.json({
//       success: true,
//       message: "OTP sent successfully to your email",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /* ===============================
//    ✅ POST /api/user/verify-otp
// ================================= */
// export const verifyOtp = async (req, res) => {
//   try {
//     const { otp } = req.body;

//     if (!otp) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP is required",
//       });
//     }

//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (!user.otpCode || !user.otpExpiry) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP not requested",
//       });
//     }

//     if (new Date() > user.otpExpiry) {
//       return res.status(400).json({
//         success: false,
//         message: "OTP expired",
//       });
//     }

//     if (user.otpCode !== otp) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     }

//     user.isEmailVerified = true;
//     user.otpCode = null;
//     user.otpExpiry = null;

//     await user.save();

//     return res.json({
//       success: true,
//       message: "Email verified successfully ✅",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         profilePic: user.profilePic,
//         isEmailVerified: user.isEmailVerified,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };





import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";

/* ===============================
   ✅ GET /api/user/me
================================= */
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   ✅ PUT /api/user/update
   - Update name/email
   - Upload profilePic to Cloudinary
================================= */
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Update fields
    if (name) user.name = name;
    if (email) user.email = email;

    // ✅ Upload profile pic
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      const uploaded = await cloudinary.uploader.upload(dataURI, {
        folder: "intern_profile_pics",
      });

      user.profilePic = uploaded.secure_url;
    }

    await user.save();

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   ✅ PUT /api/user/change-password
================================= */
export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "oldPassword and newPassword required",
      });
    }

    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

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

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   ✅ DELETE /api/user/delete
================================= */
export const deleteAccount = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    return res.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};