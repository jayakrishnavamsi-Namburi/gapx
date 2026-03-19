// import { useState } from "react";
// import Navbar from "../../components/common/Navbar";
// import { suggestProjectsApi } from "../../api/projectApi";

// const ProjectSuggestions = () => {
//   const [form, setForm] = useState({
//     salaryRange: "",
//     domain: "",
//   });

//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleGenerate = async () => {
//     try {
//       setLoading(true);
//       const res = await suggestProjectsApi(form);
//       setProjects(res.data.suggestion.projects);
//     } catch {
//       alert("Failed to generate project suggestions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div style={{ padding: 30, maxWidth: 900, margin: "auto" }}>
//         <h2>🎯 Project Suggestions</h2>

//         <input
//           name="salaryRange"
//           placeholder="Salary Range (10-15 LPA)"
//           onChange={handleChange}
//         />
//         <br />

//         <input
//           name="domain"
//           placeholder="Domain (Full Stack / AIML)"
//           onChange={handleChange}
//         />
//         <br />

//         <button onClick={handleGenerate}>
//           {loading ? "Generating..." : "Suggest Projects"}
//         </button>

//         <hr />

//         {projects.map((p, i) => (
//           <div key={i} style={card}>
//             <h3>{p.title}</h3>
//             <p><b>Level:</b> {p.level}</p>
//             <p>{p.description}</p>

//             <p><b>Tech:</b> {p.techStack.join(", ")}</p>
//             <p><b>Why:</b> {p.whyThisProject}</p>

//             <ul>
//               {p.resources.map((r, idx) => (
//                 <li key={idx}>
//                   <a href={r.link} target="_blank">
//                     {r.title} ({r.type})
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// const card = {
//   border: "1px solid #ddd",
//   borderRadius: "10px",
//   padding: "20px",
//   marginTop: "20px",
// };

// export default ProjectSuggestions;












import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/common/Navbar";
import { suggestProjectsApi } from "../../api/projectApi";

