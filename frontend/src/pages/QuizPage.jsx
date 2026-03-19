
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../components/common/Navbar";
// import Footer from "../components/common/Footer";

// import {
//   generateQuizApi,
//   getQuizApi,
//   submitQuizApi,
//   retryQuizApi,
// } from "../api/quizApi";

// export default function QuizPage() {
//   const { roadmapId } = useParams();
//   const navigate = useNavigate();

//   const [quiz, setQuiz] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Result section
//   const [result, setResult] = useState(null);
//   const [mistakes, setMistakes] = useState([]);
//   const [retryAllowed, setRetryAllowed] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [error, setError] = useState("");

//   const loadQuiz = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setMsg("");

//       // ✅ first try to get quiz
//       const res = await getQuizApi(roadmapId);

//       setQuiz(res.data.quiz);
//       setAnswers(new Array(res.data.quiz.questions.length).fill(""));
//     } catch (err) {
//       // ✅ if quiz not found, generate quiz
//       try {
//         const gen = await generateQuizApi(roadmapId);
//         setQuiz(gen.data.quiz);
//         setAnswers(new Array(gen.data.quiz.questions.length).fill(""));
//       } catch (e2) {
//         setError(
//           e2?.response?.data?.message ||
//             err?.response?.data?.message ||
//             "Failed to load quiz"
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadQuiz();
//   }, [roadmapId]);

//   // ✅ Select answer
//   const selectAnswer = (qIndex, option) => {
//     const copy = [...answers];
//     copy[qIndex] = option;
//     setAnswers(copy);
//   };

//   // ✅ Submit
//   const handleSubmit = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setMsg("");

//       const res = await submitQuizApi(roadmapId, { answers });

//       setMsg(res.data.message);
//       setResult(res.data.result);
//       setMistakes(res.data.mistakes || []);
//       setRetryAllowed(res.data.retryAllowed || false);
//     } catch (err) {
//       setError(err?.response?.data?.message || "Submit failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Retry Quiz
//   const handleRetry = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       setMsg("");

//       await retryQuizApi(roadmapId);

//       // reload new quiz
//       setQuiz(null);
//       setResult(null);
//       setMistakes([]);
//       setRetryAllowed(false);

//       await loadQuiz();
//     } catch (err) {
//       setError(err?.response?.data?.message || "Retry failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Rectify suggestion based on topic
//   const rectifyTip = (topicHint) => {
//     const t = (topicHint || "").toLowerCase();

//     if (t.includes("react"))
//       return "✅ Revise React basics (components, props, state, hooks) + do 2 projects.";
//     if (t.includes("node"))
//       return "✅ Revise Node.js + Express routing + middleware + build 2 APIs.";
//     if (t.includes("mongo"))
//       return "✅ Revise MongoDB queries (find, update, populate) + practise schema design.";
//     if (t.includes("css"))
//       return "✅ Revise Flexbox/Grid + responsive design + small UI clone projects.";
//     if (t.includes("js"))
//       return "✅ Revise JS fundamentals: closures, async/await, promises, array methods.";
//     if (t.includes("http"))
//       return "✅ Revise HTTP methods, status codes, REST APIs + Postman practice.";

//     return "✅ Revise this topic again + watch 1 YouTube tutorial + solve 3 related problems.";
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="quiz-page">
//         <div className="quiz-container">
//           <div className="quiz-top">
//             <h1>🧠 Quiz</h1>
//             <button className="back-btn" onClick={() => navigate("/dashboard")}>
//               ← Dashboard
//             </button>
//           </div>

//           {msg && <div className="alert success">{msg}</div>}
//           {error && <div className="alert error">{error}</div>}

//           {/* ✅ Result View */}
//           {result && (
//             <div className="result-box">
//               <h2>📌 Your Result</h2>

//               <div className="score-grid">
//                 <div className="score-card">
//                   <p>Score</p>
//                   <h3>
//                     {result.score} / {result.total}
//                   </h3>
//                 </div>

