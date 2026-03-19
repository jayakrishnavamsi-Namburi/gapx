import { motion } from "framer-motion";

const WeeklyStreak = ({ streak = 5 }) => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const todayIndex = new Date().getDay(); // Get real-time current day (0-6)

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* Streak Counter Section */}
      <div className="flex items-center gap-3">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatDelay: 1 
          }}
          className="text-4xl"
        >
          🔥
        </motion.div>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">
              {streak}
            </span>
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Days
            </span>
          </div>
          <p className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-[0.1em]">
            Current Streak
          </p>
        </div>
      </div>

      {/* Vertical Divider (Hidden on mobile) */}
      <div className="hidden sm:block w-px h-10 bg-slate-200 dark:bg-slate-700" />

      {/* Real-time Day Tracker */}
      <div className="flex gap-2">
        {days.map((day, index) => {
          const isToday = index === todayIndex;
          const isCompleted = index <= todayIndex && index > todayIndex - streak;

          return (
            <div key={index} className="flex flex-col items-center gap-1.5">
              <span className={`text-[10px] font-bold ${isToday ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                {day}
              </span>
              <div 
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
                  ${isCompleted 
                    ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg shadow-orange-200 dark:shadow-none' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-700'
                  }
                  ${isToday && !isCompleted ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-[#0b0f19]' : ''}
                `}
              >
                {isCompleted ? "✓" : ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyStreak;