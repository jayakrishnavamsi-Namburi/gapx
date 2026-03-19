

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },

//     password: {
//       type: String,
//       required: true,
//       select: false, // ✅ password won't return in queries
//     },

//     // ✅ Profile Picture (Cloudinary URL)
//     profilePic: {
//       type: String,
//       default: "",
//     },

//     // ✅ Email Verification
//     isEmailVerified: {
//       type: Boolean,
//       default: false,
//     },

//     otpCode: {
//       type: String,
//       default: null,
//     },

//     otpExpiry: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      select: false, // ❗ not required for Google users
    },

    // ✅ Profile Picture
    profilePic: {
      type: String,
      default: "",
    },

    // ✅ NEW: Google login flag
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);