const ProjectSuggestions = () => {
  const [form, setForm] = useState({
    salaryRange: "",
    domain: "",
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("all");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const res = await suggestProjectsApi(form);
      setProjects(res.data.suggestion.projects);
    } catch {
      alert("Failed to generate project suggestions");
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = selectedLevel === "all" 
    ? projects 
    : projects.filter(p => p.level.toLowerCase() === selectedLevel.toLowerCase());

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-sm mb-4">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-indigo-600">AI-Powered Suggestions</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Project Ideas Generator
            </span>
          </h1>
          
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Get personalized project suggestions based on your target salary and domain expertise
          </p>
        </motion.div>

        {/* Input Form - Premium Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" />
            
            <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200/50">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    Target Salary Range
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">💰</span>
                    <input
                      name="salaryRange"
                      placeholder="e.g., 10-15 LPA"
                      value={form.salaryRange}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-400">Enter your expected salary range</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    Domain / Specialization
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔧</span>
                    <input
                      name="domain"
                      placeholder="e.g., Full Stack, AIML"
                      value={form.domain}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs text-slate-400">Your primary tech domain</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                disabled={loading}
                className="w-full mt-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group/btn"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <span>Generating Ideas</span>
                      <span className="animate-pulse">...</span>
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      Generate Project Ideas
                      <span>→</span>
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Unique Rope Pulling Loading Animation */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <div className="relative w-full max-w-3xl px-4">
                {/* Student pulling rope */}
                <motion.div
                  animate={{ x: [0, 20, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
                >
                  <div className="relative">
                    {/* Student character */}
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-4xl shadow-2xl">
                      🧑‍🎓
                    </div>
                    
                    {/* Pulling arms */}
                    <motion.div
                      animate={{ rotate: [-10, 10, -10] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute -right-8 top-1/2 -translate-y-1/2 w-12 h-4 bg-indigo-500 rounded-full"
                    />
                    
                    {/* Rope */}
                    <motion.div
                      animate={{ scaleX: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -right-16 top-1/2 -translate-y-1/2 w-32 h-1 bg-gradient-to-r from-indigo-600 to-purple-600"
                      style={{ transformOrigin: "left" }}
                    />
                  </div>
                </motion.div>

                {/* Container train being pulled */}
                <div className="absolute left-48 right-0 top-1/2 -translate-y-1/2 overflow-hidden">
                  <motion.div
                    animate={{ x: [0, -100, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="flex gap-4"
                  >
                    {/* Multiple project containers */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-2xl border-2 border-indigo-200 overflow-hidden"
                      >
                        {/* Container header */}
                        <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
                        
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                              <span className="text-xl">📦</span>
                            </div>
                            <div>
                              <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
                              <div className="h-2 w-16 bg-slate-100 rounded mt-2 animate-pulse" />
                            </div>
                          </div>
                          
                          {/* Container content skeleton */}
                          <div className="space-y-3">
                            <div className="h-2 bg-slate-200 rounded animate-pulse" />
                            <div className="h-2 bg-slate-200 rounded w-3/4 animate-pulse" />
                            <div className="h-2 bg-slate-200 rounded w-1/2 animate-pulse" />
                            
                            {/* Tech stack pills */}
                            <div className="flex gap-2 mt-4">
                              <div className="h-6 w-16 bg-indigo-100 rounded-full animate-pulse" />
                              <div className="h-6 w-16 bg-purple-100 rounded-full animate-pulse" />
                              <div className="h-6 w-16 bg-pink-100 rounded-full animate-pulse" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Container wheels */}
                        <div className="flex justify-between px-4 pb-4">
                          <div className="w-4 h-4 bg-slate-300 rounded-full" />
                          <div className="w-4 h-4 bg-slate-300 rounded-full" />
                          <div className="w-4 h-4 bg-slate-300 rounded-full" />
                          <div className="w-4 h-4 bg-slate-300 rounded-full" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Loading text */}
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center"
                >
                  <p className="text-xl font-semibold text-indigo-600">
                    Pulling project ideas for you...
                  </p>
                  <p className="text-sm text-slate-400 mt-2">
                    Our AI is curating the best projects
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        <AnimatePresence>
          {projects.length > 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Filter and Stats Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-500">Filter by level:</span>
                  <div className="flex gap-2">
                    {["all", "beginner", "intermediate", "advanced"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                          selectedLevel === level
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                            : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-slate-500">
                  Showing {filteredProjects.length} of {projects.length} projects
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group relative"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur" />
                    
                    <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 hover:border-indigo-200/50 transition-all">
                      {/* Project level badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          project.level === "beginner" ? "bg-emerald-100 text-emerald-700" :
                          project.level === "intermediate" ? "bg-amber-100 text-amber-700" :
                          "bg-rose-100 text-rose-700"
                        }`}>
                          {project.level}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-slate-800 mb-3 pr-20">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <p className="text-xs font-semibold text-slate-400 mb-2">TECH STACK</p>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-lg"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Why This Project */}
                      <div className="mb-4 p-3 bg-indigo-50 rounded-xl">
                        <p className="text-xs font-semibold text-indigo-600 mb-1">WHY THIS PROJECT</p>
                        <p className="text-sm text-slate-600">{project.whyThisProject}</p>
                      </div>

                      {/* Resources */}
                      <div>
                        <p className="text-xs font-semibold text-slate-400 mb-2">RESOURCES</p>
                        <div className="space-y-2">
                          {project.resources.map((resource, idx) => (
                            <a
                              key={idx}
                              href={resource.link}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg hover:bg-indigo-50 transition-colors group/link"
                            >
                              <span className="text-lg">
                                {resource.type === "video" ? "🎥" : "📄"}
                              </span>
                              <span className="flex-1 text-sm text-slate-600 truncate">
                                {resource.title}
                              </span>
                              <span className="text-slate-400 group-hover/link:translate-x-1 transition-transform">
                                ↗
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Project stats */}
                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-xs text-slate-400">
                        <span>⭐ {project.difficulty || "Intermediate"}</span>
                        <span>📊 {project.estimatedHours || "40-60"} hours</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Empty state for filtered results */}
              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">No projects found</h3>
                  <p className="text-slate-400">Try selecting a different difficulty level</p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!loading && projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center py-16"
          >
            <div className="relative inline-block">
              <div className="text-8xl mb-6 animate-float">🎯</div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 w-4 h-4 bg-indigo-500 rounded-full"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-slate-700 mb-3">
              Ready to build something amazing?
            </h2>
            
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              Enter your preferences above to get AI-generated project ideas tailored to your career goals.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-400">
              <span className="px-4 py-2 bg-white rounded-full shadow-sm">🎨 Full Stack</span>
              <span className="px-4 py-2 bg-white rounded-full shadow-sm">🤖 AIML</span>
              <span className="px-4 py-2 bg-white rounded-full shadow-sm">📱 Mobile Dev</span>
              <span className="px-4 py-2 bg-white rounded-full shadow-sm">☁️ Cloud</span>
            </div>
          </motion.div>
        )}
      </main>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProjectSuggestions;