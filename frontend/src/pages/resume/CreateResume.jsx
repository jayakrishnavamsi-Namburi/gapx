// import { useState } from "react";
// import Navbar from "../../components/common/Navbar";
// import { generateResumeApi } from "../../api/resumeApi";
// import { useNavigate } from "react-router-dom";
// import ResumeForm from "../../components/resume/ResumeForm";

// const CreateResume = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   // FULL FORM STATE matching Mongoose schema
//   const [form, setForm] = useState({
//     title: "My Resume",
//     personal: {
//       name: "",
//       email: "",
//       phone: "",
//       location: "",
//       linkedin: "",
//       github: "",
//       portfolio: "",
//     },
//     summary: "",
//     skills: "",
//     role: "",
//   });

//   // EXPERIENCE ARRAY
//   const [experiences, setExperiences] = useState([]);

//   // PROJECTS ARRAY
//   const [projects, setProjects] = useState([]);

//   // EDUCATION ARRAY
//   const [education, setEducation] = useState([]);

//   // CERTIFICATIONS ARRAY
//   const [certifications, setCertifications] = useState("");

//   const handleFormChange = (field, value) => {
//     setForm(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handlePersonalChange = (field, value) => {
//     setForm(prev => ({
//       ...prev,
//       personal: {
//         ...prev.personal,
//         [field]: value
//       }
//     }));
//   };

//   const handleGenerate = async () => {
//     try {
//       setLoading(true);

//       const payload = {
//         user: "64f8b1234567890abcdef123", // Replace with actual user ID from auth
//         ...form,
//         skills: form.skills ? form.skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
//         experience: experiences.filter(exp => exp.company?.trim()),
//         projects: projects
//           .filter(p => p.title?.trim())
//           .map((p) => ({
//             ...p,
//             techStack: p.techStack ? p.techStack.split(",").map((t) => t.trim()).filter(Boolean) : []
//           })),
//         education: education.filter(edu => edu.degree?.trim()),
//         certifications: certifications ? certifications.split(",").map((c) => c.trim()).filter(Boolean) : [],
//       };

//       console.log("✅ Payload:", JSON.stringify(payload, null, 2));
      
//       const res = await generateResumeApi(payload);
//       navigate(`/resume/${res.data.resume._id}`);
//     } catch (err) {
//       console.error("❌ Full error:", err.response?.data || err);
//       alert("Resume generation failed: " + (err.response?.data?.message || err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   // PROGRESS CALCULATION
//   const getProgressSteps = () => {
//     const steps = [
//       { name: "Personal Info", active: form.personal.name && form.personal.email },
//       { name: "Experience", active: experiences.length > 0 },
//       { name: "Education", active: education.length > 0 },
//       { name: "Projects", active: projects.length > 0 }
//     ];
//     return steps;
//   };

//   const isFormValid = 
//     form.personal.name?.trim() &&
//     form.personal.email?.trim() &&
//     form.role?.trim() &&
//     form.skills?.trim() &&
//     experiences.length > 0;

//   return (
//     <>
//       <Navbar />
//       <div className="create-resume-container">
//         {/* HERO HEADER */}
//         <div className="hero-section">
//           <div className="hero-content">
//             <div className="hero-icon">📄</div>
//             <h1 className="hero-title">Build Professional Resume</h1>
//             <p className="hero-subtitle">
//               Complete each step → Add experiences → Education → Projects → Generate ATS-optimized resume
//             </p>
//           </div>
//         </div>

//         {/* RESUME BUILDER CARD */}
//         <div className="resume-builder-card">
//           <div className="card-header">
//             <h2>Complete Resume Builder</h2>
//             <div className="progress-indicator">
//               {getProgressSteps().map((step, index) => (
//                 <div 
//                   key={`step-${index}`} 
//                   className={`step ${step.active ? 'active' : ''}`}
//                 >
//                   {index + 1}. {step.name}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="content-wrapper">
//             <ResumeForm
//               form={form}
//               handleFormChange={handleFormChange}
//               handlePersonalChange={handlePersonalChange}
//               experiences={experiences}
//               setExperiences={setExperiences}
//               projects={projects}
//               setProjects={setProjects}
//               education={education}
//               setEducation={setEducation}
//               certifications={certifications}
//               setCertifications={setCertifications}
//             />

