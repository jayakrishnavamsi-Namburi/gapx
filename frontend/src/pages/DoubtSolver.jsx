

import React, { useEffect, useState, useRef } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function DoubtSolver() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const loadChat = async () => {
    try {
      const res = await api.get("/doubt/my");
      setMessages(res.data.messages || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadChat();
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (text.length > 2) {
      const lower = text.toLowerCase();
      const base = [
        "How to learn React?",
        "Explain closures",
        "System design basics",
        "DSA roadmap",
        "How to build REST API?",
        "What is JWT authentication?",
        "React performance tips",
      ];
      setSuggestions(base.filter(s => s.toLowerCase().includes(lower)));
      setShowSuggestions(true);
    } else setShowSuggestions(false);
  }, [text]);

  const sendMessage = async (msg = null) => {
    const message = msg || text;
    if (!message.trim()) return;

    try {
      setLoading(true);
      setShowSuggestions(false);

      setMessages(prev => [...prev, { role: "user", text: message }]);
      setText("");

      const res = await api.post("/doubt/ask", { message });
      setMessages(res.data.messages);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", text: "⚠️ Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = async () => {
    await api.delete("/doubt/clear");
    setMessages([]);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">

      <div className="w-full max-w-6xl h-[92vh] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col">

        {/* HEADER */}
        <div className="p-5 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xl shadow-lg shadow-blue-500/30">
              🧠
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg">
                DoubtSolver AI
              </h1>
              <p className="text-xs text-gray-400">
                Smart coding assistant
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={clearChat}
              className="px-4 py-2 text-sm rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition"
            >
              Clear
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/30 hover:shadow-blue-500/50 transition"
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">

          {messages.length === 0 && (
            <div className="h-full flex flex-col justify-center items-center text-center">
              <h2 className="text-white text-xl font-semibold mb-2">
                Ask anything 🚀
              </h2>
              <p className="text-gray-400 text-sm">
                React, DSA, System Design, Career…
              </p>
            </div>
          )}

          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === "user" ? "justify-end" : ""}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-xl text-sm leading-relaxed
                  ${
                    m.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-br-none shadow-lg shadow-blue-500/20"
                      : "bg-white/10 text-gray-200 border border-white/10 rounded-bl-none"
                  }`}
                >
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="text-gray-400 text-sm">Thinking...</div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="p-4 border-t border-white/10">

          {showSuggestions && (
            <div className="mb-2 bg-white/10 rounded-lg overflow-hidden">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(s)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