//                 <div className="score-card">
//                   <p>Percent</p>
//                   <h3>{result.percent}%</h3>
//                 </div>

//                 <div className={`score-card ${result.passed ? "pass" : "fail"}`}>
//                   <p>Status</p>
//                   <h3>{result.passed ? "✅ PASSED" : "❌ FAILED"}</h3>
//                 </div>

//                 <div className="score-card">
//                   <p>Improvement</p>
//                   <h3>
//                     {result.improvement === null
//                       ? "First Attempt"
//                       : result.improvement > 0
//                       ? `+${result.improvement}`
//                       : `${result.improvement}`}
//                   </h3>
//                 </div>
//               </div>

//               {/* ✅ If fail -> Retry */}
//               {!result.passed && (
//                 <div className="retry-box">
//                   <p>
//                     ❌ You failed. Don’t worry! Retry again and improve your
//                     score 🔥
//                   </p>

//                   <button
//                     className="retry-btn"
//                     onClick={handleRetry}
//                     disabled={loading}
//                   >
//                     🔁 Retry Quiz
//                   </button>
//                 </div>
//               )}

//               {/* ✅ Mistakes */}
//               <div className="mistakes-box">
//                 <h2>❌ Mistakes + Rectify Plan</h2>

//                 {mistakes.length === 0 ? (
//                   <p className="good-job">🔥 Perfect! No wrong answers ✅</p>
//                 ) : (
//                   mistakes.map((m, i) => (
//                     <div key={i} className="mistake-card">
//                       <h4>
//                         {i + 1}) {m.question}
//                       </h4>

//                       <p>
//                         ✅ Correct Answer:{" "}
//                         <b style={{ color: "#16a34a" }}>{m.correctAnswer}</b>
//                       </p>

//                       <p>
//                         ❌ Your Answer:{" "}
//                         <b style={{ color: "#dc2626" }}>{m.userAnswer}</b>
//                       </p>

//                       <p className="rectify">
//                         🛠 How to rectify: <b>{rectifyTip(m.topicHint)}</b>
//                       </p>
//                     </div>
//                   ))
//                 )}
//               </div>

//               <button
//                 className="history-btn"
//                 onClick={() => navigate("/quizzes")}
//               >
//                 📊 View Full Quiz History →
//               </button>
//             </div>
//           )}

//           {/* ✅ Quiz Questions */}
//           {!result && (
//             <>
//               {loading && <p style={{ color: "#6b7280" }}>Loading quiz...</p>}

//               {quiz && (
//                 <>
//                   <p className="info">
//                     Total Questions: <b>{quiz.questions.length}</b>
//                   </p>

//                   {quiz.questions.map((q, index) => (
//                     <div key={q._id} className="question-card">
//                       <h3>
//                         {index + 1}. {q.question}
//                       </h3>

//                       <div className="options">
//                         {q.options.map((opt) => (
//                           <button
//                             key={opt}
//                             className={`option-btn ${
//                               answers[index] === opt ? "active" : ""
//                             }`}
//                             onClick={() => selectAnswer(index, opt)}
//                             disabled={loading}
//                             type="button"
//                           >
//                             {opt}
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   ))}

//                   <button
//                     className="submit-btn"
//                     onClick={handleSubmit}
//                     disabled={loading}
//                   >
//                     ✅ Submit Quiz
//                   </button>
//                 </>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       <Footer />

//       {/* ✅ CSS in same file */}
//       <style>{`
//         .quiz-page{
//           min-height: 90vh;
//           background: linear-gradient(135deg, #f8fafc, #eef2ff);
//           padding: 20px;
//           font-family: Arial, sans-serif;
//         }
//         .quiz-container{
//           max-width: 1000px;
//           margin: auto;
//           background: #fff;
//           padding: 25px;
//           border-radius: 18px;
//           box-shadow: 0 20px 50px rgba(0,0,0,0.08);
//         }
//         .quiz-top{
//           display:flex;
//           justify-content: space-between;
//           align-items:center;
//         }
//         .back-btn{
//           border:none;
//           background:#e5e7eb;
//           padding:10px 14px;
//           border-radius:12px;
//           cursor:pointer;
//           font-weight:700;
//         }
//         .alert{
//           margin-top: 12px;
//           padding: 10px 12px;
//           border-radius: 10px;
//           font-weight:700;
//         }
//         .success{ background:#dcfce7; color:#166534;}
//         .error{ background:#fee2e2; color:#991b1b;}