//             {/* GENERATE BUTTON */}
//             <div className="generate-section">
//               <button
//                 className={`generate-resume-btn ${loading ? 'loading' : ''} ${isFormValid ? '' : 'disabled'}`}
//                 onClick={handleGenerate}
//                 disabled={loading || !isFormValid}
//               >
//                 {loading ? (
//                   <>
//                     <div className="spinner"></div>
//                     Generating your professional resume...
//                   </>
//                 ) : (
//                   <>
//                     ✨ Generate ATS-Optimized Resume
//                   </>
//                 )}
//               </button>

//               <div className="generate-footer">
//                 <p>✅ AI-powered resume with perfect formatting & keywords</p>
//                 <div className="features-list">
//                   <span>📄 PDF Export</span>
//                   <span>🔍 ATS Friendly</span>
//                   <span>⚡ Instant Download</span>
//                   <span>🎨 Professional Design</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         .create-resume-container {
//           max-width: 1100px;
//           margin: 0 auto;
//           padding: 3rem 1.5rem;
//           font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//           background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
//           min-height: 100vh;
//         }

//         .hero-section {
//           text-align: center;
//           padding: 4rem 3rem;
//           background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
//           border-radius: 28px;
//           margin-bottom: 3rem;
//           box-shadow: 
//             0 35px 70px -20px rgba(0, 0, 0, 0.1),
//             0 20px 40px -15px rgba(0, 0, 0, 0.05);
//           border: 1px solid rgba(226, 232, 240, 0.8);
//           position: relative;
//           overflow: hidden;
//         }

//         .hero-section::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.3), transparent);
//         }

//         .hero-content {
//           position: relative;
//           z-index: 1;
//         }

//         .hero-icon {
//           font-size: 5rem;
//           margin-bottom: 1.5rem;
//           background: linear-gradient(135deg, #6366f1, #8b5cf6);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           filter: drop-shadow(0 15px 30px rgba(99, 102, 241, 0.2));
//         }

//         .hero-title {
//           font-size: clamp(2.5rem, 6vw, 3.5rem);
//           font-weight: 800;
//           background: linear-gradient(135deg, #1e293b, #334155);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           margin: 0 0 1.25rem 0;
//           line-height: 1.1;
//         }

//         .hero-subtitle {
//           font-size: 1.375rem;
//           color: #64748b;
//           max-width: 700px;
//           margin: 0 auto;
//           font-weight: 400;
//           line-height: 1.7;
//         }

//         .resume-builder-card {
//           background: rgba(255, 255, 255, 0.97);
//           backdrop-filter: blur(30px);
//           border-radius: 32px;
//           padding: 3.5rem;
//           border: 1px solid rgba(226, 232, 240, 0.9);
//           box-shadow: 
//             0 40px 80px -25px rgba(0, 0, 0, 0.08),
//             0 25px 50px -15px rgba(0, 0, 0, 0.05),
//             inset 0 1px 0 rgba(255, 255, 255, 0.95);
//           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//           position: relative;
//           overflow: hidden;
//         }

//         .resume-builder-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent);
//         }

//         .card-header {
//           text-align: center;
//           margin-bottom: 3.5rem;
//           padding-bottom: 2rem;
//           border-bottom: 1px solid rgba(226, 232, 240, 0.6);
//         }

//         .card-header h2 {
//           font-size: 2.5rem;
//           font-weight: 800;
//           background: linear-gradient(135deg, #6366f1, #8b5cf6);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           margin: 0 0 1.5rem 0;
//         }

//         .progress-indicator {
//           display: flex;
//           justify-content: center;
//           gap: 1rem;
//           margin-top: 1rem;
//           flex-wrap: wrap;
//         }

