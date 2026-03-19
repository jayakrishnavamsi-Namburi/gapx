// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "../../components/common/Navbar";
// import {
//   getSingleResumeApi,
//   downloadResumeApi,
// } from "../../api/resumeApi";

// const ResumeView = () => {
//   const { id } = useParams();
//   const [resume, setResume] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchResume = async () => {
//       try {
//         const res = await getSingleResumeApi(id);
//         setResume(res.data.resume);
//       } catch (err) {
//         alert("Failed to load resume");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResume();
//   }, [id]);

//   const handleDownload = async () => {
//     try {
//       await downloadResumeApi(id);
//     } catch {
//       alert("Failed to download resume");
//     }
//   };

//   if (loading) return <p style={{ padding: 20 }}>Loading resume...</p>;

//   if (!resume) return <p style={{ padding: 20 }}>Resume not found</p>;

//   return (
//     <>
//       <Navbar />

//       <div style={container}>
//         {/* HEADER - Fixed to use personal object */}
//         <div style={header}>
//           <h1>{resume.personal?.name || resume.name || 'N/A'}</h1>
//           <p>{resume.personal?.title || 'Software'}</p>
//           <p>{resume.personal?.email || 'N/A'}</p>
//           {resume.personal?.phone && (
//             <p>{resume.personal?.phone}</p>
//           )}
//           <p>{resume.personal?.location || ''}</p>

//           <button style={downloadBtn} onClick={handleDownload}>
//             Download PDF
//           </button>
//         </div>

//         {/* SUMMARY */}
//         {resume.summary && (
//           <Section title="Professional Summary">
//             <p>{resume.summary}</p>
//           </Section>
//         )}

//         {/* SKILLS */}
//         {resume.skills?.length > 0 && (
//           <Section title="Skills">
//             <div style={chipWrap}>
//               {resume.skills.map((skill, i) => (
//                 <span key={i} style={chip}>{skill}</span>
//               ))}
//             </div>
//           </Section>
//         )}

//         {/* EXPERIENCE */}
//         {resume.experience?.length > 0 && (
//           <Section title="Experience">
//             {resume.experience.map((exp, i) => (
//               <div key={i} style={item}>
//                 <strong>{exp.role} — {exp.company}</strong>
//                 <p style={duration}><em>{exp.duration}</em></p>
//                 <p>{exp.description}</p>
//               </div>
//             ))}
//           </Section>
//         )}

//         {/* PROJECTS */}
//         {resume.projects?.length > 0 && (
//           <Section title="Projects">
//             {resume.projects.map((proj, i) => (
//               <div key={i} style={item}>
//                 <strong>{proj.title}</strong>
//                 {proj.techStack?.length > 0 && (
//                   <p><strong>Tech:</strong> {proj.techStack.join(", ")}</p>
//                 )}
//                 {proj.description && <p>{proj.description}</p>}
//                 {proj.link && (
//                   <p>
//                     <a href={proj.link} target="_blank" rel="noreferrer" style={linkStyle}>
//                       View Project ↗
//                     </a>
//                   </p>
//                 )}
//               </div>
//             ))}
//           </Section>
//         )}

//         {/* EDUCATION */}
//         {resume.education?.length > 0 && (
//           <Section title="Education">
//             {resume.education.map((edu, i) => (
//               <div key={i} style={item}>
//                 <strong>{edu.degree}, {edu.institution}</strong>
//                 <p style={duration}><em>{edu.year}</em></p>
//               </div>
//             ))}
//           </Section>
//         )}

//         {/* CERTIFICATIONS */}
//         {resume.certifications?.length > 0 && (
//           <Section title="Certifications">
//             <div style={chipWrap}>
//               {resume.certifications.map((cert, i) => (
//                 <span key={i} style={chip}>{cert}</span>
//               ))}
//             </div>
//           </Section>
//         )}
//       </div>
//     </>
//   );
// };

// /* ---------- REUSABLE SECTION ---------- */
// const Section = ({ title, children }) => (
//   <div style={section}>
//     <h3>{title}</h3>
//     {children}
//   </div>
// );

// /* ---------- STYLES ---------- */
// const container = {
//   maxWidth: "900px",
//   margin: "30px auto",
//   padding: "20px",
//   fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//   lineHeight: 1.6,
//   color: '#333'
// };

// const header = {
//   textAlign: "center",
//   borderBottom: "3px solid #e5e7eb",
//   paddingBottom: "30px",
//   marginBottom: "40px",
//   background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
//   borderRadius: "16px",
//   padding: "40px 30px",
// };

// const section = {
//   marginBottom: "35px",
//   padding: "25px",
//   background: "#fff",
//   borderRadius: "12px",
//   boxShadow: "0 4px 6px -1px rgba(0, 0,0, 0.1)",
//   border: "1px solid #e5e7eb",
// };

// const item = {
//   marginBottom: "20px",
//   paddingBottom: "15px",
//   borderBottom: "1px solid #f3f4f6",
// };

// const duration = {
//   color: "#6b7280",
//   fontSize: "14px",
//   margin: "5px 0",
// };

// const chipWrap = {
//   display: "flex",
//   flexWrap: "wrap",
//   gap: "10px",
// };

// const chip = {
//   padding: "8px 16px",
//   borderRadius: "25px",
//   background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//   color: "white",
//   fontSize: "14px",
//   fontWeight: "500",
// };

// const downloadBtn = {
//   marginTop: "20px",
//   padding: "12px 24px",
//   background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
//   color: "#fff",
//   border: "none",
//   borderRadius: "8px",
//   cursor: "pointer",
//   fontSize: "16px",
//   fontWeight: "600",
//   transition: "all 0.2s ease",
//   boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
// };

