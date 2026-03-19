


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import Navbar from "../../components/common/Navbar";
// import Footer from "../../components/common/Footer";
// import { getMyRoadmapsApi } from "../../api/roadmapApi";
// import { getQuizStatsApi } from "../../api/quizApi";
// import { getMyResumesApi, downloadResumeApi } from "../../api/resumeApi";
// import ProgressBar from "../../components/dashboard/ProgressBar";
// import WeeklyStreak from "../../components/dashboard/WeeklyStreak";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [latestRoadmap, setLatestRoadmap] = useState(null);
//   const [latestResume, setLatestResume] = useState(null);
//   const [showDoubtSolver, setShowDoubtSolver] = useState(false);
//   const [quizStats, setQuizStats] = useState({
//     totalAttempts: 0, avgScore: 0, bestScore: 0, lastScore: 0,
//   });
//   const [greeting, setGreeting] = useState("");
  

//   useEffect(() => {
//     const hour = new Date().getHours();
//     if (hour < 12) setGreeting("Good morning");
//     else if (hour < 18) setGreeting("Good afternoon");
//     else setGreeting("Good evening");
//   }, []);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const roadmapRes = await getMyRoadmapsApi();
//         const roadmaps = roadmapRes.data.roadmaps || [];
//         if (roadmaps.length > 0) {
//           const activeId = localStorage.getItem("activeRoadmapId");
//           setLatestRoadmap(roadmaps.find((r) => r._id === activeId) || roadmaps[0]);
//         }
//       } catch (err) { console.error(err); }

//       try {
//         const resumeRes = await getMyResumesApi();
//         const resumes = resumeRes.data.resumes || [];
//         if (resumes.length > 0) {
//           const activeId = localStorage.getItem("activeResumeId");
//           setLatestResume(resumes.find((r) => r._id === activeId) || resumes[0]);
//         }
//       } catch (err) { console.error(err); }

//       try {
//         const statsRes = await getQuizStatsApi();
//         setQuizStats(statsRes.data.stats);
//       } catch (err) { console.log(err); }
//     };
//     loadData();
//   }, []);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//       },
//     },
//   };
  
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 font-['Inter']">
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//         {/* Animated Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 lg:mb-16 gap-6"
//         >
//           <div className="space-y-2">
//             <div className="flex items-center gap-3">
//               <motion.div
//                 animate={{ rotate: [0, 10, -10, 0] }}
//                 transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
//                 className="text-4xl"
//               >
//                 👋
//               </motion.div>
//               <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
//                 {greeting}, <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Jaya Krishna</span>
//               </h1>
//             </div>
//             <p className="text-slate-500 text-lg flex items-center gap-2">
//               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
//               Here's your career dashboard overview
//             </p>
//           </div>
          
//           <motion.div
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="bg-white/80 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-lg border border-slate-200/50"
//           >
//             <WeeklyStreak streak={5} />
//           </motion.div>
//         </motion.div>

//         {/* Main Grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
//         >
          
//           {/* Main Roadmap Card */}
//           <motion.section
//             variants={itemVariants}
//             className="lg:col-span-7 relative group"
//           >
//             <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
            
//             <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-200/50 hover:border-indigo-200/50 transition-all duration-300">
//               <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
//                     🎯
//                   </div>
//                   <div>
//                     <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Active Track</h2>
//                     <p className="text-xs text-slate-400">Current learning path</p>
//                   </div>
//                 </div>
//                 <motion.button
//                   whileHover={{ x: 5 }}
//                   onClick={() => navigate("/roadmaps")}
//                   className="text-sm font-medium text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1"
//                 >
//                   View all
//                   <span>→</span>
//                 </motion.button>
//               </div>

//               {latestRoadmap ? (
//                 <div className="space-y-6">
//                   <div>
//                     <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
//                       {latestRoadmap.domain}
//                     </h3>
//                     <div className="flex flex-wrap gap-2">
//                       <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
//                         {latestRoadmap.salaryRange}
//                       </span>
//                       <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100">
//                         {latestRoadmap.companyType}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-100">
//                     <div className="flex justify-between items-center mb-3">
//                       <span className="text-sm text-slate-500">Progress</span>
//                       <span className="text-2xl font-bold text-indigo-600">
//                         {latestRoadmap.progress.percentComplete}%
//                       </span>
//                     </div>
//                     <ProgressBar percent={latestRoadmap.progress.percentComplete} />
                    