//         .step {
//           font-size: 0.9rem;
//           font-weight: 600;
//           color: #94a3b8;
//           padding: 0.5rem 1.25rem;
//           border-radius: 20px;
//           background: rgba(148, 163, 184, 0.1);
//           border: 1px solid rgba(148, 163, 184, 0.3);
//           transition: all 0.3s ease;
//           white-space: nowrap;
//         }

//         .step.active {
//           color: #6366f1;
//           background: rgba(99, 102, 241, 0.15);
//           box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
//           border-color: rgba(99, 102, 241, 0.4);
//           transform: scale(1.05);
//         }

//         .content-wrapper {
//           display: flex;
//           flex-direction: column;
//           gap: 3rem;
//         }

//         .generate-section {
//           background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
//           border-radius: 24px;
//           padding: 2.5rem;
//           border: 1px solid rgba(226, 232, 240, 0.8);
//           margin-top: 2rem;
//         }

//         .generate-resume-btn {
//           width: 100%;
//           padding: 1.5rem 3rem;
//           border: none;
//           border-radius: 20px;
//           font-weight: 800;
//           font-size: 1.25rem;
//           cursor: pointer;
//           background: linear-gradient(135deg, #6366f1, #8b5cf6);
//           color: white;
//           box-shadow: 0 15px 40px rgba(99, 102, 241, 0.4);
//           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 1rem;
//           position: relative;
//           overflow: hidden;
//           text-transform: uppercase;
//           letter-spacing: 0.5px;
//         }

//         .generate-resume-btn:hover:not(:disabled) {
//           transform: translateY(-4px);
//           box-shadow: 0 25px 60px rgba(99, 102, 241, 0.5);
//         }

//         .generate-resume-btn:disabled {
//           opacity: 0.7;
//           cursor: not-allowed;
//           transform: none;
//         }

//         .generate-resume-btn.disabled:not(:disabled) {
//           background: linear-gradient(135deg, #cbd5e1, #e2e8f0);
//           color: #64748b;
//           cursor: not-allowed;
//         }

//         .spinner {
//           width: 28px;
//           height: 28px;
//           border: 3px solid rgba(255, 255, 255, 0.3);
//           border-top: 3px solid white;
//           border-radius: 50%;
//           animation: spin 1s linear infinite;
//         }

//         .generate-footer {
//           text-align: center;
//           margin-top: 2rem;
//           padding-top: 2rem;
//           border-top: 1px solid rgba(226, 232, 240, 0.6);
//         }

//         .generate-footer p {
//           color: #1e293b;
//           margin: 0 0 1.5rem 0;
//           font-size: 1.125rem;
//           font-weight: 600;
//         }

//         .features-list {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 1.5rem;
//           justify-content: center;
//         }

