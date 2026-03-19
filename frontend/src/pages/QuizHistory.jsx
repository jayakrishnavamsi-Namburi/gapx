
// import React, { useEffect, useState } from "react";
// import Navbar from "../components/common/Navbar";
// import Footer from "../components/common/Footer";
// import { getDomainWiseHistoryApi, getQuizStatsApi } from "../api/quizApi";
// import { useNavigate } from "react-router-dom";

// export default function QuizHistory() {
//   const navigate = useNavigate();
//   const [grouped, setGrouped] = useState({});
//   const [stats, setStats] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const loadHistory = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await getDomainWiseHistoryApi();
//       setGrouped(res.data.groupedHistory || {});
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to load quiz history");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadStats = async () => {
//     try {
//       const res = await getQuizStatsApi();
//       setStats(res.data.stats);
//     } catch (err) {
//       console.log("Stats error:", err?.response?.data?.message);
//     }
//   };

//   useEffect(() => {
//     loadHistory();
//     loadStats();
//   }, []);

//   const domains = Object.keys(grouped);

//   return (
//     <>
//       <Navbar />

//       <div className="history-page">
//         <div className="history-container">
//           <div className="top">
//             <h1>📊 Quiz History</h1>
//             <button className="btn" onClick={() => navigate("/dashboard")}>
//               ← Dashboard
//             </button>
//           </div>

//           {error && <div className="alert error">{error}</div>}

//           {/* ✅ Stats for graphs */}
//           {stats && (
//             <div className="stats-box">
//               <div className="stat">
//                 <p>Total Attempts</p>
//                 <h3>{stats.totalAttempts}</h3>
//               </div>
//               <div className="stat">
//                 <p>Avg Score</p>
//                 <h3>{stats.avgScore}</h3>
//               </div>
//               <div className="stat">
//                 <p>Best Score</p>
//                 <h3>{stats.bestScore}</h3>
//               </div>
//               <div className="stat">
//                 <p>Last Score</p>
//                 <h3>{stats.lastScore}</h3>
//               </div>
//             </div>
//           )}

//           {/* ✅ Simple Graph (bars) */}
//           {stats?.chart?.length > 0 && (
//             // <div className="graph-box">
//             //   <h2>📈 Performance Graph</h2>
//             //   <div className="bars">
//             //     {stats.chart.slice(-10).map((c, i) => (
//             //       <div key={i} className="bar-item">
//             //         <div
//             //           className="bar"
//             //           style={{ height: `${c.percent}%` }}
//             //           title={`Attempt ${c.attempt} : ${c.score}`}
//             //         />
//             //         <p>A{c.attempt}</p>
//             //       </div>
//             //     ))}
//             //   </div>
//             //   <p className="note">Showing last 10 attempts (percent based)</p>
//             // </div>
//             <div className="graph-box">
//   <h2>📈 Performance Graph</h2>

//   <div className="bars">
//     {stats.chart.slice(-10).map((c, i) => {
//       const percent = c.percent ?? 0;

//       // ✅ make small bars visible
//       const barHeight = Math.max(12, (percent / 100) * 80);

//       return (
//         <div key={i} className="bar-item">
//           <div
//             className="bar"
//             style={{ height: `${barHeight}px` }}
//             title={`Attempt ${c.attempt} | Score: ${c.score} | ${percent}%`}
//           />
//           <p className="bar-label">A{c.attempt}</p>
//           <span className="bar-percent">{percent}%</span>
//         </div>
//       );
//     })}
//   </div>

//   <p className="note">Showing last 10 attempts</p>
// </div>

//           )}

//           {/* ✅ Domain-wise grouped */}
//           <h2 style={{ marginTop: "20px" }}>📌 Domain Wise Results</h2>

//           {loading && <p style={{ color: "#6b7280" }}>Loading...</p>}

//           {!loading && domains.length === 0 && (
//             <p style={{ color: "#6b7280" }}>
//               No quiz attempts found. Complete roadmap 100% and start quiz ✅
//             </p>
//           )}

//           {domains.map((domain) => (
//             <div key={domain} className="domain-box">
//               <h3 className="domain-title">✅ {domain}</h3>

