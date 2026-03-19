import { generateAIResponse } from "../services/geminiService.js";

export const getProjectInsights = async (req, res) => {
  try {
    const { domain, salaryRange } = req.body;

    if (!domain || !salaryRange) {
      return res.status(400).json({
        success: false,
        message: "domain and salaryRange are required",
      });
    }

    const prompt = `
You are a placement mentor and project evaluator.

Suggest 3 REAL-WORLD PROJECT IDEAS for:
Domain: ${domain}
Salary Target: ${salaryRange}

For EACH project provide:
1. title
2. projectOverview (2-3 lines)
3. keyFeatures (bullet points)
4. techStack
5. whyRecruitersLikeIt
6. PPT_Content (slide-wise points)
7. Report_Writing_Points

Return ONLY valid JSON.
No markdown. No explanation.

JSON FORMAT:
{
  "projects": [
    {
      "title": "",
      "projectOverview": "",
      "keyFeatures": [],
      "techStack": [],
      "whyRecruitersLikeIt": "",
      "pptContent": [
        "Slide 1: ...",
        "Slide 2: ..."
      ],
      "reportPoints": [
        "Introduction",
        "Problem Statement",
        "System Architecture",
        "Implementation",
        "Conclusion"
      ]
    }
  ]
}
`;

    let raw = await generateAIResponse(prompt);
    raw = raw.replace(/```json|```/g, "").trim();

    const parsed = JSON.parse(raw);

    res.json({
      success: true,
      domain,
      salaryRange,
      projects: parsed.projects,
    });
  } catch (error) {
    console.error("Project Insight Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to generate project insights",
    });
  }
};




