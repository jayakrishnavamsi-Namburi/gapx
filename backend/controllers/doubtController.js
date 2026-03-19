// import DoubtChat from "../models/DoubtChat.js";

// export const askDoubt = async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message) {
//       return res.status(400).json({
//         success: false,
//         message: "Message is required",
//       });
//     }

//     // ✅ find user chat
//     let chat = await DoubtChat.findOne({ user: req.user._id });

//     if (!chat) {
//       chat = await DoubtChat.create({
//         user: req.user._id,
//         messages: [],
//       });
//     }

//     // ✅ save user message
//     chat.messages.push({
//       role: "user",
//       text: message,
//     });

//     // ✅ BOT REPLY (simple logic)
//     const botReply = `✅ I understood your doubt: "${message}" \n\n📌 Tip: Please share code / error screenshot for accurate answer.`;

//     // ✅ save bot reply
//     chat.messages.push({
//       role: "bot",
//       text: botReply,
//     });

//     await chat.save();

//     return res.json({
//       success: true,
//       reply: botReply,
//       messages: chat.messages,
//     });
//   } catch (err) {
//     console.log("DoubtSolver Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// export const getMyChat = async (req, res) => {
//   try {
//     const chat = await DoubtChat.findOne({ user: req.user._id });

//     return res.json({
//       success: true,
//       messages: chat?.messages || [],
//     });
//   } catch (err) {
//     console.log("Get Chat Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

// export const clearChat = async (req, res) => {
//   try {
//     await DoubtChat.updateOne(
//       { user: req.user._id },
//       { $set: { messages: [] } }
//     );

//     return res.json({
//       success: true,
//       message: "Chat cleared successfully",
//     });
//   } catch (err) {
//     console.log("Clear Chat Error:", err);
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

import DoubtChat from "../models/DoubtChat.js";
import { generateAIResponse } from "../services/geminiService.js";

export const askDoubt = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // ✅ find user chat
    let chat = await DoubtChat.findOne({ user: req.user._id });

    if (!chat) {
      chat = await DoubtChat.create({
        user: req.user._id,
        messages: [],
      });
    }

    // ✅ save user message
    chat.messages.push({
      role: "user",
      text: message,
    });

    // ✅ take last 10 messages for context
    const lastMessages = chat.messages.slice(-10);

    const history = lastMessages
      .map((m) => `${m.role === "user" ? "Student" : "Tutor"}: ${m.text}`)
      .join("\n");

    const prompt = `
You are a helpful coding tutor chatbot for students.
Give answers in simple words with example.
If question is about errors, explain reason + fix steps.
Keep response short and clear.

Chat History:
${history}

Student Question: ${message}

Tutor Answer:
`;

    // ✅ Gemini Response
    const botReply = await generateAIResponse(prompt);

    // ✅ save bot reply
    chat.messages.push({
      role: "bot",
      text: botReply,
    });

    await chat.save();

    return res.json({
      success: true,
      reply: botReply,
      messages: chat.messages,
    });
  } catch (err) {
    console.log("Gemini DoubtSolver Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Gemini Error",
    });
  }
};

export const getMyChat = async (req, res) => {
  try {
    const chat = await DoubtChat.findOne({ user: req.user._id });

    return res.json({
      success: true,
      messages: chat?.messages || [],
    });
  } catch (err) {
    console.log("Get Chat Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const clearChat = async (req, res) => {
  try {
    await DoubtChat.updateOne(
      { user: req.user._id },
      { $set: { messages: [] } }
    );

    return res.json({
      success: true,
      message: "Chat cleared successfully",
    });
  } catch (err) {
    console.log("Clear Chat Error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
