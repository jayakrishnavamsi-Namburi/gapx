import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update name + profile pic
export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (name) user.name = name;

    // ✅ Upload image to Cloudinary if exists
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      const uploaded = await cloudinary.uploader.upload(dataURI, {
        folder: "intern_profile_pics",
      });

      user.profilePic = uploaded.secure_url;
    }

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
