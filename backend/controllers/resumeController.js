
import Resume from "../models/Resume.js";
import { generateResumeContent } from "../services/resumeService.js";
import { generateResumePDF } from "../services/pdfService.js";
import path from "path";
import fs from "fs";

/* ===============================
   GENERATE RESUME (AI) - Enhanced with PDF styling
================================ */
export const generateResume = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      role,
      skills = [],
      experience = [],
      projects = [],
      education = [],
      certifications = [],
      location = "",
      linkedin = "",
      github = "",
      portfolio = "",
    } = req.body;

    // ✅ FIXED: Handle nested personal object OR flat fields
    const finalName = name || req.body.personal?.name;
    const finalEmail = email || req.body.personal?.email;
    const finalRole = role || req.body.personal?.role;

    if (!finalName || !finalEmail || !finalRole) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and role are required",
      });
    }

    const userData = {
      name: finalName,
      email: finalEmail,
      phone: phone || "",
      role: finalRole,
      skills,
      experience,
      projects,
      education,
      certifications,
      location: location || req.body.personal?.location || "",
      linkedin: linkedin || req.body.personal?.linkedin || "",
      github: github || req.body.personal?.github || "",
      portfolio: portfolio || req.body.personal?.portfolio || "",
    };

    const { json, raw } = await generateResumeContent(userData);

    const resume = await Resume.create({
      user: req.user._id,
      personal: {
        name: finalName || "",
        email: finalName || "",
        phone: phone || "",
        role: finalRole || "",
        location: location || req.body.personal?.location || "",
        linkedin: linkedin || req.body.personal?.linkedin || "",
        github: github || req.body.personal?.github || "",
        portfolio: portfolio || req.body.personal?.portfolio || "",
      },
      title: `${finalName}'s Resume`,
      summary: json?.summary || "",
      skills: json?.skills || skills,
      experience: json?.experience || experience,
      projects: json?.projects || projects,
      education: json?.education || education,
      certifications: json?.certifications || certifications,
      rawAIText: raw,
    });

    res.status(201).json({
      success: true,
      message: "Resume generated successfully",
      resume,
    });
  } catch (error) {
    console.error("Resume Generation Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate resume",
    });
  }
};

/* ===============================
   DOWNLOAD RESUME PDF - FIXED (No more undefined)
================================ */
export const downloadResume = async (req, res) => {
  try {
    // ✅ Fetch resume with populated data
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // 🔧 CREATE SAFE RESUME DATA - NO MORE UNDEFINED!
    const safeResume = {
      _id: resume._id,
      personal: {
        name: resume.personal?.name || "John Doe",
        email: resume.personal?.email || "email@example.com",
        phone: resume.personal?.phone || "",
        role: resume.personal?.role || "Professional",
        location: resume.personal?.location || "",
        linkedin: resume.personal?.linkedin || "",
        github: resume.personal?.github || "",
        portfolio: resume.personal?.portfolio || "",
      },
      title: resume.title || `${resume.personal?.name || "Resume"}'s Resume`,
      summary: resume.summary || "",
      skills: resume.skills || [],
      experience: resume.experience || [],
      projects: resume.projects || [],
      education: resume.education || [],
      certifications: resume.certifications || [],
    };

    // 🔍 DEBUG LOG - Check your server console!
    console.log("✅ PDF Debug - Name:", safeResume.personal.name);
    console.log("✅ PDF Debug - Phone:", safeResume.personal.phone);
    console.log("✅ PDF Debug - Full Personal:", safeResume.personal);

    // 🎨 PDF Config from headers
    const pdfConfig = {
      theme: req.headers['x-pdf-theme'] || 'modern',
      font: req.headers['x-pdf-font'] || 'Roboto',
      format: req.headers['x-pdf-format'] || 'A4',
      margin: req.headers['x-pdf-margin'] || '15mm',
      dpi: parseInt(req.headers['x-pdf-dpi']) || 300,
      filename: `resume-${resume._id}-${(safeResume.personal.name).replace(/[^a-z0-9]/gi, '_')}.pdf`
    };

    const filePath = path.join(process.cwd(), "uploads", pdfConfig.filename);

    // Ensure uploads directory exists
    const uploadsDir = path.dirname(filePath);
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // 📄 Generate PDF with SAFE data
    await generateResumePDF(safeResume, filePath, pdfConfig);

    // ✅ Verify PDF was created
    if (!fs.existsSync(filePath)) {
      throw new Error("PDF generation failed - file not created");
    }

    const stats = fs.statSync(filePath);
    console.log("✅ PDF Created:", filePath, "Size:", stats.size, "bytes");

    // Set headers
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${pdfConfig.filename}"`,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache',
    });

    // Download & cleanup
    res.download(filePath, pdfConfig.filename, (err) => {
      if (err) {
        console.error("❌ Download error:", err);
      }
      
      // Cleanup after 2 seconds
      setTimeout(() => {
        if (fs.existsSync(filePath)) {
         fs.unlink(filePath, (unlinkErr) => {
           if (unlinkErr) console.error("❌ Cleanup error:", unlinkErr);
         });
        }
      }, 2000);
    });

  } catch (error) {
    console.error("❌ PDF Download Error:", error);
    res.status(500).json({
      success: false,
      message: `Failed to generate PDF: ${error.message}`,
    });
  }
};

/* ===============================
   GET MY RESUMES
================================ */
export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ 
      user: req.user._id, 
      isActive: true 
    })
    .sort({ createdAt: -1 })
    .select('-rawAIText')
    .lean();

    res.json({
      success: true,
      resumes,
      count: resumes.length,
    });
  } catch (error) {
    console.error("Get resumes error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===============================
   GET SINGLE RESUME
================================ */
import mongoose from "mongoose";

export const getSingleResume = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("ID:", id);
    console.log("USER:", req.user);

    // ✅ prevent crash
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const resume = await Resume.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error("Get single resume error:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateResume = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: id, user: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.json({
      success: true,
      resume: updatedResume,
    });
  } catch (error) {
    console.error("Update resume error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  generateResume,
  downloadResume,
  getMyResumes,
  getSingleResume,
  updateResume,
};
