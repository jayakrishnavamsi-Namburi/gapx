import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import { getSingleRoadmapApi, updateProgressApi } from "../../api/roadmapApi";
import WeekCard from "./WeekCard";

const RoadmapView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    loadRoadmap();
  }, [id]);

  const loadRoadmap = async () => {
    try {
      const res = await getSingleRoadmapApi(id);
      setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error("Failed to load roadmap");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (topicId, checked) => {
    await updateProgressApi(id, { topicId, completed: checked });
    setRoadmap((prev) => {
      const completedTopicsList = checked
        ? [...prev.completedTopicsList, topicId]
        : prev.completedTopicsList.filter((t) => t !== topicId);
      const total = prev.progress.totalTopics;
      const done = completedTopicsList.length;
      return {
        ...prev,
        completedTopicsList,
        progress: {
          ...prev.progress,
          completedTopics: done,
          percentComplete: total === 0 ? 0 : Math.round((done / total) * 100),
        },
      };
    });
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  if (loading) return <LoadingSpinner />;
  if (!roadmap) return <NotFound />;

  const percent = roadmap.progress.percentComplete;

  return (
    <div className="min-h-screen bg-[#F0F2F9] text-slate-900 font-sans antialiased overflow-hidden selection:bg-indigo-100">
      <Navbar />

      {/* --- AETHERIC BACKGROUND --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200 rounded-full blur-[120px] opacity-60 animate-aether-1" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-200 rounded-full blur-[120px] opacity-60 animate-aether-2" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-cyan-100 rounded-full blur-[100px] opacity-50 animate-aether-3" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-16 lg:py-24">
        
        {/* --- HEADER: FLOATING GLASS BENTO --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          
          {/* Main Hero Card - Frosted Glass */}
          <section className="lg:col-span-8 group relative overflow-hidden bg-white/40 backdrop-blur-2xl border border-white/20 rounded-[40px] p-10 lg:p-14 shadow-[0_20px_60px_-15px_rgba(100,116,139,0.1)] transition-all duration-300 hover:shadow-[0_30px_70px_-10px_rgba(99,102,241,0.15)] hover:border-white/40">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/30 rounded-full blur-[80px] -mr-32 -mt-32 transition-colors" />
            
            <div className="relative z-10 space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-100 rounded-full text-indigo-600 text-[11px] font-black uppercase tracking-[0.3em] shadow-inner animate-fade-in-up">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                Active Track
              </div>

              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-none animate-slide-up">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-indigo-600 bg-[length:200%_auto] animate-text-gradient">
                  {roadmap.domain}
                </span>
              </h1>

              <div className="flex flex-wrap gap-4">
                <div className="px-6 py-3 bg-white/80 rounded-2xl flex items-center gap-3 shadow-md border border-white">
                  <span className="text-xl">💰</span>
                  <span className="font-extrabold text-slate-800 tracking-tight">{roadmap.salaryRange}</span>
                </div>
                <div className="px-6 py-3 bg-white/80 rounded-2xl flex items-center gap-3 shadow-md border border-white">
                  <span className="text-xl">🏢</span>
                  <span className="font-extrabold text-slate-800 tracking-tight">{roadmap.companyType}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Action Stats Column */}
          <section className="lg:col-span-4 flex flex-col gap-8 h-full">
            <div 
              className="bg-slate-900 rounded-[40px] p-8 flex flex-col justify-between group cursor-pointer shadow-xl transition-all hover:-translate-y-2 hover:shadow-indigo-500/20 active:scale-95 relative overflow-hidden h-full" 
              onClick={() => navigate(`/roadmap/${id}/insights`)}
              onMouseMove={handleMouseMove}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.3) 0%, transparent 70%)`}} />
              
              <div className="relative z-10 flex justify-between items-start">
                <div className="text-5xl group-hover:rotate-12 transition-transform duration-500">📊</div>
                <span className="text-slate-400 text-xs font-black uppercase tracking-widest p-2 bg-slate-800 rounded-xl">Insights</span>
              </div>
              <div className="relative z-10 space-y-1">
                <h3 className="text-2xl font-black text-white leading-tight">ANALYTICS ENGINE</h3>
                <p className="text-slate-400 text-xs font-bold flex items-center gap-1">Open Nexus AI Metrics <span className="group-hover:translate-x-1 transition-transform">→</span></p>
              </div>
            </div>
          </section>
        </div>

        {/* --- PROGRESS: THE NEON TRACKER --- */}
        <div className="relative mb-24 p-6 bg-white/50 backdrop-blur-xl rounded-3xl border border-white shadow-lg">
           <div className="flex justify-between items-center mb-6 text-[11px] font-black uppercase tracking-[0.4em] text-slate-500">
              <span>Initializing</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Deployment Status <span className="text-cyan-600 font-bold">{percent}%</span></span>
              <span>Completion</span>
           </div>
           
           <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner border border-slate-200/50">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 rounded-full transition-all duration-1000 ease-out relative group"
                style={{ width: `${percent}%` }}
              >
                {/* Laser head glow */}
                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-white shadow-[0_0_15px_#fff,0_0_25px_#22d3ee] animate-pulse" />
                {/* Internal Shimmer */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.3)_50%,transparent_75%)] bg-[length:250px_100%] animate-shimmer" />
              </div>
           </div>
           
           {/* Milestone markers */}
           <div className="absolute bottom-4 left-6 right-6 flex justify-between px-1">
              {[25, 50, 75, 100].map((m) => (
                <div key={m} className={`w-1.5 h-1.5 rounded-full ${percent >= m ? 'bg-indigo-500' : 'bg-slate-200'} transition-colors duration-500`} />
              ))}
           </div>
        </div>

        {/* --- WEEKS GRID: STAGGERED REVEAL --- */}
        <div className="space-y-12">
           <h2 className="text-xs font-black uppercase tracking-[1em] text-center text-slate-500 mb-10 opacity-70">Curriculum Architecture</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {roadmap.plan.weeks.map((week, idx) => (
                <div key={idx} className="animate-reveal" style={{ animationDelay: `${idx * 120}ms` }}>
                  {/* Assuming WeekCard will have a dark-on-light glass style now */}
                  <WeekCard 
                    week={week} 
                    weekIndex={idx} 
                    completedTopicsList={roadmap.completedTopicsList} 
                    onToggleTopic={handleToggle} 
                  />
                </div>
              ))}
           </div>
        </div>

        {/* --- CONSOLE FOOTER --- */}
        <div className="mt-20 py-8 border-t border-slate-200/70 text-center">
            <div className="inline-flex gap-8 px-10 py-4 bg-white/60 backdrop-blur rounded-full border border-white shadow-inner text-[11px] font-black uppercase tracking-widest text-slate-500">
                <span>Total Nodes: <span className="text-indigo-600">{roadmap.progress.totalTopics}</span></span>
                <span>Synced: <span className="text-indigo-600">{roadmap.progress.completedTopics}</span></span>
                <span>Est Time: <span className="text-indigo-600">12 Cycles</span></span>
            </div>
        </div>

      </main>

      {/* --- CUSTOM ANIMATIONS --- */}
      <style>{`
        @keyframes aether-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(50px, 30px) scale(1.1); }
        }
        @keyframes aether-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, -50px) scale(1.15); }
        }
        @keyframes aether-3 {
          0%, 100% { transform: translate(0, 0) opacity: 0.5; }
          50% { transform: translate(20px, -20px) opacity: 0.7; }
        }
        .animate-aether-1 { animation: aether-1 15s ease-in-out infinite; }
        .animate-aether-2 { animation: aether-2 18s ease-in-out infinite; }
        .animate-aether-3 { animation: aether-3 12s ease-in-out infinite; }

        @keyframes text-gradient {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .animate-text-gradient { animation: text-gradient 4s linear infinite; }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        @keyframes reveal {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-reveal { opacity: 0; animation: reveal 0.7s ease-out forwards; }

        @keyframes shimmer {
          0% { background-position: -250px 0; }
          100% { background-position: 250px 0; }
        }
        .animate-shimmer { animation: shimmer 2.5s infinite linear; }

        @keyframes spin-reverse {
          to { transform: rotate(-360deg); }
        }
        .animate-spin-reverse { animation: spin-reverse 1s linear infinite; }
      `}</style>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-[#F0F2F9] flex flex-col items-center justify-center space-y-6 z-[200]">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-200 rounded-full blur-[80px] opacity-70 animate-pulse" />
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 border-t-4 border-indigo-600 rounded-full animate-spin" />
      <div className="absolute inset-3 border-b-4 border-fuchsia-500 rounded-full animate-spin-reverse" />
    </div>
    <div className="relative text-[11px] font-black uppercase tracking-[0.5em] text-indigo-600 animate-pulse">Syncing Aether Streams</div>
  </div>
);

const NotFound = () => (
  <div className="min-h-screen bg-[#F0F2F9] flex items-center justify-center p-6 relative overflow-hidden">
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-fuchsia-100 rounded-full blur-[100px] opacity-70" />
    <div className="text-center space-y-8 max-w-md relative z-10 bg-white/40 backdrop-blur-xl p-12 rounded-[40px] border border-white shadow-2xl">
      <h1 className="text-[120px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-fuchsia-600">404</h1>
      <p className="text-slate-600 font-bold tracking-widest uppercase">Target Roadmap Not Found</p>
      <button 
        onClick={() => window.history.back()} 
        className="w-full py-4 bg-indigo-600 rounded-full font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
      >
        ← Return
      </button>
    </div>
  </div>
);

export default RoadmapView;