// const linkStyle = {
//   color: "#3b82f6",
//   textDecoration: "none",
//   fontWeight: "500",
// };

// downloadBtn.hover = {
//   ...downloadBtn,
//   transform: "translateY(-2px)",
//   boxShadow: "0 6px 16px rgba(16, 185, 129, 0.4)",
// };

// export default ResumeView;




import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/common/Navbar.jsx";
import {
  getSingleResumeApi,
  downloadResumeApi,
} from "../../api/resumeApi";

const ResumeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("professional");
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await getSingleResumeApi(id);
        setResume(res.data.resume);
      } catch (err) {
        alert("Failed to load resume");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, [id]);

  const handleDownload = async () => {
    try {
      await downloadResumeApi(id);
    } catch {
      alert("Failed to download resume");
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => setShowShareModal(false), 2000);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full mb-6 mx-auto"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl text-slate-600"
            >
              Loading your resume...
            </motion.p>
          </div>
        </div>
      </>
    );
  }

  if (!resume) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-8xl mb-6"
            >
              😕
            </motion.div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Resume Not Found</h2>
            <p className="text-slate-500 mb-8">The resume you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate("/my-resumes")}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              ← Back to My Resumes
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Header with Actions */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-xl"
                  >
                    📄
                  </motion.div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                      {resume.personal?.name || resume.name}
                    </h1>
                    <p className="text-lg text-indigo-600 font-medium">{resume.role}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/my-resumes")}
                    className="px-5 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-all flex items-center gap-2"
                  >
                    <span>←</span>
                    Back
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="px-5 py-3 bg-indigo-100 text-indigo-700 rounded-xl font-medium hover:bg-indigo-200 transition-all flex items-center gap-2"
                  >
                    <span>🔗</span>
                    Share
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDownload}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <span>📥</span>
                    Download PDF
                  </motion.button>
                </div>
              </div>

              {/* Contact Info Strip */}
              <div className="mt-6 pt-6 border-t border-slate-200/50 flex flex-wrap gap-4 justify-center md:justify-start">
                {resume.personal?.email && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl">
                    <span className="text-indigo-600">📧</span>
                    <span className="text-sm text-slate-600">{resume.personal.email}</span>
                  </div>
                )}
                {resume.personal?.phone && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl">
                    <span className="text-indigo-600">📱</span>
                    <span className="text-sm text-slate-600">{resume.personal.phone}</span>
                  </div>
                )}
                {resume.personal?.location && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl">
                    <span className="text-indigo-600">📍</span>
                    <span className="text-sm text-slate-600">{resume.personal.location}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Profile & Skills */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Profile Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                  Profile
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <span className="text-xl">🎯</span>
                    <span className="text-sm">{resume.role} Professional</span>
                  </div>
                  
                  {resume.personal?.linkedin && (
                    <a href={resume.personal.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors">
                      <span className="text-xl">💼</span>
                      <span className="text-sm">LinkedIn Profile</span>
                    </a>
                  )}
                  
                  {resume.personal?.github && (
                    <a href={resume.personal.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 transition-colors">
                      <span className="text-xl">🐙</span>
                      <span className="text-sm">GitHub Profile</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Skills Card */}
              {resume.skills?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                    Skills
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {resume.skills.map((skill, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-xl text-sm font-medium border border-indigo-100"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications Card */}
              {resume.certifications?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                    Certifications
                  </h3>
                  
                  <div className="space-y-3">
                    {resume.certifications.map((cert, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                        <span className="text-emerald-600">📜</span>
                        <span className="text-sm text-slate-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right Column - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Summary Card */}
              {resume.summary && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                    Professional Summary
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{resume.summary}</p>
                </div>
              )}

              {/* Experience Card */}
              {resume.experience?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                    Work Experience
                  </h3>
                  
                  <div className="space-y-6">
                    {resume.experience.map((exp, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative pl-6 border-l-2 border-indigo-200"
                      >
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white" />
                        
                        <div className="mb-2">
                          <h4 className="text-xl font-bold text-slate-800">{exp.role}</h4>
                          <p className="text-indigo-600 font-medium">{exp.company}</p>
                          <p className="text-sm text-slate-400 mt-1">{exp.duration}</p>
                        </div>
                        
                        <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Card */}
              {resume.projects?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
                    Projects
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {resume.projects.map((proj, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative"
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur" />
                        
                        <div className="relative bg-slate-50 rounded-xl p-5 border border-slate-200 group-hover:border-transparent transition-all">
                          <h4 className="font-bold text-slate-800 mb-2">{proj.title}</h4>
                          
                          {proj.techStack?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {proj.techStack.slice(0, 3).map((tech, idx) => (
                                <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-lg">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <p className="text-sm text-slate-600 mb-3">{proj.description}</p>
                          
                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                              View Project
                              <span>→</span>
                            </a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Card */}
              {resume.education?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
                    Education
                  </h3>
                  
                  <div className="space-y-4">
                    {resume.education.map((edu, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-xl">
                          🎓
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800">{edu.degree}</h4>
                          <p className="text-indigo-600">{edu.institution}</p>
                          <p className="text-sm text-slate-400 mt-1">{edu.year}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Footer Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex justify-between items-center p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20"
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">✨</span>
              <div>
                <p className="text-sm text-slate-500">Resume Status</p>
                <p className="font-bold text-emerald-600">ATS Optimized • Ready to Use</p>
              </div>
            </div>

            <button
              onClick={handleDownload}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <span>📥</span>
              Download PDF
            </button>
          </motion.div>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                  ✅
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Link Copied!</h3>
                <p className="text-slate-500">Resume URL has been copied to clipboard</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </>
  );
};

export default ResumeView;