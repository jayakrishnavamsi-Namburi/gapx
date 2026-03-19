// import { useEffect, useState } from "react";
// import Navbar from "../../components/common/Navbar";
// import { getMyResumesApi } from "../../api/resumeApi";
// import { useNavigate } from "react-router-dom";

// const MyResumes = () => {
//   const [resumes, setResumes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchResumes = async () => {
//       try {
//         setLoading(true);
//         const res = await getMyResumesApi();
//         setResumes(res.data.resumes);
//       } catch (err) {
//         console.error("Failed to fetch resumes:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchResumes();
//   }, []);

//   const handleCreateNew = () => {
//     navigate("/resume/create");
//   };

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="loading-container">
//           <div className="loading-spinner" />
//           <p>Loading your resumes...</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="my-resumes-container">
//         {/* HERO HEADER */}
//         <div className="hero-section">
//           <div className="hero-content">
//             <div className="hero-icon">📄</div>
//             <h1 className="hero-title">Your Resumes</h1>
//             <p className="hero-subtitle">
//               Manage all your professional resumes. Edit, preview, or download anytime.
//             </p>
//           </div>
//           <button className="create-new-btn" onClick={handleCreateNew}>
//             ✨ Create New Resume
//           </button>
//         </div>

//         {/* RESUMES GRID */}
//         <div className="resumes-grid">
//           {resumes.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-icon">📝</div>
//               <h3>No resumes yet</h3>
//               <p>Get started by creating your first professional resume</p>
//               <button className="empty-cta" onClick={handleCreateNew}>
//                 Create Your First Resume
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="grid-header">
//                 <h2 className="resumes-count">{resumes.length} Resume{resumes.length !== 1 ? 's' : ''}</h2>
//                 <button className="create-new-btn small" onClick={handleCreateNew}>
//                   + New Resume
//                 </button>
//               </div>
              
//               <div className="resumes-list">
//                 {resumes.map((resume) => (
//                   <div
//                     key={resume._id}
//                     className="resume-card"
//                     onClick={() => navigate(`/resume/${resume._id}`)}
//                   >
//                     <div className="card-header">
//                       <div className="candidate-info">
//                         <h3 className="candidate-name">{resume.personal?.name || resume.name}</h3>
//                         <div className="role-badge">{resume.role}</div>
//                       </div>
//                       <div className="card-actions">
//                         <button className="preview-btn">
//                           👁️ Preview
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className="card-meta">
//                       {resume.skills?.slice(0, 3).map((skill, i) => (
//                         <span key={i} className="skill-tag">{skill}</span>
//                       ))}
//                       {resume.skills && resume.skills.length > 3 && (
//                         <span className="skill-more">+{resume.skills.length - 3}</span>
//                       )}
//                     </div>
                    
//                     <div className="card-footer">
//                       <span className="created-date">
//                         Created {new Date(resume.createdAt).toLocaleDateString()}
//                       </span>
//                       <div className="download-icon">⬇️</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         .my-resumes-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 3rem 1.5rem;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//           background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
//           min-height: 100vh;
//         }

//         /* HERO SECTION */
//         .hero-section {
//           background: rgba(255, 255, 255, 0.95);
//           backdrop-filter: blur(25px);
//           border-radius: 28px;
//           padding: 4rem 3rem;
//           margin-bottom: 3rem;
//           box-shadow: 
//             0 35px 70px -20px rgba(0, 0, 0, 0.1),
//             0 20px 40px -15px rgba(0, 0, 0, 0.05);
//           border: 1px solid rgba(226, 232, 240, 0.8);
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           flex-wrap: wrap;
//           gap: 2rem;
//           position: relative;
//           overflow: hidden;
//         }

//         .hero-content {
//           flex: 1;
//           min-width: 300px;
//         }

//         .hero-icon {
//           font-size: 5rem;
//           margin-bottom: 1.5rem;
//           display: block;
//         }

//         .hero-title {
//           font-size: clamp(2.25rem, 5vw, 3rem);
//           font-weight: 800;
//           background: linear-gradient(135deg, #6366f1, #8b5cf6);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           margin: 0 0 1rem 0;
//           line-height: 1.1;
//         }

//         .hero-subtitle {
//           font-size: 1.375rem;
//           color: #64748b;
//           margin: 0;
//           max-width: 500px;
//           font-weight: 400;
//           line-height: 1.6;
//         }

