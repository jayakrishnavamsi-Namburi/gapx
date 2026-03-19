import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const RoadmapCard = ({ title, description, progress, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative cursor-pointer h-full"
    >
      {/* Multi-layered glass background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-slate-50/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl" />
      
      {/* Subtle shine overlay */}
      <motion.div 
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.25), transparent 40%)`,
        }}
      />

      {/* Main card container */}
      <div className="relative h-full flex flex-col p-8 lg:p-10 rounded-3xl border border-slate-200/50 shadow-xl group-hover:shadow-2xl group-hover:shadow-slate-300/50 transition-all duration-500 bg-white/70 backdrop-blur-2xl overflow-hidden">
        
        {/* Gradient header bar */}
        <div className="w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-t-3xl mb-8" />

        {/* Content wrapper */}
        <div className="flex-1 space-y-6">
          
          {/* Status indicator */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-bold uppercase tracking-wide ${
              progress === 100 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-md shadow-emerald-100/50' 
                : 'bg-indigo-100/70 text-indigo-800 border border-indigo-200/50 shadow-sm shadow-indigo-100/30'
            }`}
          >
            {progress === 100 ? (
              <>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                <span>{progress}%</span>
              </>
            )}
          </motion.div>

          {/* Title */}
          <motion.h3 
            animate={{ 
              y: isHovered ? -4 : 0,
              scale: isHovered ? 1.02 : 1,
            }}
            className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight line-clamp-2 group-hover:text-indigo-900 transition-colors duration-300"
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 leading-relaxed text-lg line-clamp-3"
          >
            {description}
          </motion.p>
        </div>

        {/* Progress section */}
        <div className="space-y-6 pt-6 border-t border-slate-200/50">
          
          {/* Progress label */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-wide text-slate-500">Progress</span>
            <div className="text-2xl font-black text-slate-900">
              {progress}%
            </div>
          </div>

          {/* Elegant progress bar */}
          <div className="relative">
            <div className="h-3 bg-slate-200/60 rounded-2xl overflow-hidden border border-slate-200/50 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-2xl relative shadow-lg"
              >
                {/* Animated shine effect */}
                <motion.div
                  animate={{ x: ["-100%", "150%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform-gpu"
                />
              </motion.div>
            </div>

            {/* Milestone markers */}
            {[25, 50, 75].map((milestone) => (
              progress >= milestone && (
                <motion.div
                  key={milestone}
                  className="absolute -top-3 w-3 h-3 bg-white border-3 border-indigo-500 rounded-full shadow-lg"
                  style={{ left: `${milestone}%`, transform: "translateX(-50%)" }}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(99,102,241,0.7)",
                      "0 0 0 8px rgba(99,102,241,0)",
                      "0 0 0 0 rgba(99,102,241,0.7)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )
            ))}
          </div>

          {/* Action button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
              progress === 100
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-200/50 hover:shadow-2xl hover:shadow-emerald-300/60"
                : "bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 hover:from-indigo-600 hover:via-purple-600 hover:to-emerald-600 text-white shadow-xl shadow-indigo-200/50 hover:shadow-2xl hover:shadow-purple-300/60"
            }`}
          >
            {progress === 100 ? (
              <>
                <span>🎉 Review Mastery</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </>
            ) : (
              <>
                <span>Continue Learning</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </motion.button>

          {/* Stats footer */}
          <div className="flex items-center justify-between pt-4 text-xs font-bold uppercase tracking-wide text-slate-500">
            <span>Updated Today</span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Floating completion badge */}
      {progress === 100 && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: 1, 
            rotate: 0,
            boxShadow: [
              "0 0 0 0 rgba(16,185,129,0.7)",
              "0 0 0 20px rgba(16,185,129,0)",
              "0 0 0 0 rgba(16,185,129,0.7)"
            ]
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 20,
            delay: 0.5 
          }}
          className="absolute -top-6 -right-6 w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center text-white font-black text-xl shadow-2xl"
        >
          🎖️
        </motion.div>
      )}
    </motion.div>
  );
};

export default RoadmapCard;