//         .features-list span {
//           background: rgba(99, 102, 241, 0.1);
//           color: #6366f1;
//           padding: 0.75rem 1.5rem;
//           border-radius: 25px;
//           font-size: 0.9rem;
//           font-weight: 600;
//           border: 1px solid rgba(99, 102, 241, 0.2);
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         @media (max-width: 1024px) {
//           .content-wrapper { gap: 2.5rem; }
//         }

//         @media (max-width: 768px) {
//           .create-resume-container { padding: 2rem 1rem; }
//           .resume-builder-card { padding: 2.5rem 2rem; }
//           .hero-section { padding: 3rem 2rem; }
//           .generate-section { padding: 2rem; }
//           .features-list { 
//             flex-direction: column; 
//             align-items: center; 
//           }
//           .progress-indicator { 
//             gap: 0.75rem; 
//             flex-direction: column;
//             align-items: center;
//           }
//           .step { font-size: 0.85rem; }
//         }

//         @media (max-width: 480px) {
//           .resume-builder-card { padding: 2rem 1.5rem; }
//           .progress-indicator { gap: 0.5rem; }
//         }
//       `}</style>
//     </>
//   );
// };

// export default CreateResume;






import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/common/Navbar.jsx";
import { generateResumeApi } from "../../api/resumeApi";
import { useNavigate } from "react-router-dom";
import ResumeForm from "../../components/resume/ResumeForm.jsx";

const CreateResume = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("personal");

  // FULL FORM STATE matching Mongoose schema
  const [form, setForm] = useState({
    title: "My Resume",
    personal: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
    },
    summary: "",
    skills: "",
    role: "",
  });

  // EXPERIENCE ARRAY
  const [experiences, setExperiences] = useState([]);

  // PROJECTS ARRAY
  const [projects, setProjects] = useState([]);

  // EDUCATION ARRAY
  const [education, setEducation] = useState([]);

  // CERTIFICATIONS ARRAY
  const [certifications, setCertifications] = useState("");

  const handleFormChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePersonalChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value
      }
    }));
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);

      // const payload = {
      //   user: "64f8b1234567890abcdef123", // Replace with actual user ID from auth
      //   ...form,
      //   skills: form.skills ? form.skills.split(",").map((s) => s.trim()).filter(Boolean) : [],
      //   experience: experiences.filter(exp => exp.company?.trim()),
      //   projects: projects
      //     .filter(p => p.title?.trim())
      //     .map((p) => ({
      //       ...p,
      //       techStack: p.techStack ? p.techStack.split(",").map((t) => t.trim()).filter(Boolean) : []
      //     })),
      //   education: education.filter(edu => edu.degree?.trim()),
      //   certifications: certifications ? certifications.split(",").map((c) => c.trim()).filter(Boolean) : [],
      // };
      const payload = {
  ...form,
  skills: form.skills
    ? form.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [],
  experience: experiences.filter(exp => exp.company?.trim()),
  projects: projects
    .filter(p => p.title?.trim())
    .map((p) => ({
      ...p,
      techStack: p.techStack
        ? p.techStack.split(",").map((t) => t.trim()).filter(Boolean)
        : []
    })),
  education: education.filter(edu => edu.degree?.trim()),
  certifications: certifications
    ? certifications.split(",").map((c) => c.trim()).filter(Boolean)
    : [],
};

      const res = await generateResumeApi(payload);
      navigate(`/resume/view/${res.data.resume._id}`);
    } catch (err) {
      console.error("❌ Full error:", err.response?.data || err);
      alert("Resume generation failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // PROGRESS CALCULATION
  const sections = [
    { id: "personal", name: "Personal Info", icon: "👤", completed: form.personal.name && form.personal.email },
    { id: "professional", name: "Professional", icon: "💼", completed: form.role && form.skills },
    { id: "experience", name: "Experience", icon: "📊", completed: experiences.length > 0 },
    { id: "education", name: "Education", icon: "🎓", completed: education.length > 0 },
    { id: "projects", name: "Projects", icon: "🚀", completed: projects.length > 0 },
    { id: "certifications", name: "Certifications", icon: "📜", completed: certifications.length > 0 },
  ];

  const completedCount = sections.filter(s => s.completed).length;
  const totalSections = sections.length;
  const progressPercent = (completedCount / totalSections) * 100;

  const isFormValid = 
    form.personal.name?.trim() &&
    form.personal.email?.trim() &&
    form.role?.trim() &&
    form.skills?.trim() &&
    experiences.length > 0;

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
            className="text-center mb-16"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block text-7xl mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-3xl shadow-2xl"
            >
              📄
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Build Your Professional Resume
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Create an ATS-optimized resume that stands out. Follow the steps below to build your perfect resume.
            </p>

            {/* Progress Stats */}
            <div className="mt-8 flex justify-center gap-8">
              <div className="bg-white/80 backdrop-blur rounded-2xl px-8 py-4 shadow-xl border border-slate-200/50">
                <p className="text-3xl font-bold text-indigo-600">{completedCount}/{totalSections}</p>
                <p className="text-sm text-slate-500">Sections Completed</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl px-8 py-4 shadow-xl border border-slate-200/50">
                <p className="text-3xl font-bold text-purple-600">{progressPercent.toFixed(0)}%</p>
                <p className="text-sm text-slate-500">Overall Progress</p>
              </div>
            </div>
          </motion.div>

          {/* Main Builder Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 blur-2xl" />
            
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              
              {/* Header with Progress */}
              <div className="p-8 border-b border-slate-200/50 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-xl">
                      📝
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">Resume Builder</h2>
                      <p className="text-slate-500">Complete all sections to generate your resume</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full md:w-64">
                    <div className="flex justify-between text-sm text-slate-500 mb-2">
                      <span>Progress</span>
                      <span className="font-bold text-indigo-600">{progressPercent.toFixed(0)}%</span>
                    </div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Section Tabs */}
                <div className="flex flex-wrap gap-3 mt-8">
                  {sections.map((section) => (
                    <motion.button
                      key={section.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveSection(section.id)}
                      className={`relative px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                          : section.completed
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {section.icon} {section.name}
                        {section.completed && (
                          <span className="text-emerald-500">✓</span>
                        )}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Form Content with Animation */}
              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ResumeForm
                      form={form}
                      handleFormChange={handleFormChange}
                      handlePersonalChange={handlePersonalChange}
                      experiences={experiences}
                      setExperiences={setExperiences}
                      projects={projects}
                      setProjects={setProjects}
                      education={education}
                      setEducation={setEducation}
                      certifications={certifications}
                      setCertifications={setCertifications}
                      activeSection={activeSection}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Generate Section */}
              <div className="p-8 bg-gradient-to-br from-slate-50 to-white border-t border-slate-200/50">
                
                {/* Requirements Checklist */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-slate-500 mb-4">✓ Requirements Checklist</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "Name & Email", completed: form.personal.name && form.personal.email },
                      { label: "Role & Skills", completed: form.role && form.skills },
                      { label: "Experience", completed: experiences.length > 0 },
                      { label: "Education", completed: education.length > 0 },
                    ].map((req, idx) => (
                      <div key={idx} className={`p-3 rounded-xl border ${
                        req.completed ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className={`text-sm font-medium ${
                          req.completed ? 'text-emerald-700' : 'text-slate-500'
                        }`}>
                          {req.completed ? '✓' : '○'} {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <motion.button
                  whileHover={isFormValid ? { scale: 1.02 } : {}}
                  whileTap={isFormValid ? { scale: 0.98 } : {}}
                  onClick={handleGenerate}
                  disabled={loading || !isFormValid}
                  className={`w-full py-6 rounded-2xl font-bold text-xl transition-all relative overflow-hidden ${
                    isFormValid && !loading
                      ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-2xl hover:shadow-3xl'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {/* Shimmer effect */}
                  {isFormValid && !loading && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
                  )}
                  
                  <span className="relative flex items-center justify-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Generating Your Professional Resume...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl">✨</span>
                        Generate ATS-Optimized Resume
                        <span className="text-2xl">→</span>
                      </>
                    )}
                  </span>
                </motion.button>

                {/* Features Grid */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: "📄", label: "PDF Export", desc: "Download instantly" },
                    { icon: "🔍", label: "ATS Friendly", desc: "Pass any scanner" },
                    { icon: "⚡", label: "Quick Generation", desc: "Under 30 seconds" },
                    { icon: "🎨", label: "Professional Design", desc: "Modern templates" },
                  ].map((feature, idx) => (
                    <div key={idx} className="text-center p-4 bg-white/50 rounded-xl border border-slate-100">
                      <span className="text-3xl mb-2 block">{feature.icon}</span>
                      <p className="font-semibold text-slate-800 text-sm">{feature.label}</p>
                      <p className="text-xs text-slate-400">{feature.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Trust Badges */}
                <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-slate-400">
                  <span>🔒 SSL Secure</span>
                  <span>⚡ 1000+ Resumes Generated</span>
                  <span>⭐ 4.9/5 Rating</span>
                  <span>🏆 Top Choice 2024</span>
                </div>
              </div>
            </div>
          </motion.div>
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
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};

export default CreateResume;