//         .info{
//           margin-top: 15px;
//           color:#334155;
//           font-weight:700;
//         }

//         .question-card{
//           margin-top: 16px;
//           padding: 16px;
//           border-radius: 16px;
//           border: 1px solid #e5e7eb;
//           background: #f9fafb;
//         }
//         .options{
//           display:flex;
//           flex-wrap: wrap;
//           gap: 10px;
//           margin-top: 12px;
//         }
//         .option-btn{
//           border: 1px solid #e5e7eb;
//           padding: 10px 12px;
//           background:#fff;
//           border-radius: 12px;
//           cursor:pointer;
//           font-weight:700;
//         }
//         .option-btn.active{
//           border-color:#4f46e5;
//           background:rgba(79,70,229,0.1);
//         }
//         .submit-btn{
//           margin-top: 20px;
//           width: 100%;
//           padding: 14px;
//           border:none;
//           border-radius: 14px;
//           cursor:pointer;
//           font-weight:900;
//           color:#fff;
//           background: linear-gradient(135deg,#4f46e5,#7c3aed);
//         }

//         .result-box{
//           margin-top: 18px;
//           padding: 18px;
//           border-radius: 18px;
//           border: 1px solid #e5e7eb;
//           background:#f8fafc;
//         }
//         .score-grid{
//           margin-top: 12px;
//           display:grid;
//           grid-template-columns: repeat(auto-fit, minmax(180px,1fr));
//           gap: 12px;
//         }
//         .score-card{
//           background:#fff;
//           border:1px solid #e5e7eb;
//           border-radius: 16px;
//           padding: 14px;
//           text-align:center;
//         }
//         .score-card.pass{
//           border-color:#16a34a;
//         }
//         .score-card.fail{
//           border-color:#dc2626;
//         }
//         .score-card p{
//           margin:0;
//           color:#64748b;
//           font-weight:700;
//         }
//         .score-card h3{
//           margin:8px 0 0 0;
//           font-size: 22px;
//           font-weight:900;
//           color:#0f172a;
//         }

//         .retry-box{
//           margin-top: 16px;
//           padding: 14px;
//           border-radius: 14px;
//           background: #fff7ed;
//           border: 1px solid #fed7aa;
//         }
//         .retry-btn{
//           margin-top: 10px;
//           width: 100%;
//           padding: 12px;
//           border:none;
//           border-radius: 14px;
//           cursor:pointer;
//           font-weight:900;
//           background: linear-gradient(135deg,#ef4444,#dc2626);
//           color:white;
//         }

//         .mistakes-box{
//           margin-top: 18px;
//         }
//         .mistake-card{
//           margin-top: 12px;
//           padding: 14px;
//           border-radius: 14px;
//           background:#fff;
//           border: 1px solid #e5e7eb;
//         }
//         .mistake-card h4{
//           margin:0;
//           color:#0f172a;
//         }
//         .rectify{
//           margin-top: 10px;
//           background:#eef2ff;
//           padding: 10px;
//           border-radius: 12px;
//           border-left: 4px solid #4f46e5;
//         }
//         .good-job{
//           font-weight:900;
//           color:#16a34a;
//         }

//         .history-btn{
//           margin-top: 16px;
//           width: 100%;
//           padding: 14px;
//           border:none;
//           border-radius: 14px;
//           cursor:pointer;
//           font-weight:900;
//           background: linear-gradient(135deg,#0ea5e9,#0284c7);
//           color:white;
//         }
//       `}</style>
//     </>
//   );
// }






























import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Confetti from "react-confetti";