//                     <div className="grid grid-cols-2 gap-4 mt-6">
//                       <div className="text-center">
//                         <p className="text-2xl font-bold text-slate-700">
//                           {latestRoadmap.progress.completedTopics}
//                         </p>
//                         <p className="text-xs text-slate-400">Completed</p>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-2xl font-bold text-slate-700">
//                           {latestRoadmap.progress.totalTopics}
//                         </p>
//                         <p className="text-xs text-slate-400">Total Topics</p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <motion.button
//                       whileHover={{ scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => navigate(`/roadmap/${latestRoadmap._id}`)}
//                       className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-xl transition-all"
//                     >
//                       Continue Learning
//                     </motion.button>
                    
//                     {latestRoadmap.progress.percentComplete === 100 && (
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => navigate(`/quiz/${latestRoadmap._id}`)}
//                         className="px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl transition-all"
//                       >
//                         🎓 Certify
//                       </motion.button>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="py-12 text-center">
//                   <motion.div
//                     animate={{ y: [0, -10, 0] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="text-6xl mb-4"
//                   >
//                     🚀
//                   </motion.div>
//                   <h3 className="text-xl font-semibold text-slate-700 mb-2">Ready to start?</h3>
//                   <p className="text-slate-400 mb-6">Create your first learning roadmap</p>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => navigate("/roadmap/create")}
//                     className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
//                   >
//                     Get Started
//                   </motion.button>
//                 </div>
//               )}
//             </div>
//           </motion.section>

//           {/* Right Column - Resume & Quiz */}
//           <div className="lg:col-span-5 space-y-6">
            
//             {/* Resume Card */}
//             <motion.section
//               variants={itemVariants}
//               onClick={() => navigate("/resumes")}
//               className="relative group"
//             >
//               <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur" />
              
//               <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-200/50">
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white">
//                     📄
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-slate-800">Resume Builder</h3>
//                     <p className="text-xs text-slate-400">Professional templates</p>
//                   </div>
//                 </div>

//                 {latestResume ? (
//                   <div className="space-y-4">
//                     <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 text-white overflow-hidden">
//                       <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
//                       <p className="text-sm opacity-80">Current Role</p>
//                       <p className="font-bold text-lg mb-1">{latestResume.role}</p>
//                       <p className="text-xs opacity-60">{latestResume.name}</p>
//                     </div>
                    
