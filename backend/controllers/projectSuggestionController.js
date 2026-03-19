import ProjectSuggestion from "../models/ProjectSuggestion.js";
import { generateAIResponse } from "../services/geminiService.js";

export const suggestProjects = async (req, res) => {
  try {
    const { salaryRange, domain } = req.body;

    if (!salaryRange || !domain) {
      return res.status(400).json({
        success: false,
        message: "salaryRange and domain are required",
      });
    }

    const prompt = `
You are a senior software engineer and hiring manager.

Suggest 4 REAL-WORLD PROJECTS suitable for:
- Salary Target: ${salaryRange}
- Domain: ${domain}

Each project MUST include:
- title
- difficulty level (Beginner / Intermediate / Advanced)
- short description
- techStack (array)
- whyThisProject (placement value)
- learningResources (YouTube, Docs, GitHub)

Return ONLY valid JSON.
No markdown. No explanation.

JSON FORMAT:
{
  "projects": [
    {
      "title": "",
      "level": "",
      "description": "",
      "techStack": [],
      "whyThisProject": "",
      "resources": [
        {
          "title": "",
          "link": "",
          "type": ""
        }
      ]
    }
  ]
}
`;

    let raw = await generateAIResponse(prompt);
    raw = raw.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return res.status(500).json({
        success: false,
        message: "Invalid AI response. Try again.",
      });
    }

    const suggestion = await ProjectSuggestion.create({
      user: req.user._id,
      salaryRange,
      domain,
      projects: parsed.projects,
      rawAIResponse: raw,
    });

    res.status(201).json({
      success: true,
      message: "Project suggestions generated",
      suggestion,
    });
  } catch (error) {
    console.error("Project Suggestion Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