import {
  generateQuizApi,
  getQuizApi,
  submitQuizApi,
  retryQuizApi,
} from "../api/quizApi";

export default function QuizPage() {
  const { roadmapId } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Result section
  const [result, setResult] = useState(null);
  const [mistakes, setMistakes] = useState([]);
  const [retryAllowed, setRetryAllowed] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const loadQuiz = async () => {
    try {
      setLoading(true);
      setError("");
      setMsg("");

      const res = await getQuizApi(roadmapId);
      setQuiz(res.data.quiz);
      setAnswers(new Array(res.data.quiz.questions.length).fill(""));
    } catch (err) {
      try {
        const gen = await generateQuizApi(roadmapId);
        setQuiz(gen.data.quiz);
        setAnswers(new Array(gen.data.quiz.questions.length).fill(""));
      } catch (e2) {
        setError(
          e2?.response?.data?.message ||
            err?.response?.data?.message ||
            "Failed to load quiz"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, [roadmapId]);

  const selectAnswer = (qIndex, option) => {
    const copy = [...answers];
    copy[qIndex] = option;
    setAnswers(copy);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      setMsg("");

      const res = await submitQuizApi(roadmapId, { answers });

      setMsg(res.data.message);
      setResult(res.data.result);
      setMistakes(res.data.mistakes || []);
      setRetryAllowed(res.data.retryAllowed || false);
      
      if (res.data.result.passed) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Submit failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async () => {
    try {
      setLoading(true);
      setError("");
      setMsg("");

      await retryQuizApi(roadmapId);
      setQuiz(null);
      setResult(null);
      setMistakes([]);
      setRetryAllowed(false);
      setCurrentQuestion(0);
      await loadQuiz();
    } catch (err) {
      setError(err?.response?.data?.message || "Retry failed");
    } finally {
      setLoading(false);
    }
  };

  const rectifyTip = (topicHint) => {
    const t = (topicHint || "").toLowerCase();

    const tips = {
      react: "⚛️ Master React fundamentals: Components, Props, State, Hooks, and build 3 mini-projects",
      node: "🟢 Deep dive into Node.js: Express routes, Middleware, REST APIs, and database integration",
      mongo: "🍃 MongoDB mastery: CRUD operations, Aggregation pipeline, Indexing, and Schema design",
      css: "🎨 CSS Excellence: Flexbox, Grid, Animations, Responsive design, and clone 2 popular websites",
      js: "📜 JavaScript Deep Dive: Closures, Promises, Async/Await, Event Loop, and Advanced Array methods",
      http: "🌐 HTTP Mastery: Methods, Status codes, Headers, REST conventions, and Postman testing",
      python: "🐍 Python Proficiency: Data structures, OOP, File handling, and build 2 automation scripts",
      sql: "🗄️ SQL Optimization: Complex joins, Subqueries, Indexes, and Query performance tuning",
    };

    for (const [key, tip] of Object.entries(tips)) {
      if (t.includes(key)) return tip;
    }

    return "📚 Comprehensive review: Watch tutorials, practice problems, and build a mini-project in this topic";
  };

  const progress = quiz ? ((currentQuestion + 1) / quiz.questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-white">
      {showConfetti && <Confetti />}
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10"
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-xl"
            >
              🧠
            </motion.div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800">
                Knowledge Check
              </h1>
              <p className="text-slate-500 text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Test your understanding and track progress
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-700 font-medium transition-all shadow-sm"
          >
            ← Dashboard
          </motion.button>
        </motion.div>

        {/* Messages */}
        <AnimatePresence>
          {msg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 font-medium"
            >
              ✨ {msg}
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 font-medium"
            >
              ⚠️ {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result View */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Result Header */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                  Your Performance
                </h2>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Score", value: `${result.score}/${result.total}`, icon: "🎯", color: "indigo" },
                    { label: "Percentage", value: `${result.percent}%`, icon: "📊", color: "purple" },
                    { 
                      label: "Status", 
                      value: result.passed ? "PASSED" : "FAILED", 
                      icon: result.passed ? "✅" : "❌", 
                      color: result.passed ? "emerald" : "red" 
                    },
                    { 
                      label: "Improvement", 
                      value: result.improvement === null ? "First Try" : `${result.improvement > 0 ? '+' : ''}${result.improvement}`, 
                      icon: "📈", 
                      color: "amber" 
                    },
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`bg-${stat.color}-50 rounded-2xl p-6 border border-${stat.color}-100`}
                    >
                      <div className="text-3xl mb-3">{stat.icon}</div>
                      <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                      <p className="text-sm text-slate-500">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Pass/Fail Actions */}
                {!result.passed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-amber-50 rounded-2xl p-6 border border-amber-200"
                  >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl">💪</span>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">Don't give up!</h3>
                          <p className="text-slate-600">Review your mistakes and try again</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRetry}
                        disabled={loading}
                        className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                      >
                        🔁 Retry Quiz
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Mistakes Analysis */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <span>❌</span>
                  Mistake Analysis & Learning Path
                </h2>

                {mistakes.length === 0 ? (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="text-7xl mb-4 animate-bounce">🏆</div>
                    <h3 className="text-2xl font-bold text-emerald-600 mb-2">Perfect Score!</h3>
                    <p className="text-slate-500">You answered all questions correctly. Outstanding work!</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {mistakes.map((m, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-50 rounded-xl p-6 border border-slate-200"
                      >
                        <h4 className="text-lg font-bold text-slate-800 mb-3">
                          {i + 1}. {m.question}
                        </h4>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                            <p className="text-xs text-emerald-600 mb-1">✅ Correct Answer</p>
                            <p className="text-slate-700 font-medium">{m.correctAnswer}</p>
                          </div>
                          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                            <p className="text-xs text-red-600 mb-1">❌ Your Answer</p>
                            <p className="text-slate-700 font-medium">{m.userAnswer}</p>
                          </div>
                        </div>

                        <div className="mt-4 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                          <p className="text-xs text-indigo-600 mb-2">📚 LEARNING PATH</p>
                          <p className="text-slate-700">{rectifyTip(m.topicHint)}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/quizzes")}
                  className="w-full mt-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>📊</span>
                  View Full History
                  <span>→</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Quiz Questions */}
          {!result && quiz && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Progress Bar */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-500 text-sm">Question {currentQuestion + 1} of {quiz.questions.length}</span>
                  <span className="text-indigo-600 font-bold">{Math.round(progress)}% Complete</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  />
                </div>
              </div>

              {/* Question Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100"
                >
                  <div className="flex items-start gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                      {currentQuestion + 1}
                    </div>
                    <h2 className="flex-1 text-2xl font-bold text-slate-800 leading-relaxed">
                      {quiz.questions[currentQuestion].question}
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {quiz.questions[currentQuestion].options.map((opt, idx) => (
                      <motion.button
                        key={opt}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => selectAnswer(currentQuestion, opt)}
                        className={`group relative p-6 rounded-xl text-left transition-all ${
                          answers[currentQuestion] === opt
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl'
                            : 'bg-slate-50 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                            answers[currentQuestion] === opt
                              ? 'bg-white/20 text-white'
                              : 'bg-white text-slate-600 border border-slate-300'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className={`font-medium ${
                            answers[currentQuestion] === opt ? 'text-white' : 'text-slate-700'
                          }`}>
                            {opt}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex justify-between gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-6 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200 transition-all"
                >
                  ← Previous
                </motion.button>

                {currentQuestion === quiz.questions.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={loading || answers.includes("")}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-30"
                  >
                    {loading ? "Submitting..." : "✅ Submit Quiz"}
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                  >
                    Next →
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading State */}
        {loading && !quiz && (
          <div className="flex flex-col items-center justify-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full mb-6"
            />
            <p className="text-slate-500 text-lg">Preparing your quiz...</p>
          </div>
        )}
      </motion.main>

      <Footer />
    </div>
  );
}