//                     <div className="flex gap-2">
//                       <motion.button
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         onClick={(e) => {
//   e.stopPropagation();
//   downloadResumeApi(latestResume._id);
// }}
                        
//                         className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
//                       >
//                         <span>Download</span>
//                         <span className="text-lg">↓</span>
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={(e) => {
//                         e.stopPropagation();
//                         navigate(`/resume/edit/${latestResume._id}`);
//                       }}
//                         className="px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-medium hover:bg-indigo-100 transition-all"
//                       >
//                         Edit
//                       </motion.button>
//                     </div>
//                   </div>
//                 ) : (
//                   <motion.button
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     onClick={(e) => {
//   e.stopPropagation();
//   navigate("/resume/create");
// }}
//                     className="w-full py-6 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-medium hover:border-indigo-300 hover:text-indigo-500 transition-all group"
//                   >
//                     <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">+</span>
//                     Create New Resume
//                   </motion.button>
//                 )}
//               </div>
//             </motion.section>

//             {/* Quiz Stats Card */}
//             <motion.section
//               variants={itemVariants}
//               onClick={() => navigate("/quizzes")}
//               className="relative group cursor-pointer"
//             >
//               <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur" />
              
//               <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 shadow-xl overflow-hidden">
//                 <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform" />
                
//                 <div className="relative z-10">
//                   <div className="flex items-center justify-between mb-4">
//                     <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl backdrop-blur">
//                       📊
//                     </div>
//                     <span className="text-xs font-semibold text-white/80 bg-white/20 px-3 py-1 rounded-full">
//                       Live Stats
//                     </span>
//                   </div>

//                   <h3 className="text-white font-semibold mb-3">Quiz Performance</h3>
                  
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <p className="text-xs text-emerald-100">Total Attempts</p>
//                       <p className="text-2xl font-bold text-white">{quizStats?.totalAttempts || 0}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-emerald-100">Average Score</p>
//                       <p className="text-2xl font-bold text-white">{quizStats?.avgScore || 0}%</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-emerald-100">Best Score</p>
//                       <p className="text-2xl font-bold text-white">{quizStats?.bestScore || 0}%</p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-emerald-100">Last Score</p>
//                       <p className="text-2xl font-bold text-white">{quizStats?.lastScore || 0}%</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.section>
//           </div>

//           {/* Calendar Section */}
//           <motion.section
//             variants={itemVariants}
//             className="lg:col-span-12"
//           >
//             <div className="relative group">
//               <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
              
//               <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
//                 <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10" />
                
//                 <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
//                   <div className="space-y-4 text-center lg:text-left">
//                     <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm text-white/80">
//                       <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
//                       Smart Scheduling
//                     </div>
                    
//                     <h2 className="text-3xl lg:text-4xl font-bold text-white">
//                       Calendar & Reminders
//                     </h2>
                    
//                     <p className="text-slate-300 max-w-md">
//                       Get AI-powered reminders 30 minutes before your sessions. Never miss a deadline.
//                     </p>
                    
//                     <div className="flex items-center gap-4 text-white/60 text-sm">
//                       <span className="flex items-center gap-1">
//                         <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
//                         3 tasks today
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
//                         2 deadlines
//                       </span>
//                     </div>
//                   </div>

//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => navigate("/calendar")}
//                     className="group/btn relative"
//                   >
//                     <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-50 group-hover/btn:opacity-75 transition-opacity" />
//                     <div className="relative px-8 py-4 bg-white rounded-2xl text-slate-900 font-semibold flex items-center gap-2 shadow-xl">
//                       Open Calendar
//                       <span className="text-xl group-hover/btn:translate-x-1 transition-transform">→</span>
//                     </div>
//                   </motion.button>
//                 </div>

//                 {/* Decorative calendar grid */}
//                 <div className="absolute bottom-0 right-0 w-64 h-64 grid grid-cols-7 gap-1 opacity-5">
//                   {[...Array(35)].map((_, i) => (
//                     <div key={i} className="w-2 h-2 bg-white rounded" />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.section>

//           {/* Quick Actions */}
//           <motion.div
//             variants={itemVariants}
//             className="lg:col-span-12 mt-8"
//           >
//             <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 text-center">
//               Quick Actions
//             </p>
            
//             <div className="flex flex-wrap justify-center gap-3">
//               {[
//                 { label: "New Roadmap", path: "/roadmap/create", icon: "🚀", color: "indigo" },
//                 { label: "Roadmaps", path: "/roadmaps", icon: "💼", color: "purple" },
//                 { label: "Quiz", path: "/quizzes", icon: "🎓", color: "emerald" },
//                 { label: "AI Assistant", path: "/doubt-solver", icon: "🤖", color: "rose" },
//               ].map((tool) => (
//                 <motion.button
//                   key={tool.label}
//                   whileHover={{ scale: 1.05, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => navigate(tool.path)}
//                   className={`px-6 py-3 bg-white rounded-xl shadow-md border border-slate-200 text-slate-700 font-medium hover:shadow-xl transition-all flex items-center gap-2 group`}
//                 >
//                   <span className={`text-xl group-hover:rotate-12 transition-transform`}>
//                     {tool.icon}
//                   </span>
//                   {tool.label}
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         </motion.div>

//         {/* AI Doubt Solver Modal */}
//         {/* <AnimatePresence>
//           {showDoubtSolver && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-end"
//             >
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
//                 onClick={() => setShowDoubtSolver(false)}
//               />
              
//               <motion.div
//                 initial={{ x: "100%" }}
//                 animate={{ x: 0 }}
//                 exit={{ x: "100%" }}
//                 transition={{ type: "spring", damping: 25, stiffness: 200 }}
//                 className="relative w-full max-w-md h-full bg-white shadow-2xl"
//               >
//                 <div className="flex flex-col h-full p-8">
//                   <div className="flex justify-between items-center mb-8">
//                     <div className="flex items-center gap-3">
//                       <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl flex items-center justify-center text-2xl">
//                         🤖
//                       </div>
//                       <div>
//                         <h2 className="text-xl font-bold text-slate-800">AI Assistant</h2>
//                         <p className="text-xs text-slate-400">Powered by Deep Learning</p>
//                       </div>
//                     </div>
                    
//                     <motion.button
//                       whileHover={{ rotate: 90 }}
//                       onClick={() => setShowDoubtSolver(false)}
//                       className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-200 transition-colors"
//                     >
//                       ×
//                     </motion.button>
//                   </div>

//                   <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
//                     <motion.div
//                       animate={{ 
//                         y: [0, -10, 0],
//                         rotate: [0, 5, -5, 0]
//                       }}
//                       transition={{ duration: 4, repeat: Infinity }}
//                       className="w-32 h-32 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl flex items-center justify-center text-5xl shadow-2xl"
//                     >
//                       🤖
//                     </motion.div>
                    
//                     <h3 className="text-2xl font-bold text-slate-800">Need help?</h3>
                    
//                     <p className="text-slate-500 max-w-xs">
//                       Ask me anything about coding, placements, or your learning path.
//                     </p>
                    
//                     <motion.button
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => {
//                         setShowDoubtSolver(false);
//                         navigate("/doubt-solver");
//                       }}
//                       className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white py-4 rounded-xl font-semibold shadow-xl shadow-rose-200 hover:shadow-2xl transition-all"
//                     >
//                       Start Conversation
//                     </motion.button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence> */}
//         <AnimatePresence>
//   {showDoubtSolver && (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-[100] overflow-hidden"
//     >
//       {/* Backdrop with blur */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         className="absolute inset-0 bg-black/20 backdrop-blur-sm"
//         onClick={() => setShowDoubtSolver(false)}
//       />

//       {/* Sliding Panel from Right */}
//       <motion.div
//         initial={{ x: "100%" }}
//         animate={{ x: 0 }}
//         exit={{ x: "100%" }}
//         transition={{ type: "spring", damping: 30, stiffness: 300 }}
//         className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl border-l border-white/10"
//       >
//         {/* Animated Background Grid */}
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute inset-0" style={{
//             backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
//             backgroundSize: '40px 40px'
//           }} />
//         </div>

//         {/* Floating Particles */}
//         {[...Array(20)].map((_, i) => (
//           <motion.div
//             key={i}
//             animate={{
//               y: [0, -30, 0],
//               x: [0, Math.sin(i) * 20, 0],
//               opacity: [0.1, 0.3, 0.1],
//             }}
//             transition={{
//               duration: 5 + i,
//               repeat: Infinity,
//               delay: i * 0.2,
//             }}
//             className="absolute w-1 h-1 bg-rose-500/30 rounded-full"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//           />
//         ))}

//         {/* Close Button */}
//         <motion.button
//           whileHover={{ rotate: 180, scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={() => setShowDoubtSolver(false)}
//           className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
//         >
//           <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
//             <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
//           </svg>
//         </motion.button>

//         {/* Main Content */}
//         <div className="relative h-full flex flex-col p-8 pt-16 overflow-y-auto">
//           {/* Header with Animated Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="mb-12"
//           >
//             <motion.div
//               animate={{
//                 boxShadow: ['0 0 0 0 rgba(244,63,94,0.4)', '0 0 0 10px rgba(244,63,94,0)', '0 0 0 0 rgba(244,63,94,0.4)'],
//               }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="inline-block mb-6"
//             >
//               <span className="bg-rose-500/10 text-rose-400 text-xs font-mono px-3 py-1.5 rounded-full border border-rose-500/20">
//                 ⚡ AI-POWERED ASSISTANT
//               </span>
//             </motion.div>

//             <h2 className="text-4xl font-black text-white mb-3 tracking-tight">
//               Doubt
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-300">
//                 {' '}Solver
//               </span>
//             </h2>
//             <p className="text-slate-400 text-sm leading-relaxed">
//               Instant solutions to your coding problems with real-time AI analysis
//             </p>
//           </motion.div>

//           {/* Animated Stats Cards */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="grid grid-cols-2 gap-4 mb-8"
//           >
//             {[
//               { label: 'Response Time', value: '<200ms', icon: '⚡' },
//               { label: 'Accuracy', value: '98.5%', icon: '🎯' },
//             ].map((stat, i) => (
//               <motion.div
//                 key={i}
//                 whileHover={{ scale: 1.02, y: -2 }}
//                 className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10"
//               >
//                 <div className="text-2xl mb-2">{stat.icon}</div>
//                 <div className="text-2xl font-bold text-white">{stat.value}</div>
//                 <div className="text-xs text-slate-500">{stat.label}</div>
//               </motion.div>
//             ))}
//           </motion.div>

          

//           {/* AI Brain Visualization */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.4 }}
//             className="relative mb-8"
//           >
//             {/* Neural Network Animation */}
//             <div className="relative h-48 bg-gradient-to-br from-rose-500/5 to-purple-500/5 rounded-3xl border border-white/10 overflow-hidden">
//               {/* Brain SVG Paths */}
//               <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
//                 {/* Animated Connection Lines */}
//                 {[...Array(8)].map((_, i) => (
//                   <motion.circle
//                     key={`node-${i}`}
//                     cx={50 + i * 40}
//                     cy={100 + Math.sin(i) * 20}
//                     r="4"
//                     fill="#f43f5e"
//                     initial={{ scale: 0 }}
//                     animate={{ scale: [1, 1.5, 1] }}
//                     transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
//                   />
//                 ))}
                
//                 {/* Connection Lines */}
//                 {[...Array(7)].map((_, i) => (
//                   <motion.line
//                     key={`line-${i}`}
//                     x1={50 + i * 40 + 4}
//                     y1={100 + Math.sin(i) * 20}
//                     x2={50 + (i + 1) * 40 - 4}
//                     y2={100 + Math.sin(i + 1) * 20}
//                     stroke="#f43f5e"
//                     strokeWidth="1"
//                     initial={{ pathLength: 0, opacity: 0 }}
//                     animate={{ pathLength: 1, opacity: 0.3 }}
//                     transition={{ duration: 1.5, delay: i * 0.2 }}
//                   />
//                 ))}
//               </svg>

//               {/* Floating Orbs */}
//               <motion.div
//                 animate={{
//                   y: [0, -10, 0],
//                   rotate: [0, 360],
//                 }}
//                 transition={{ duration: 8, repeat: Infinity }}
//                 className="absolute top-1/2 left-1/4 w-12 h-12 bg-rose-500/20 rounded-full blur-xl"
//               />
//               <motion.div
//                 animate={{
//                   y: [0, 10, 0],
//                   rotate: [360, 0],
//                 }}
//                 transition={{ duration: 6, repeat: Infinity }}
//                 className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl"
//               />

//               {/* Center Text */}
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <motion.div
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 3, repeat: Infinity }}
//                   className="text-center"
//                 >
//                   <span className="text-5xl mb-2 block">🧠</span>
//                   <span className="text-xs font-mono text-rose-400">NEURAL ACTIVE</span>
//                 </motion.div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Features List */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="space-y-4 mb-8"
//           >
//             {[
//               { icon: '🚀', text: 'Real-time code analysis & debugging' },
//               { icon: '💡', text: 'Concept explanations with examples' },
//               { icon: '⚡', text: 'Instant syntax correction' },
//               { icon: '🎓', text: 'Placement-specific guidance' },
//             ].map((feature, i) => (
//               <motion.div
//                 key={i}
//                 whileHover={{ x: 5 }}
//                 className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10"
//               >
//                 <span className="text-2xl">{feature.icon}</span>
//                 <span className="text-sm text-slate-300">{feature.text}</span>
//               </motion.div>
//             ))}
//           </motion.div>

//           {/* Action Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="mt-auto"
//           >
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               onClick={() => {
//                 setShowDoubtSolver(false);
//                 navigate("/doubt-solver");
//               }}
//               className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 p-[2px]"
//             >
//               <div className="relative flex items-center justify-center gap-3 rounded-2xl bg-slate-900 px-6 py-4 transition-all group-hover:bg-transparent">
//                 <span className="font-bold text-white text-lg">Launch Assistant</span>
//                 <motion.span
//                   animate={{ x: [0, 5, 0] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                   className="text-white text-xl"
//                 >
//                   →
//                 </motion.span>
//               </div>
//             </motion.button>

//             {/* Typing Indicator */}
//             <motion.div
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ duration: 2, repeat: Infinity }}
//               className="flex items-center justify-center gap-1 mt-4"
//             >
//               <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
//               <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
//               <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
//               <span className="text-xs text-slate-600 ml-2">AI ready to assist</span>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Bottom Gradient */}
//         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
//       </motion.div>
//     </motion.div>
//   )}
// </AnimatePresence>
//         {/* Floating AI Button */}
//         <motion.button
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           whileHover={{ scale: 1.1, rotate: 5 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={() => setShowDoubtSolver(true)}
//           className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-2xl hover:shadow-rose-200/50 z-40"
//         >
//           🤖
//         </motion.button>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default Dashboard;








import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/common/Navbar.jsx";
import Footer from "../../components/common/Footer.jsx";
import { getMyRoadmapsApi } from "../../api/roadmapApi.jsx";
import { getQuizStatsApi } from "../../api/quizApi.jsx";
import { getMyResumesApi, downloadResumeApi } from "../../api/resumeApi.jsx";
import ProgressBar from "../../components/dashboard/ProgressBar.jsx";
import WeeklyStreak from "../../components/dashboard/WeeklyStreak.jsx";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
const Dashboard = () => {
  const navigate = useNavigate();
  const [latestRoadmap, setLatestRoadmap] = useState(null);
  const [latestResume, setLatestResume] = useState(null);
  const [showDoubtSolver, setShowDoubtSolver] = useState(false);
  const [quizStats, setQuizStats] = useState({
    totalAttempts: 0, avgScore: 0, bestScore: 0, lastScore: 0,
  });
  const [greeting, setGreeting] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const roadmapRes = await getMyRoadmapsApi();
        const roadmaps = roadmapRes.data.roadmaps || [];
        if (roadmaps.length > 0) {
          const activeId = localStorage.getItem("activeRoadmapId");
          setLatestRoadmap(roadmaps.find((r) => r._id === activeId) || roadmaps[0]);
        }
      } catch (err) { console.error(err); }

      try {
        const resumeRes = await getMyResumesApi();
        const resumes = resumeRes.data.resumes || [];
        if (resumes.length > 0) {
          const activeId = localStorage.getItem("activeResumeId");
          setLatestResume(resumes.find((r) => r._id === activeId) || resumes[0]);
        }
      } catch (err) { console.error(err); }

      try {
        const statsRes = await getQuizStatsApi();
        setQuizStats(statsRes.data.stats);
      } catch (err) { console.log(err); }
    };
    loadData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 font-['Inter']">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 lg:mb-16 gap-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="text-4xl"
              >
                👋
              </motion.div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
                {greeting},  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
    {user?.name?.split(" ")[0] || "User"}
  </span>
              </h1>
            </div>
            <p className="text-slate-500 text-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Here's your career dashboard overview
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl px-8 py-4 shadow-lg border border-slate-200/50"
          >
            <WeeklyStreak streak={5} />
          </motion.div>
        </motion.div>

        {/* Main Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
        >

          {/* Main Roadmap Card */}
          <motion.section
            variants={itemVariants}
            className="lg:col-span-7 relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />

            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-slate-200/50 hover:border-indigo-200/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">
                    🎯
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">Active Track</h2>
                    <p className="text-xs text-slate-400">Current learning path</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => navigate("/roadmaps")}
                  className="text-sm font-medium text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1"
                >
                  View all
                  <span>→</span>
                </motion.button>
              </div>

              {latestRoadmap ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 mb-3">
                      {latestRoadmap.domain}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
                        {latestRoadmap.salaryRange}
                      </span>
                      <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100">
                        {latestRoadmap.companyType}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-slate-500">Progress</span>
                      <span className="text-2xl font-bold text-indigo-600">
                        {latestRoadmap.progress.percentComplete}%
                      </span>
                    </div>
                    <ProgressBar percent={latestRoadmap.progress.percentComplete} />

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-slate-700">
                          {latestRoadmap.progress.completedTopics}
                        </p>
                        <p className="text-xs text-slate-400">Completed</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-slate-700">
                          {latestRoadmap.progress.totalTopics}
                        </p>
                        <p className="text-xs text-slate-400">Total Topics</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/roadmap/${latestRoadmap._id}`)}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-xl transition-all"
                    >
                      Continue Learning
                    </motion.button>

                    {latestRoadmap.progress.percentComplete === 100 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/quiz/${latestRoadmap._id}`)}
                        className="px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold shadow-lg shadow-emerald-200 hover:shadow-xl transition-all"
                      >
                        🎓 Certify
                      </motion.button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-4"
                  >
                    🚀
                  </motion.div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">Ready to start?</h3>
                  <p className="text-slate-400 mb-6">Create your first learning roadmap</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/roadmap/create")}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg"
                  >
                    Get Started
                  </motion.button>
                </div>
              )}
            </div>
          </motion.section>

          {/* Right Column - Resume & Quiz */}
          <div className="lg:col-span-5 space-y-6">

            {/* Resume Card */}
            <motion.section
              variants={itemVariants}
              onClick={() => navigate("/resumes")}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur" />

              <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-slate-200/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white">
                    📄
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Resume Builder</h3>
                    <p className="text-xs text-slate-400">Professional templates</p>
                  </div>
                </div>

                {latestResume ? (
                  <div className="space-y-4">
                    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 text-white overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full blur-2xl" />
                      <p className="text-sm opacity-80">Current Role</p>
                      <p className="font-bold text-lg mb-1">{latestResume.role}</p>
                      <p className="text-xs opacity-60">{latestResume.name}</p>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadResumeApi(latestResume._id);
                        }}

                        className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                      >
                        <span>Download</span>
                        <span className="text-lg">↓</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/resume/edit/${latestResume._id}`);
                        }}
                        className="px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-medium hover:bg-indigo-100 transition-all"
                      >
                        Edit
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/resume/create");
                    }}
                    className="w-full py-6 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 font-medium hover:border-indigo-300 hover:text-indigo-500 transition-all group"
                  >
                    <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">+</span>
                    Create New Resume
                  </motion.button>
                )}
              </div>
            </motion.section>

            {/* Quiz Stats Card */}
            <motion.section
              variants={itemVariants}
              onClick={() => navigate("/quizzes")}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur" />

              <div className="relative bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-6 shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white text-xl backdrop-blur">
                      📊
                    </div>
                    <span className="text-xs font-semibold text-white/80 bg-white/20 px-3 py-1 rounded-full">
                      Live Stats
                    </span>
                  </div>

                  <h3 className="text-white font-semibold mb-3">Quiz Performance</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-emerald-100">Total Attempts</p>
                      <p className="text-2xl font-bold text-white">{quizStats?.totalAttempts || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-emerald-100">Average Score</p>
                      <p className="text-2xl font-bold text-white">{quizStats?.avgScore || 0}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-emerald-100">Best Score</p>
                      <p className="text-2xl font-bold text-white">{quizStats?.bestScore || 0}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-emerald-100">Last Score</p>
                      <p className="text-2xl font-bold text-white">{quizStats?.lastScore || 0}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Calendar Section */}
          <motion.section
            variants={itemVariants}
            className="lg:col-span-12"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />

              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10" />

                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8">
                  <div className="space-y-4 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm text-white/80">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                      Smart Scheduling
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-bold text-white">
                      Calendar & Reminders
                    </h2>

                    <p className="text-slate-300 max-w-md">
                      Get AI-powered reminders 30 minutes before your sessions. Never miss a deadline.
                    </p>

                    <div className="flex items-center gap-4 text-white/60 text-sm">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        3 tasks today
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        2 deadlines
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/calendar")}
                    className="group/btn relative"
                  >
                    <div className="absolute inset-0 bg-white rounded-2xl blur-xl opacity-50 group-hover/btn:opacity-75 transition-opacity" />
                    <div className="relative px-8 py-4 bg-white rounded-2xl text-slate-900 font-semibold flex items-center gap-2 shadow-xl">
                      Open Calendar
                      <span className="text-xl group-hover/btn:translate-x-1 transition-transform">→</span>
                    </div>
                  </motion.button>
                </div>

                <div className="absolute bottom-0 right-0 w-64 h-64 grid grid-cols-7 gap-1 opacity-5">
                  {[...Array(35)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-white rounded" />
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Quick Actions Footer */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-12 mt-8"
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 text-center">
              Quick Actions
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "New Roadmap", path: "/roadmap/create", icon: "🚀", color: "indigo" },
                { label: "Roadmaps", path: "/roadmaps", icon: "💼", color: "purple" },
                { label: "Quiz", path: "/quizzes", icon: "🎓", color: "emerald" },
                { label: "AI Assistant", path: "/doubt-solver", icon: "🤖", color: "rose" },
              ].map((tool) => (
                <motion.button
                  key={tool.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(tool.path)}
                  className={`px-6 py-3 bg-white rounded-xl shadow-md border border-slate-200 text-slate-700 font-medium hover:shadow-xl transition-all flex items-center gap-2 group`}
                >
                  <span className={`text-xl group-hover:rotate-12 transition-transform`}>
                    {tool.icon}
                  </span>
                  {tool.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* AI Doubt Solver Side Panel */}
        <AnimatePresence>
          {showDoubtSolver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={() => setShowDoubtSolver(false)}
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl border-l border-white/10"
              >
                {/* Animated Background Grid */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '40px 40px'
                  }} />
                </div>

                {/* Floating Particles */}
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -30, 0],
                      x: [0, Math.sin(i) * 20, 0],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 5 + i,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    className="absolute w-1 h-1 bg-rose-500/30 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}

                {/* Close Button */}
                <motion.button
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowDoubtSolver(false)}
                  className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 backdrop-blur border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.button>

                {/* Main Content */}
                <div className="relative h-full flex flex-col p-8 pt-16 overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-10"
                  >
                    <motion.div
                      animate={{
                        boxShadow: ['0 0 0 0 rgba(244,63,94,0.4)', '0 0 0 10px rgba(244,63,94,0)', '0 0 0 0 rgba(244,63,94,0.4)'],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-block mb-6"
                    >
                      <span className="bg-rose-500/10 text-rose-400 text-xs font-mono px-3 py-1.5 rounded-full border border-rose-500/20">
                        ⚡ AI-POWERED ASSISTANT
                      </span>
                    </motion.div>

                    <h2 className="text-4xl font-black text-white mb-3 tracking-tight">
                      Doubt
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-300">
                        {' '}Solver
                      </span>
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Instant neural analysis for Jaya Krishna's technical roadblocks.
                    </p>
                  </motion.div>

                  {/* Brain Visualization */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="relative mb-8 p-6 bg-white/5 rounded-3xl border border-white/5 overflow-hidden"
                  >
                    <div className="relative z-10 text-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-6xl mb-3"
                      >
                        🧠
                      </motion.div>
                      <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest block">Neural Link Syncing...</span>
                    </div>
                    {/* Scanner Line Effect */}
                    <motion.div
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-rose-500/30 blur-sm z-0"
                    />
                  </motion.div>

                  {/* Interactive Quick-Protocol Orbs */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Select Protocol</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Code Audit', icon: '🔍', color: 'from-blue-500/20' },
                        { label: 'Mock Pitch', icon: '🎤', color: 'from-emerald-500/20' },
                        { label: 'Logic Fix', icon: '🛠️', color: 'from-amber-500/20' },
                        { label: 'HR Prep', icon: '💼', color: 'from-indigo-500/20' },
                      ].map((orb, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-br ${orb.color} to-transparent border border-white/5 text-left transition-all`}
                          onClick={() => {
                            setShowDoubtSolver(false);
                            navigate("/doubt-solver", { state: { initialProtocol: orb.label } });
                          }}
                        >
                          <span className="text-xl">{orb.icon}</span>
                          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-tight">{orb.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Improved Launch Button with Glow-Follow */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="relative group mt-auto"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowDoubtSolver(false);
                        navigate("/doubt-solver");
                      }}
                      className="relative w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-5 flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-2 h-2 bg-rose-500 rounded-full animate-ping absolute inset-0"></div>
                          <div className="w-2 h-2 bg-rose-500 rounded-full relative"></div>
                        </div>
                        <span className="font-black text-white uppercase tracking-widest text-sm">Initialize Neural Link</span>
                      </div>
                      <span className="text-rose-500 font-bold group-hover:translate-x-2 transition-transform">→</span>
                    </motion.button>
                  </motion.div>

                  {/* Contextual System Info */}
                  <div className="mt-6 flex justify-between items-center px-2">
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-600 font-black uppercase tracking-tighter">Core</span>
                        <span className="text-[10px] text-slate-400 font-mono">GPT-4.0-GAPX</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-600 font-black uppercase tracking-tighter">Latency</span>
                        <span className="text-[10px] text-emerald-500 font-mono">14ms</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-700 font-mono italic">#Session_Active</span>
                  </div>

                  {/* Typing Indicator */}
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center justify-center gap-1 mt-6"
                  >
                    <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                    <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                    <span className="w-1 h-1 bg-rose-500 rounded-full"></span>
                    <span className="text-[10px] text-slate-600 ml-2 font-mono tracking-widest uppercase">System Standby</span>
                  </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating AI FAB */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowDoubtSolver(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 text-white rounded-2xl flex items-center justify-center text-3xl shadow-2xl hover:shadow-rose-200/50 z-[90] transition-shadow"
        >
          🤖
        </motion.button>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;