//               {grouped[domain].map((a) => (
//                 <div key={a._id} className="attempt-card">
//                   <div>
//                     <p className="date">
//                       {new Date(a.createdAt).toLocaleString()}
//                     </p>
//                     <p className="score">
//                       Score: <b>{a.score}</b> / {a.totalQuestions} ({a.percent}
//                       %)
//                     </p>
//                     <p className={`status ${a.passed ? "pass" : "fail"}`}>
//                       {a.passed ? "✅ Passed" : "❌ Failed"}
//                     </p>
//                   </div>

//                   <button
//                     className="view-btn"
//                     onClick={() => navigate("/dashboard")}
//                   >
//                     Dashboard →
//                   </button>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>

//       <Footer />

//       <style>{`
//         .history-page{
//           min-height: 90vh;
//           background: linear-gradient(135deg, #f8fafc, #eef2ff);
//           padding: 20px;
//           font-family: Arial, sans-serif;
//         }
//         .history-container{
//           max-width: 1000px;
//           margin:auto;
//           background:#fff;
//           padding: 25px;
//           border-radius: 18px;
//           box-shadow: 0 20px 50px rgba(0,0,0,0.08);
//         }
//         .top{
//           display:flex;
//           justify-content: space-between;
//           align-items:center;
//         }
//         .btn{
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
//         .error{ background:#fee2e2; color:#991b1b;}

//         .stats-box{
//           margin-top: 14px;
//           display:grid;
//           grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
//           gap: 12px;
//         }
//         .stat{
//           background:#f8fafc;
//           border: 1px solid #e5e7eb;
//           border-radius: 16px;
//           padding: 14px;
//           text-align:center;
//         }
//         .stat p{
//           margin:0;
//           color:#64748b;
//           font-weight:800;
//         }
//         .stat h3{
//           margin: 10px 0 0;
//           font-size: 24px;
//           font-weight: 900;
//           color:#0f172a;
//         }

//         .graph-box{
//           margin-top: 18px;
//           padding: 16px;
//           border: 1px solid #e5e7eb;
//           border-radius: 16px;
//           background:#f8fafc;
//         }
//         .bars{
//           display:flex;
//           gap: 10px;
//           align-items:flex-end;
//           height: 110px;
//           margin-top: 12px;
//         }
//         .bar-item{
//           width: 28px;
//           text-align:center;
//           font-size: 12px;
//           color:#64748b;
//           font-weight:800;
//         }
//         .bar{
//           width: 100%;
//           background: linear-gradient(135deg,#4f46e5,#7c3aed);
//           border-radius: 10px;
//           min-height: 6px;
//         }
//         .note{
//           margin-top: 10px;
//           color:#64748b;
//           font-weight:700;
//           font-size: 13px;
//         }

//         .domain-box{
//           margin-top: 16px;
//           border: 1px solid #e5e7eb;
//           border-radius: 16px;
//           padding: 16px;
//           background:#f9fafb;
//         }
//         .domain-title{
//           margin:0 0 10px 0;
//           font-weight: 900;
//           color:#0f172a;
//         }
//         .attempt-card{
//           background:#fff;
//           border: 1px solid #e5e7eb;
//           border-radius: 14px;
//           padding: 14px;
//           display:flex;
//           justify-content: space-between;
//           align-items:center;
//           margin-bottom: 10px;
//         }
//         .date{
//           margin:0;
//           font-size: 12px;
//           color:#64748b;
//           font-weight:800;
//         }
//         .score{
//           margin:6px 0;
//           font-weight:800;
//           color:#0f172a;
//         }
//         .status{
//           margin:0;
//           font-weight:900;
//         }
//         .status.pass{ color:#16a34a;}
//         .status.fail{ color:#dc2626;}

//         .view-btn{
//           border:none;
//           padding: 10px 12px;
//           border-radius: 12px;
//           cursor:pointer;
//           font-weight:900;
//           background: #e0e7ff;
//           color:#3730a3;
//         }
//       `}</style>
//     </>
//   );
// }



import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar.jsx";
import Footer from "../components/common/Footer.jsx";
import { getDomainWiseHistoryApi, getQuizStatsApi } from "../api/quizApi";

// Chart.js imports for advanced graphs
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

