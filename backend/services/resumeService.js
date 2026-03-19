import { generateAIResponse } from "./geminiService.js";

export const generateResumeContent = async (userData) => {
  const prompt = `
You are an expert resume writer.

Generate a clean JSON resume for this candidate:

${JSON.stringify(userData, null, 2)}

RETURN ONLY VALID JSON. NO MARKDOWN. NO EXTRA TEXT.

Use this structure:
{
  "summary": "string",
  "skills": ["string", "string"],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "duration": "string",
      "description": "string"
    }
  ],
  "projects": [
    {
      "title": "string",
      "techStack": ["string", "string"],
      "description": "string"
    }
  ]
}
`;

  const responseText = await generateAIResponse(prompt);

  let json;
  try {
    json = JSON.parse(responseText);
  } catch (err) {
    console.error("Resume JSON parse error:", err);
    json = {}; // still allow saving
  }

  return { json, raw: responseText };
};