//         .create-new-btn {
//           padding: 1.25rem 3rem;
//           border: none;
//           border-radius: 20px;
//           font-weight: 800;
//           font-size: 1.125rem;
//           background: linear-gradient(135deg, #6366f1, #8b5cf6);
//           color: white;
//           box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
//           cursor: pointer;
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//         }

//         .create-new-btn:hover {
//           transform: translateY(-3px);
//           box-shadow: 0 25px 60px rgba(99, 102, 241, 0.5);
//         }

//         .create-new-btn.small {
//           padding: 0.875rem 2rem;
//           font-size: 1rem;
//         }

//         /* RESUMES GRID */
//         .resumes-grid {
//           background: rgba(255, 255, 255, 0.95);
//           backdrop-filter: blur(25px);
//           border-radius: 28px;
//           padding: 3.5rem;
//           border: 1px solid rgba(226, 232, 240, 0.8);
//           box-shadow: 
//             0 30px 60px -15px rgba(0, 0, 0, 0.08),
//             0 15px 30px -10px rgba(0, 0, 0, 0.05);
//         }

//         .grid-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 2.5rem;
//           padding-bottom: 1.5rem;
//           border-bottom: 1px solid rgba(226, 232, 240, 0.6);
//         }

//         .resumes-count {
//           font-size: 2rem;
//           font-weight: 800;
//           background: linear-gradient(135deg, #1e293b, #334155);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           margin: 0;
//         }

//         /* RESUME CARDS */
//         .resumes-list {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
//           gap: 1.5rem;
//         }

//         .resume-card {
//           background: rgba(255, 255, 255, 1);
//           border-radius: 20px;
//           padding: 2rem;
//           border: 1px solid rgba(226, 232, 240, 0.8);
//           cursor: pointer;
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
//           position: relative;
//           overflow: hidden;
//         }

//         .resume-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 3px;
//           background: linear-gradient(90deg, #6366f1, #8b5cf6);
//           transform: scaleX(0);
//           transition: transform 0.3s ease;
//         }

//         .resume-card:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.15);
//           border-color: rgba(99, 102, 241, 0.2);
//         }

//         .resume-card:hover::before {
//           transform: scaleX(1);
//         }

//         .card-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           margin-bottom: 1.5rem;
//         }

//         .candidate-info h3 {
//           font-size: 1.375rem;
//           font-weight: 700;
//           color: #1e293b;
//           margin: 0 0 0.5rem 0;
//           line-height: 1.3;
//         }

//         .role-badge {
//           background: linear-gradient(135deg, #10b981, #059669);
//           color: white;
//           padding: 0.5rem 1.25rem;
//           border-radius: 25px;
//           font-size: 0.875rem;
//           font-weight: 700;
//           display: inline-block;
//           box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
//         }

//         .preview-btn {
//           background: none;
//           border: none;
//           color: #64748b;
//           font-size: 1rem;
//           cursor: pointer;
//           padding: 0.5rem;
//           border-radius: 8px;
//           transition: all 0.2s ease;
//         }

//         .preview-btn:hover {
//           background: rgba(99, 102, 241, 0.1);
//           color: #6366f1;
//           transform: scale(1.1);
//         }

//         .card-meta {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 0.5rem;
//           margin-bottom: 1.5rem;
//         }

//         .skill-tag {
//           background: rgba(99, 102, 241, 0.1);
//           color: #6366f1;
//           padding: 0.375rem 0.875rem;
//           border-radius: 16px;
//           font-size: 0.8rem;
//           font-weight: 600;
//         }

//         .skill-more {
//           background: rgba(107, 114, 128, 0.1);
//           color: #6b7280;
//           padding: 0.375rem 0.875rem;
//           border-radius: 16px;
//           font-size: 0.8rem;
//           font-weight: 600;
//         }

//         .card-footer {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding-top: 1rem;
//           border-top: 1px solid rgba(226, 232, 240, 0.5);
//         }

//         .created-date {
//           color: #94a3b8;
//           font-size: 0.875rem;
//           font-weight: 500;
//         }

//         .download-icon {
//           font-size: 1.25rem;
//           color: #10b981;
//           filter: drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3));
//         }

//         /* EMPTY STATE */
//         .empty-state {
//           text-align: center;
//           padding: 4rem 2rem;
//         }

//         .empty-icon {
//           font-size: 6rem;
//           margin-bottom: 2rem;
//           opacity: 0.5;
//         }

//         .empty-state h3 {
//           font-size: 1.75rem;
//           color: #1e293b;
//           margin-bottom: 1rem;
//           font-weight: 700;
//         }

//         .empty-state p {
//           color: #64748b;
//           font-size: 1.125rem;
//           margin-bottom: 2rem;
//           max-width: 400px;
//           margin-left: auto;
//           margin-right: auto;
//         }

//         .empty-cta {
//           padding: 1rem 2.5rem;
//           border: none;
//           border-radius: 16px;
//           font-weight: 700;
//           font-size: 1.1rem;
//           background: linear-gradient(135deg, #6366f1, #8b5cf6);
//           color: white;
//           box-shadow: 0 12px 35px rgba(99, 102, 241, 0.4);
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .empty-cta:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 20px 45px rgba(99, 102, 241, 0.5);
//         }

//         /* LOADING */
//         .loading-container {
//           min-height: 60vh;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           text-align: center;
//         }

//         .loading-spinner {
//           width: 50px;
//           height: 50px;
//           border: 4px solid #e2e8f0;
//           border-top: 4px solid #6366f1;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//           margin-bottom: 1.5rem;
//         }

//         /* ANIMATIONS */
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         /* RESPONSIVE */
//         @media (max-width: 768px) {
//           .hero-section {
//             flex-direction: column;
//             text-align: center;
//             padding: 3rem 2rem;
//           }
          
//           .resumes-grid {
//             padding: 2.5rem 1.5rem;
//           }
          
//           .resumes-list {
//             grid-template-columns: 1fr;
//             gap: 1.25rem;
//           }
          
//           .grid-header {
//             flex-direction: column;
//             gap: 1.5rem;
//             text-align: center;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default MyResumes;



import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/common/Navbar.jsx";
import { getMyResumesApi } from "../../api/resumeApi";
import { useNavigate } from "react-router-dom";

const MyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        setLoading(true);
        const res = await getMyResumesApi();
        setResumes(res.data.resumes);
      } catch (err) {
        console.error("Failed to fetch resumes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleCreateNew = () => {
    navigate("/resume/create");
  };

  const handleResumeClick = (resumeId) => {
    navigate(`/resume/${resumeId}`);
  };

  const handlePreview = (e, resume) => {
    e.stopPropagation();
    setSelectedResume(resume);
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
              Loading your resumes...
            </motion.p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative mb-16"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
            
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-6">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-4xl shadow-2xl"
                  >
                    📄
                  </motion.div>
                  
                  <div>
                    <h1 className="text-5xl md:text-6xl font-black mb-2">
                      <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Your Resumes
                      </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl">
                      Manage all your professional resumes. Edit, preview, or download anytime.
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreateNew}
                  className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    Create New Resume
                    <span className="text-xl">→</span>
                  </span>
                </motion.button>
              </div>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap gap-6 justify-center md:justify-start">
                <div className="flex items-center gap-3 px-4 py-2 bg-indigo-50 rounded-xl">
                  <span className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-indigo-700">{resumes.length} Total Resumes</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-purple-50 rounded-xl">
                  <span className="w-3 h-3 bg-purple-600 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-purple-700">Last updated {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-2xl" />
            
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              
              {/* Header with View Toggle */}
              <div className="p-8 border-b border-slate-200/50 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                      📋
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Resume Collection</h2>
                      <p className="text-slate-500">Click on any resume to view or edit</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-3 rounded-xl transition-all ${
                        viewMode === "grid" 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span className="text-xl">⊞</span>
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-3 rounded-xl transition-all ${
                        viewMode === "list" 
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span className="text-xl">☰</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Resumes Grid/List */}
              <div className="p-8">
                {resumes.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <motion.div
                      animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="text-8xl mb-8"
                    >
                      📝
                    </motion.div>
                    
                    <h3 className="text-3xl font-bold text-slate-800 mb-4">No resumes yet</h3>
                    <p className="text-xl text-slate-500 mb-8 max-w-md mx-auto">
                      Get started by creating your first professional resume
                    </p>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCreateNew}
                      className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all"
                    >
                      ✨ Create Your First Resume
                    </motion.button>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-8">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-slate-800">{resumes.length}</span>
                        <span className="text-slate-500">resume{resumes.length !== 1 ? 's' : ''}</span>
                      </div>
                      
                      <button
                        onClick={handleCreateNew}
                        className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                      >
                        <span>+</span>
                        New Resume
                      </button>
                    </div>

                    <AnimatePresence>
                      <motion.div
                        key={viewMode}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={viewMode === "grid" 
                          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                          : "space-y-4"
                        }
                      >
                        {resumes.map((resume, index) => (
                          <motion.div
                            key={resume._id}
                            variants={itemVariants}
                            whileHover={{ y: -8 }}
                            onClick={() => handleResumeClick(resume._id)}
                            className="group relative cursor-pointer"
                          >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur" />
                            
                            <div className={`relative bg-white rounded-2xl border border-slate-200/50 hover:border-transparent transition-all overflow-hidden ${
                              viewMode === "list" ? "flex items-center p-4" : "p-6"
                            }`}>
                              {viewMode === "grid" ? (
                                <>
                                  {/* Grid View */}
                                  <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                                        📄
                                      </div>
                                      <div>
                                        <h3 className="font-bold text-slate-800">{resume.personal?.name || resume.name}</h3>
                                        <p className="text-sm text-slate-500">{resume.role}</p>
                                      </div>
                                    </div>
                                    
                                    <button
                                      onClick={(e) => handlePreview(e, resume)}
                                      className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                                    >
                                      👁️
                                    </button>
                                  </div>

                                  {/* Skills */}
                                  <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                      {resume.skills?.slice(0, 3).map((skill, i) => (
                                        <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full border border-indigo-100">
                                          {skill}
                                        </span>
                                      ))}
                                      {resume.skills && resume.skills.length > 3 && (
                                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">
                                          +{resume.skills.length - 3}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Footer */}
                                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                                    <span className="text-xs text-slate-400">
                                      {new Date(resume.createdAt).toLocaleDateString()}
                                    </span>
                                    <div className="flex gap-2">
                                      <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg text-xs">
                                        ATS ✓
                                      </span>
                                      <span className="p-1.5 bg-purple-50 text-purple-600 rounded-lg text-xs">
                                        PDF
                                      </span>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {/* List View */}
                                  <div className="flex-1 flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl shadow-lg">
                                      📄
                                    </div>
                                    
                                    <div className="flex-1">
                                      <h3 className="font-bold text-slate-800">{resume.personal?.name || resume.name}</h3>
                                      <p className="text-sm text-slate-500">{resume.role}</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                      <div className="flex gap-2">
                                        {resume.skills?.slice(0, 3).map((skill, i) => (
                                          <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs rounded-full border border-indigo-100">
                                            {skill}
                                          </span>
                                        ))}
                                      </div>

                                      <span className="text-xs text-slate-400">
                                        {new Date(resume.createdAt).toLocaleDateString()}
                                      </span>

                                      <button
                                        onClick={(e) => handlePreview(e, resume)}
                                        className="p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                                      >
                                        👁️
                                      </button>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Preview Modal */}
          <AnimatePresence>
            {selectedResume && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedResume(null)}
              >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                >
                  <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex justify-between items-center">
                    <h3 className="text-2xl font-bold">Resume Preview</h3>
                    <button
                      onClick={() => setSelectedResume(null)}
                      className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-8">
                    <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                      <h2 className="text-3xl font-bold text-slate-800 mb-2">
                        {selectedResume.personal?.name || selectedResume.name}
                      </h2>
                      <p className="text-xl text-indigo-600 mb-4">{selectedResume.role}</p>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-400 mb-2">CONTACT</h4>
                          <p className="text-slate-700">{selectedResume.personal?.email}</p>
                          <p className="text-slate-700">{selectedResume.personal?.phone}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-400 mb-2">SKILLS</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedResume.skills?.map((skill, i) => (
                              <span key={i} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 pt-6">
                        <h4 className="text-sm font-semibold text-slate-400 mb-2">SUMMARY</h4>
                        <p className="text-slate-700">{selectedResume.summary}</p>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        onClick={() => setSelectedResume(null)}
                        className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => handleResumeClick(selectedResume._id)}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
                      >
                        Edit Resume →
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default MyResumes;