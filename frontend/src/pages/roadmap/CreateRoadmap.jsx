import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateRoadmapApi } from "../../api/roadmapApi";
import Navbar from "../../components/common/Navbar";

const CreateRoadmap = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    salaryRange: 15,
    companyType: "product",
    domain: "",
    requiredCourses: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadStatus, setLoadStatus] = useState("Initializing AI...");
  const [error, setError] = useState("");

  const handleSalaryChange = (e) => {
    setForm({ ...form, salaryRange: parseInt(e.target.value) });
    setError("");
  };

  const isFormValid = form.salaryRange > 0 && form.companyType && form.domain && form.requiredCourses.trim();

  // Loading Logic: Simulates different stages for better UX
  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadProgress((prev) => {
          if (prev < 30) {
            setLoadStatus("Analyzing market data...");
            return prev + 1;
          }
          if (prev < 60) {
            setLoadStatus("Curating 12-week curriculum...");
            return prev + 1;
          }
          if (prev < 90) {
            setLoadStatus("Finalizing learning resources...");
            return prev + 0.5;
          }
          return prev;
        });
      }, 100);
    } else {
      setLoadProgress(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleGenerate = async () => {
    if (!isFormValid) {
      setError("Please fill all fields including required courses");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const res = await generateRoadmapApi(form);
      
      // Artificial delay to let the user see the "Completion" state
      setLoadProgress(100);
      setLoadStatus("Deployment Ready!");
      
      setTimeout(() => {
        const roadmapId = res.data.roadmap._id;
        navigate(`/roadmap/${roadmapId}`);
      }, 800);
      
    } catch (err) {
      setError("❌ Failed to generate roadmap. Try again.");
      setLoading(false);
    }
  };

  const companyOptions = [
    { value: "product", label: "Product", icon: "🏢" },
    { value: "mnc", label: "MNCs", icon: "🏛️" },
    { value: "startup", label: "Startups", icon: "🚀" },
    { value: "faang", label: "FAANG", icon: "⭐" },
  ];

  const domainOptions = [
    "Full Stack Development", "Frontend (React)", "Backend (Node.js)", 
    "Data Science & ML", "DevOps & Cloud", "Mobile (React Native)", 
    "Cybersecurity", "AI/ML Engineering"
  ];

  return (
    <div className="min-h-screen bg-[#fafbff] font-sans antialiased text-slate-950 relative overflow-hidden">
      <Navbar />
      
      {/* --- LOADING OVERLAY --- */}
      {loading && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 backdrop-blur-2xl px-6">
          <div className="w-full max-w-md space-y-8 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-black tracking-tighter text-slate-900">Generating Your Future</h2>
              <p className="text-indigo-600 font-bold animate-pulse">{loadStatus}</p>
            </div>
            
            <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                style={{ width: `${loadProgress}%` }}
              >
                {/* Shine effect on bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
            
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
              Processing Securely via GapX AI Engine
            </p>
          </div>
        </div>
      )}

      {/* Cinematic Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-[120px] opacity-40 animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full blur-[120px] opacity-40 animate-pulse-slow delay-1000"></div>

      <div className="max-w-5xl mx-auto px-6 py-16 lg:py-24 relative z-10">
        <header className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-white shadow-inner border border-slate-100">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600 px-4 py-2 bg-indigo-50 rounded-xl">Alpha Build</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter text-slate-950 leading-tight">
            Deploy your <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-purple-600 to-emerald-500">Career Stack</span>
          </h1>
        </header>

        <div className="bg-white/70 backdrop-blur-2xl border-2 border-white/50 rounded-[48px] p-10 lg:p-16 shadow-2xl shadow-indigo-100/30 transition-all hover:shadow-3xl hover:border-white hover:bg-white relative">
          
          {error && (
            <div className="mb-10 p-5 bg-red-100 border-l-4 border-red-600 text-red-700 rounded-xl text-sm font-bold flex items-center gap-3 animate-shake">
              <span>⚠️ Status Error:</span> {error}
            </div>
          )}

          <div className="space-y-16">
            {/* SALARY */}
            <section className="space-y-6">
              <div className="flex justify-between items-end gap-4">
                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Target LPA Deployment</label>
                <span className="text-3xl font-black tracking-tighter text-indigo-600">{form.salaryRange} <span className="text-xl text-indigo-400 font-bold">LPA</span></span>
              </div>
              <div className="relative group p-1 bg-slate-100 rounded-full border border-slate-200/50 shadow-inner">
                <input
                  type="range" min="0" max="50" step="1"
                  value={form.salaryRange}
                  onChange={handleSalaryChange}
                  className="w-full h-3 bg-transparent rounded-full appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </section>

            {/* COMPANY TYPE */}
            <section className="space-y-6">
              <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Target Organization Type</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {companyOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setForm({ ...form, companyType: opt.value })}
                    className={`p-8 rounded-[32px] border-2 transition-all duration-300 flex flex-col items-center gap-3 font-bold ${
                      form.companyType === opt.value 
                      ? "border-indigo-600 bg-white text-indigo-700 shadow-2xl shadow-indigo-100/50 scale-105" 
                      : "border-slate-100 hover:border-indigo-100 bg-slate-50/50 text-slate-500 hover:bg-white"
                    }`}
                  >
                    <span className="text-4xl">{opt.icon}</span>
                    <span className="text-sm tracking-tight">{opt.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* TARGET DOMAIN */}
            <section className="space-y-6">
              <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Deployment Domain</label>
              <div className="flex flex-wrap gap-3">
                {domainOptions.map((domain) => (
                  <button
                    key={domain}
                    onClick={() => setForm({ ...form, domain })}
                    className={`px-7 py-4 rounded-2xl text-[13px] font-bold transition-all border-2 duration-300 active:scale-95 ${
                      form.domain === domain 
                      ? "bg-slate-950 text-white border-slate-950 shadow-2xl" 
                      : "bg-white text-slate-600 border-slate-100 hover:border-slate-200"
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>
            </section>

            {/* REQUIRED COURSES */}
            <section className="space-y-6 relative group">
              <div className="flex justify-between items-end gap-4">
                <label className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">Core Knowledge Focus</label>
              </div>
              <input
                type="text"
                placeholder="Declare languages, frameworks, concepts"
                value={form.requiredCourses}
                onChange={(e) => setForm({ ...form, requiredCourses: e.target.value })}
                className="w-full p-6 bg-white border-2 border-slate-100 rounded-[28px] text-slate-950 font-bold text-lg focus:outline-none focus:border-indigo-600 focus:bg-white transition-all shadow-sm"
              />
            </section>

            {/* GENERATE BUTTON */}
            <button
              onClick={handleGenerate}
              disabled={loading || !isFormValid}
              className={`w-full py-7 rounded-[28px] font-black text-2xl transition-all duration-300 flex items-center justify-center gap-4 active:scale-[0.98] ${
                isFormValid && !loading
                ? "bg-slate-950 text-white hover:bg-indigo-600 shadow-3xl shadow-slate-300 hover:shadow-indigo-200"
                : "bg-slate-100 text-slate-400 cursor-not-allowed border-2 border-slate-200/50"
              }`}
            >
              <span className="text-sm font-bold opacity-70">DEPLOYMENT START</span>
              ✨ Commit My Roadmap
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.1; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .shadow-3xl {
          box-shadow: 0 35px 70px -15px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default CreateRoadmap;