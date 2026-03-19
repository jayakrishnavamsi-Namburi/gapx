// // ProjectInsightsView.jsx
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Navbar from "../../components/common/Navbar";
// import { getSingleRoadmapApi } from "../../api/roadmapApi";
// import ProjectInsights from "../../components/roadmap/ProjectInsights";

// const ProjectInsightsView = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [roadmap, setRoadmap] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadRoadmap = async () => {
//       try {
//         const res = await getSingleRoadmapApi(id);
//         setRoadmap(res.data.roadmap);
//       } catch (err) {
//         console.error("Failed to load roadmap for insights");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) loadRoadmap();
//   }, [id]);

//   const handleBackToRoadmap = () => {
//     navigate(`/roadmap/${id}`);
//   };

//   if (loading) return <LoadingSpinner />;
//   if (!roadmap) return <NotFoundState />;

//   return (
//     <>
//       <Navbar />
//       <div className="page-container">
//         <div className="header">
//           <button className="back-btn" onClick={handleBackToRoadmap}>
//             ← Back
//           </button>
//           <h1>{roadmap.domain} - Project Insights</h1>
//         </div>

//         <ProjectInsights
//           domain={roadmap.domain}
//           salaryRange={roadmap.salaryRange}
//           companyType={roadmap.companyType}
//         />
//       </div>

//       <style >{`
//         .page-container {
//           max-width: 1000px;
//           margin: 0 auto;
//           padding: 2rem 1rem;
//         }

//         .header {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           margin-bottom: 2rem;
//         }

//         .back-btn {
//           background: #6366f1;
//           color: white;
//           border: none;
//           padding: 0.75rem 1.5rem;
//           border-radius: 8px;
//           font-weight: 500;
//           cursor: pointer;
//         }

//         .back-btn:hover {
//           background: #5856eb;
//         }

//         h1 {
//           margin: 0;
//           font-size: 1.75rem;
//           font-weight: 600;
//           color: #1e293b;
//         }

//         @media (max-width: 768px) {
//           .header {
//             flex-direction: column;
//             align-items: flex-start;
//           }
          
//           .back-btn {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// const LoadingSpinner = () => (
//   <div style={{ 
//     minHeight: '60vh', 
//     display: 'flex', 
//     flexDirection: 'column', 
//     justifyContent: 'center', 
//     alignItems: 'center',
//     padding: '2rem'
//   }}>
//     <div style={{
//       width: 50,
//       height: 50,
//       border: '4px solid #e2e8f0',
//       borderTop: '4px solid #6366f1',
//       borderRadius: '50%',
//       animation: 'spin 1s linear infinite'
//     }} />
//     <p style={{ marginTop: '1rem', color: '#64748b' }}>Loading...</p>
//   </div>
// );

// const NotFoundState = () => (
//   <div style={{ 
//     minHeight: '60vh', 
//     display: 'flex', 
//     flexDirection: 'column', 
//     justifyContent: 'center', 
//     alignItems: 'center',
//     textAlign: 'center',
//     color: '#64748b'
//   }}>
//     <h2>Roadmap not found</h2>
//   </div>
// );

// export default ProjectInsightsView;




// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import Navbar from "../../components/common/Navbar";
// import { getSingleRoadmapApi } from "../../api/roadmapApi";
// import ProjectInsights from "../../components/roadmap/ProjectInsights";

// const ProjectInsightsView = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [roadmap, setRoadmap] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadRoadmap = async () => {
//       try {
//         const res = await getSingleRoadmapApi(id);
//         setRoadmap(res.data.roadmap);
//       } catch (err) {
//         console.error("Failed to load roadmap for insights");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) loadRoadmap();
//   }, [id]);

//   const handleBackToRoadmap = () => {
//     navigate(`/roadmap/${id}`);
//   };

//   if (loading) return <LoadingSpinner />;
//   if (!roadmap) return <NotFoundState />;

//   return (
//     <div className="min-h-screen bg-[#F0F2F9] text-slate-900 font-sans antialiased overflow-hidden selection:bg-indigo-100">
//       <Navbar />

//       {/* --- AETHERIC BACKGROUND DECO --- */}
//       <div className="fixed inset-0 pointer-events-none z-0">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[120px] opacity-60 animate-pulse" />
//         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-200 rounded-full blur-[120px] opacity-60 animate-pulse delay-700" />
//       </div>

//       <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        
//         {/* --- GLASS HEADER SECTION --- */}
//         <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-white/40 backdrop-blur-2xl rounded-[32px] border border-white/40 shadow-xl">
//           <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
//             <button 
//               onClick={handleBackToRoadmap}
//               className="group flex items-center justify-center w-12 h-12 bg-white text-indigo-600 rounded-2xl shadow-md border border-slate-100 transition-all hover:bg-indigo-600 hover:text-white active:scale-90"
//               title="Return to Roadmap"
//             >
//               <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
//             </button>
            
//             <div>
//               <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2">
//                 <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
//                 Intelligence Report
//               </div>
//               <h1 className="text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 leading-tight">
//                 {roadmap.domain} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Insights.</span>
//               </h1>
//             </div>
//           </div>