export default function QuizHistory() {
  const navigate = useNavigate();
  const [grouped, setGrouped] = useState({});
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [hoveredAttempt, setHoveredAttempt] = useState(null);

  const loadHistory = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await getDomainWiseHistoryApi();
      setGrouped(res.data.groupedHistory || {});
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load quiz history");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const res = await getQuizStatsApi();
      setStats(res.data.stats);
    } catch (err) {
      console.log("Stats error:", err?.response?.data?.message);
    }
  };

  useEffect(() => {
    loadHistory();
    loadStats();
  }, []);

  const domains = Object.keys(grouped);
  
  // Prepare chart data for performance graph
  const chartData = {
    labels: stats?.chart?.slice(-10).map((_, i) => `Attempt ${i + 1}`) || [],
    datasets: [
      {
        label: "Score Percentage",
        data: stats?.chart?.slice(-10).map(c => c.percent) || [],
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: (ctx) => {
          const value = ctx.raw;
          return value >= 70 ? "#10b981" : value >= 40 ? "#f59e0b" : "#ef4444";
        },
        pointBorderColor: "white",
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 12,
        callbacks: {
          label: (context) => `Score: ${context.raw}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "rgba(203, 213, 225, 0.2)",
        },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  // Domain performance doughnut data
  const domainPerformanceData = {
    labels: domains,
    datasets: [
      {
        data: domains.map(domain => {
          const attempts = grouped[domain];
          const avg = attempts.reduce((acc, curr) => acc + curr.percent, 0) / attempts.length;
          return avg || 0;
        }),
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(6, 182, 212, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(16, 185, 129, 0.8)",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12"
      >
        {/* Header Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-2xl shadow-xl"
              >
                📊
              </motion.div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black">
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Quiz History
                  </span>
                </h1>
                <p className="text-slate-500 text-lg flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  Track your learning progress and performance
                </p>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="group relative px-8 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-slate-200/50 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2 text-slate-700 group-hover:text-white transition-colors">
              <span>←</span>
              Back to Dashboard
            </span>
          </motion.button>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-medium"
          >
            ⚠️ {error}
          </motion.div>
        )}

        {/* Stats Cards */}
        {stats && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: "Total Attempts", value: stats.totalAttempts, icon: "🎯", color: "indigo" },
              { label: "Average Score", value: `${stats.avgScore}%`, icon: "📈", color: "purple" },
              { label: "Best Score", value: `${stats.bestScore}%`, icon: "🏆", color: "emerald" },
              { label: "Last Score", value: `${stats.lastScore}%`, icon: "⚡", color: "amber" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur" />
                <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:border-transparent transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{stat.icon}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
                      Live
                    </span>
                  </div>
                  <p className="text-3xl font-black text-slate-800">{stat.value}</p>
                  <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Performance Graph */}
        {stats?.chart?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/50">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                  Performance Trend
                </h2>
                <div className="flex gap-2">
                  {["Last 10", "All Time"].map((period) => (
                    <button
                      key={period}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-[300px]">
                <Line data={chartData} options={chartOptions} />
              </div>

              {/* Stats summary */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
                <div className="text-center">
                  <p className="text-xs text-slate-400">Highest</p>
                  <p className="text-xl font-bold text-emerald-600">
                    {Math.max(...(stats.chart.slice(-10).map(c => c.percent)))}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Average</p>
                  <p className="text-xl font-bold text-indigo-600">
                    {(stats.chart.slice(-10).reduce((acc, c) => acc + c.percent, 0) / 10).toFixed(1)}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Improvement</p>
                  <p className="text-xl font-bold text-purple-600">
                    +{(stats.chart.slice(-1)[0]?.percent - stats.chart.slice(-10, -9)[0]?.percent).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Domain Performance Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <span>📌</span>
              Domain Performance
            </h2>

            <div className="flex gap-3">
              <select
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Domains</option>
                {domains.map(domain => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>

              <div className="flex bg-white rounded-xl border border-slate-200 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === "grid" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === "list" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Domain Doughnut Chart */}
          {domains.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50">
                <h3 className="text-sm font-medium text-slate-500 mb-4">Domain Distribution</h3>
                <div className="h-[200px]">
                  <Doughnut 
                    data={domainPerformanceData} 
                    options={{
                      cutout: "70%",
                      plugins: {
                        legend: { display: false },
                      },
                    }}
                  />
                </div>
                <div className="mt-4 space-y-2">
                  {domains.map((domain, idx) => (
                    <div key={domain} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: domainPerformanceData.datasets[0].backgroundColor[idx] }} />
                        {domain}
                      </span>
                      <span className="font-bold text-slate-700">
                        {(grouped[domain].reduce((acc, curr) => acc + curr.percent, 0) / grouped[domain].length).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Domain Stats */}
              <div className="md:col-span-2 grid grid-cols-2 gap-4">
                {domains.filter(d => selectedDomain === "all" || d === selectedDomain).map(domain => {
                  const attempts = grouped[domain];
                  const avg = attempts.reduce((acc, curr) => acc + curr.percent, 0) / attempts.length;
                  const best = Math.max(...attempts.map(a => a.percent));
                  const passRate = (attempts.filter(a => a.passed).length / attempts.length * 100).toFixed(1);
                  
                  return (
                    <motion.div
                      key={domain}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50"
                    >
                      <h3 className="font-bold text-lg text-slate-800 mb-4">{domain}</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Attempts</span>
                          <span className="font-bold text-slate-700">{attempts.length}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Average</span>
                          <span className="font-bold text-indigo-600">{avg.toFixed(1)}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Best</span>
                          <span className="font-bold text-emerald-600">{best}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-500">Pass Rate</span>
                          <span className="font-bold text-purple-600">{passRate}%</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
                              style={{ width: `${avg}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Attempts History */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <span>📋</span>
            Attempt History
          </h2>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            </div>
          )}

          {!loading && domains.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-3xl shadow-lg border border-slate-200/50"
            >
              <div className="text-7xl mb-4 animate-bounce">📝</div>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">No quiz attempts yet</h3>
              <p className="text-slate-400 mb-6">Complete roadmap 100% and start your first quiz!</p>
              <button
                onClick={() => navigate("/roadmaps")}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                View Roadmaps
              </button>
            </motion.div>
          )}

          <AnimatePresence>
            {domains.map((domain) => (
              <motion.div
                key={domain}
                variants={itemVariants}
                className="mb-6"
              >
                <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-xl border border-slate-200/50">
                  <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                    {domain}
                    <span className="text-sm font-normal text-slate-400 ml-2">
                      ({grouped[domain].length} attempts)
                    </span>
                  </h3>

                  <div className={viewMode === "grid" 
                    ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4" 
                    : "space-y-3"
                  }>
                    {grouped[domain].map((attempt, idx) => (
                      <motion.div
                        key={attempt._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        onHoverStart={() => setHoveredAttempt(attempt._id)}
                        onHoverEnd={() => setHoveredAttempt(null)}
                        className={`relative group ${
                          viewMode === "grid" ? "" : "w-full"
                        }`}
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur" />
                        
                        <div className={`relative bg-white rounded-xl p-4 border border-slate-200/50 hover:border-transparent transition-all ${
                          viewMode === "grid" ? "" : "flex items-center justify-between"
                        }`}>
                          {viewMode === "grid" ? (
                            <>
                              <div className="flex justify-between items-start mb-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                  attempt.passed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                                }`}>
                                  {attempt.passed ? "✅ Passed" : "❌ Failed"}
                                </span>
                                <span className="text-xs text-slate-400">
                                  #{attempt.attemptNumber || idx + 1}
                                </span>
                              </div>

                              <div className="mb-4">
                                <div className="text-2xl font-black text-indigo-600">
                                  {attempt.percent}%
                                </div>
                                <div className="text-sm text-slate-500">
                                  Score: {attempt.score}/{attempt.totalQuestions}
                                </div>
                              </div>

                              <div className="text-xs text-slate-400 flex items-center gap-2">
                                <span>📅 {new Date(attempt.createdAt).toLocaleDateString()}</span>
                                <span>⏰ {new Date(attempt.createdAt).toLocaleTimeString()}</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                                  attempt.passed ? "bg-emerald-100" : "bg-red-100"
                                }`}>
                                  {attempt.passed ? "✅" : "❌"}
                                </div>
                                <div>
                                  <div className="flex items-center gap-3 mb-1">
                                    <span className="font-bold text-slate-800">
                                      Score: {attempt.score}/{attempt.totalQuestions}
                                    </span>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                      attempt.passed ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                                    }`}>
                                      {attempt.percent}%
                                    </span>
                                  </div>
                                  <div className="text-xs text-slate-400">
                                    {new Date(attempt.createdAt).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              
                              <button
                                onClick={() => navigate("/dashboard")}
                                className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-medium hover:bg-indigo-100 transition-colors"
                              >
                                Review →
                              </button>
                            </>
                          )}

                          {/* Progress indicator */}
                          {hoveredAttempt === attempt._id && (
                            <motion.div
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: 1 }}
                              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-b-xl origin-left"
                            />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.main>

      <Footer />
    </div>
  );
}