// import { GoogleGenAI } from "@google/genai";
// import dotenv from "dotenv";
// dotenv.config();

// const client = new GoogleGenAI({
//   auth: {
//     apiKey: process.env.GEMINI_API_KEY,
//   },
// });

// async function main() {
//   const response = await client.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "2+2",
//   });

//   console.log(response.text);
// }

// main();



import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const client = new GoogleGenAI({
  auth: {
    apiKey: process.env.GEMINI_API_KEY,
  },
});

export const generateAIResponse = async (prompt) => {
  const response = await client.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text; // IMPORTANT
};
