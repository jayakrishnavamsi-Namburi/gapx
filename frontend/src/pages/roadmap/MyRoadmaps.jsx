// import { useCallback, useEffect, useState } from "react";
// import { getMyRoadmapsApi } from "../../api/roadmapApi";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../../components/common/Navbar";
// import RoadmapCard from "../../components/roadmap/RoadmapCard";
// import "./MyRoadmaps.css"; // Import CSS

// const MyRoadmaps = () => {
//   const [roadmaps, setRoadmaps] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchRoadmaps = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await getMyRoadmapsApi();
//       setRoadmaps(res.data.roadmaps || []);
//     } catch (err) {
//       console.error("Failed to fetch roadmaps:", err);
//       setError("Failed to load roadmaps. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchRoadmaps();
//   }, [fetchRoadmaps]);

//   const handleRoadmapClick = useCallback((roadmapId) => {
//     localStorage.setItem("activeRoadmapId", roadmapId);
//     navigate(`/roadmap/${roadmapId}`);
//   }, [navigate]);

//   if (loading) {
//     return (
//       <>
//         <Navbar />
//         <div className="my-roadmaps-container">
//           <h2 className="my-roadmaps-header">My Roadmaps</h2>
//           <div className="my-roadmaps-loading">
//             🔄 Loading roadmaps...
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="my-roadmaps-container">
//         <h2 className="my-roadmaps-header">My Roadmaps</h2>

//         {error && (
//           <div className="my-roadmaps-error">
//             {error}
//             <button onClick={fetchRoadmaps}>Retry</button>
//           </div>
//         )}

//         {!error && roadmaps.length === 0 ? (
//           <div className="my-roadmaps-empty">
//             No roadmaps found.{' '}
//             <button onClick={() => navigate('/roadmap/create')}>
//               Create your first roadmap
//             </button>{' '}
//             🚀
//           </div>
//         ) : (
//           <div className="my-roadmaps-grid">
//             {roadmaps.map((r) => (
//               <RoadmapCard
//                 key={r._id}
//                 title={r.plan?.title || r.domain}
//                 description={
//                   r.plan?.summary ||
//                   `${r.salaryRange} | ${r.companyType}`
//                 }
//                 progress={r.progress?.percentComplete || 0}
//                 onClick={() => handleRoadmapClick(r._id)}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default MyRoadmaps;




import { useCallback, useEffect, useState } from "react";
import { getMyRoadmapsApi } from "../../api/roadmapApi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar.jsx";
import RoadmapCard from "../../components/roadmap/RoadmapCard.jsx";

const MyRoadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchRoadmaps = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getMyRoadmapsApi();
      setRoadmaps(res.data.roadmaps || []);
    } catch (err) {
      console.error("Failed to fetch roadmaps:", err);
      setError("System failure: Unable to sync roadmap streams.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoadmaps();
  }, [fetchRoadmaps]);

  const handleRoadmapClick = useCallback((roadmapId) => {
    localStorage.setItem("activeRoadmapId", roadmapId);
    navigate(`/roadmap/${roadmapId}`);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F0F2F9] flex flex-col items-center justify-center space-y-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-t-4 border-indigo-600 rounded-full animate-spin" />
          <div className="absolute inset-3 border-b-4 border-fuchsia-500 rounded-full animate-spin-reverse" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-600 animate-pulse">Syncing Tracks...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbff] font-sans antialiased text-slate-900 selection:bg-indigo-100">
      <Navbar />

      {/* --- AETHER BACKGROUND DECO --- */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[30%] h-[30%] bg-indigo-100 rounded-full blur-[120px] opacity-60 animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-fuchsia-100 rounded-full blur-[120px] opacity-60 animate-pulse delay-700" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Deployment History
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-900 leading-none">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">Tracks.</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-md font-medium">
              Manage your generated career roadmaps and track your deployment progress across different domains.
            </p>
          </div>

          <button 
            onClick={() => navigate('/roadmap/create')}
            className="group relative px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-indigo-600 hover:-translate-y-1 active:scale-95 shadow-xl shadow-slate-200"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-xl group-hover:rotate-90 transition-transform">＋</span> New Roadmap
            </span>
          </button>
        </header>

        {/* ERROR STATE */}
        {error && (
          <div className="bg-red-50 border-2 border-red-100 p-8 rounded-[32px] text-center space-y-4 animate-in fade-in zoom-in">
            <p className="text-red-600 font-bold tracking-tight">{error}</p>
            <button onClick={fetchRoadmaps} className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-red-700 transition-colors">
              Retry Sync
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!error && roadmaps.length === 0 ? (
          <section className="bg-white/40 backdrop-blur-xl border-2 border-dashed border-slate-200 rounded-[48px] py-32 text-center space-y-8">
            <div className="text-6xl animate-bounce">🔭</div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">No tracks initialized</h3>
              <p className="text-slate-500 font-medium">Your career deployment queue is currently empty.</p>
            </div>
            <button 
              onClick={() => navigate('/roadmap/create')}
              className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
            >
              Initialize First Track →
            </button>
          </section>
        ) : (
          /* ROADMAP GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roadmaps.map((r, idx) => (
              <div 
                key={r._id} 
                className="animate-reveal" 
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <RoadmapCard
                  title={r.plan?.title || r.domain}
                  description={
                    r.plan?.summary ||
                    `${r.salaryRange} • ${r.companyType}`
                  }
                  progress={r.progress?.percentComplete || 0}
                  onClick={() => handleRoadmapClick(r._id)}
                  // NOTE: Pass extra props if your RoadmapCard supports them for styling
                  className="bg-white/60 backdrop-blur-md border border-white hover:border-indigo-200 shadow-xl"
                />
              </div>
            ))}
          </div>
        )}
      </main>

      <style>{`
        @keyframes reveal {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-reveal {
          opacity: 0;
          animation: reveal 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes spin-reverse {
          to { transform: rotate(-360deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default MyRoadmaps;