//           <div className="flex gap-3">
//              <div className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg">
//                 Active Track
//              </div>
//           </div>
//         </header>

//         {/* --- INSIGHTS COMPONENT CONTAINER --- */}
//         <div className="animate-reveal transition-all duration-700">
//           <ProjectInsights
//             domain={roadmap.domain}
//             salaryRange={roadmap.salaryRange}
//             companyType={roadmap.companyType}
//           />
//         </div>

//       </main>

//       <style>{`
//         @keyframes reveal {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-reveal {
//           animation: reveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// const LoadingSpinner = () => (
//   <div className="fixed inset-0 bg-[#F0F2F9] flex flex-col items-center justify-center space-y-6 z-[200]">
//     <div className="relative w-20 h-20">
//       <div className="absolute inset-0 border-t-4 border-indigo-600 rounded-full animate-spin" />
//       <div className="absolute inset-3 border-b-4 border-fuchsia-500 rounded-full animate-spin-reverse" />
//     </div>
//     <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 animate-pulse">Scanning Insights...</p>
//   </div>
// );

// const NotFoundState = () => (
//   <div className="min-h-screen bg-[#F0F2F9] flex items-center justify-center p-6">
//     <div className="text-center space-y-8 max-w-md relative z-10 bg-white/40 backdrop-blur-xl p-12 rounded-[40px] border border-white shadow-2xl">
//       <h1 className="text-[100px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-fuchsia-600">404</h1>
//       <p className="text-slate-600 font-bold tracking-widest uppercase">Target Stream Lost</p>
//       <button 
//         onClick={() => window.history.back()} 
//         className="w-full py-4 bg-indigo-600 rounded-full font-black uppercase tracking-widest text-white shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
//       >
//         ← Go Back
//       </button>
//     </div>
//   </div>
// );

// export default ProjectInsightsView;


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import { getSingleRoadmapApi } from "../../api/roadmapApi";
import ProjectInsights from "../../components/roadmap/ProjectInsights";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const ProjectInsightsView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRoadmap = async () => {
      try {
        setLoading(true); // Ensure loading is true when start
        const res = await getSingleRoadmapApi(id);
        setRoadmap(res.data.roadmap);
      } catch (err) {
        console.error("Failed to load roadmap for insights");
      } finally {
        // Adding a slight delay makes the transition feel smoother
        setTimeout(() => setLoading(false), 800);
      }
    };

    if (id) loadRoadmap();
  }, [id]);

  const handleBackToRoadmap = () => {
    navigate(`/roadmap/${id}`);
  };

  // ✅ LOADER COMPONENT
  if (loading) return <LoadingSpinner />;
  
  if (!roadmap) return <NotFoundState />;

  return (
    <div className="min-h-screen bg-[#F0F2F9] text-slate-900 font-sans antialiased overflow-hidden selection:bg-indigo-100">
      <Navbar />

      {/* --- AETHERIC BACKGROUND DECO --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[120px] opacity-60 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-200 rounded-full blur-[120px] opacity-60 animate-pulse delay-700" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        
        {/* --- GLASS HEADER SECTION --- */}
        <header className="mb-12 flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-white/40 backdrop-blur-2xl rounded-[32px] border border-white/40 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <button 
              onClick={handleBackToRoadmap}
              className="group flex items-center justify-center w-12 h-12 bg-white text-indigo-600 rounded-2xl shadow-md border border-slate-100 transition-all hover:bg-indigo-600 hover:text-white active:scale-90"
              title="Return to Roadmap"
            >
              <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
            </button>
            
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Intelligence Report
              </div>
              <h1 className="text-3xl lg:text-4xl font-black tracking-tighter text-slate-900 leading-tight">
                {roadmap.domain} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Insights.</span>
              </h1>
            </div>
          </div>

          <div className="flex gap-3">
             <div className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg">
               Active Track
             </div>
          </div>
        </header>

        <div className="animate-reveal transition-all duration-700">
          <ProjectInsights
            domain={roadmap.domain}
            salaryRange={roadmap.salaryRange}
            companyType={roadmap.companyType}
          />
        </div>
      </main>

      {/* --- ALL CUSTOM ANIMATIONS --- */}
      <style>{`
        @keyframes reveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-reveal {
          animation: reveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

const NotFoundState = () => (
  <div className="min-h-screen bg-[#F0F2F9] flex items-center justify-center p-6">
    <div className="text-center space-y-8 max-w-md relative z-10 bg-white/40 backdrop-blur-xl p-12 rounded-[40px] border border-white shadow-2xl">
      <h1 className="text-[100px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-fuchsia-600">404</h1>
      <p className="text-slate-600 font-bold tracking-widest uppercase">Target Stream Lost</p>
      <button 
        onClick={() => window.history.back()} 
        className="w-full py-4 bg-indigo-600 rounded-full font-black uppercase tracking-widest text-white shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
      >
        ← Go Back
      </button>
    </div>
  </div>
);

export default ProjectInsightsView;