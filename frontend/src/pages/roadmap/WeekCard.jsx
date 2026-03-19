
// import TopicCheckbox from "../../components/roadmap/TopicCheckbox";

// const WeekCard = ({
//   week,
//   weekIndex,
//   completedTopicsList,
//   onToggleTopic,
// }) => {
//   return (
//     <div className="week-card">
//       {/* WEEK HEADER */}
//       <div className="week-header">
//         <div className="week-number-badge">
//           Week {week.weekNumber}
//         </div>
//         <h3 className="week-focus">{week.focus}</h3>
//       </div>

//       {/* TOPICS */}
//       <div className="topics-section">
//         <div className="section-header">
//           <span className="section-icon">📚</span>
//           <h4>Topics</h4>
//         </div>
//         <div className="topics-list">
//           {week.topics.map((topic, topicIndex) => {
//             const topicId = `${weekIndex}-${topicIndex}`;
//             const completed = completedTopicsList.includes(topicId);

//             return (
//               <TopicCheckbox
//                 key={topicId}
//                 topic={topic}
//                 completed={completed}
//                 onToggle={(checked) =>
//                   onToggleTopic(topicId, checked)
//                 }
//               />
//             );
//           })}
//         </div>
//       </div>

//       {/* YOUTUBE RESOURCES */}
//       {week.resources?.youtube?.some((yt) =>
//         isValidYouTubeUrl(yt.url)
//       ) && (
//         <div className="resources-section youtube-section">
//           <div className="section-header">
//             <img 
//               src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5LjY0IDUuMzYzYTEuMDkxIDEuMDkxIDAgMCAxIDAgMS43MjJsLTMuMjM0IDMuMjM0aDQuNDg4YS4xMDkxLjEwOTEgMCAwIDEgLjA5MS4wOTF2MS40NDZhLjEwOS4xMDkgMCAwIDEtLjA5MS4wOTFoLTQuNDg4bDMuMjM0IDMuMjM0YS4xMDkuMTA5IDAgMCAxIC4wMjcuMDI3LjEwOS4xMDkgMCAwIDEtLjAyNy4wMjdsLTEuMDkxLTEuMDkxYS4xMDkuMTA5IDAgMCAxLS4wMjctLjAyN2gtNy4yNzNhLjEwOS4xMDkgMCAwIDEtLjA5MS0uMDkxdjctNDZhLjEwOS4xMDkgMCAwIDEgLjA5MS0uMDkxaDcuMjczYS4xMDkuMTA5IDAgMCAxIC4wMjcuMDI3bDEuMDkxLTEuMDkxYS4xMDkuMTA5IDAgMCAxLS4wMjctLjAyN3oiIGZpbGw9IiNGRjAwMDAiLz4KPC9zdmc+Cg==" 
//               alt="YouTube" 
//               className="section-icon"
//             />
//             <h4>YouTube Videos</h4>
//           </div>
//           <div className="resources-grid">
//             {week.resources.youtube.map((yt, i) =>
//               isValidYouTubeUrl(yt.url) ? (
//                 <a
//                   key={i}
//                   href={yt.url}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="resource-card youtube-card"
//                 >
//                   <div className="resource-icon">
//                     <img 
//                       src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5LjY0IDUuMzYzYTEuMDkxIDEuMDkxIDAgMCAxIDAgMS43MjJsLTMuMjM0IDMuMjM0aDQuNDg4YS4xMDkxLjEwOTEgMCAwIDEgLjA5MS4wOTF2MS40NDZhLjEwOS4xMDkgMCAwIDEtLjA5MS4wOTFoLTQuNDg4bDMuMjM0IDMuMjM0YS4xMDkuMTA5IDAgMCAxIC4wMjcuMDI3LjEwOS4xMDkgMCAwIDEtLjAyNy4wMjdsLTEuMDkxLTEuMDkxYS4xMDkuMTA5IDAgMCAxLS4wMjctLjAyN2gtNy4yNzNhLjEwOS4xMDkgMCAwIDEtLjA5MS0uMDkxdjctNDZhLjEwOS4xMDkgMCAwIDEgLjA5MS0uMDkxaDcuMjczYS4xMDkuMTA5IDAgMCAxIC4wMjcuMDI3bDEuMDkxLTEuMDkxYS4xMDkuMTA5IDAgMCAxLS4wMjctLjAyN3oiIGZpbGw9IiNGRjAwMDAiLz4KPC9zdmc+Cg==" 
//                       alt="▶️" 
//                     />
//                   </div>
//                   <span>{yt.title || "Watch Video"}</span>
//                   <div className="arrow-icon">↗</div>
//                 </a>
//               ) : null
//             )}
//           </div>
//         </div>
//       )}

//       {/* WEBSITE RESOURCES */}
//       {week.resources?.websites?.some((site) =>
//         isValidWebsiteUrl(site.url)
//       ) && (
//         <div className="resources-section website-section">
//           <div className="section-header">
//             <img 
//               src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDRIMFY0YTJDMC0xLjEuOTEtMiAyIDJoMThhMiAyIDAgMCAwIDIgMnYxMmEyIDIgMCAwIDAgLTItMkgxOVY0WiIgZmlsbD0iIzNCMkY5NCIvPgo8cGF0aCBkPSJNMCAxNmgxOGEyIDIgMCAwIDAgMiAydjZhMiAyIDAgMCAwLTIgMlYxNkgweiIgZmlsbD0iIzM3QjlGQyIvPgo8cGF0aCBkPSJNMCAyMGgxOGEyIDIgMCAwIDAgMi0ydi02YTIgMiAwIDAgMC0yIDJIMHoiIGZpbGw9IiM0Q0FGNEQiLz4KPC9zdmc+Cg==" 
//               alt="Website" 
//               className="section-icon"
//             />
//             <h4>Learning Resources</h4>
//           </div>
//           <div className="resources-grid">
//             {week.resources.websites.map((site, i) =>
//               isValidWebsiteUrl(site.url) ? (
//                 <a
//                   key={i}
//                   href={site.url}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="resource-card website-card"
//                 >
//                   <div className="resource-icon">
//                     <img 
//                       src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE5IDRIMFY0YTJDMC0xLjEuOTEtMiAyIDJoMThhMiAyIDAgMCAwIDIgMnYxMmEyIDIgMCAwIDAgLTItMkgxOVY0WiIgZmlsbD0iIzNCMkY5NCIvPgo8cGF0aCBkPSJNMCAxNmgxOGEyIDIgMCAwIDAgMiAydjZhMiAyIDAgMCAwLTIgMlYxNkgweiIgZmlsbD0iIzM3QjlGQyIvPgo8cGF0aCBkPSJNMCAyMGgxOGEyIDIgMCAwIDAgMi0ydi02YTIgMiAwIDAgMC0yIDJIMHoiIGZpbGw9IiM0Q0FGNEQiLz4KPC9zdmc+Cg==" 
//                       alt="🌐" 
//                     />
//                   </div>
//                   <span>{site.name || "Open Resource"}</span>
//                   <div className="arrow-icon">↗</div>
//                 </a>
//               ) : null
//             )}
//           </div>
//         </div>
//       )}
      
//       <style jsx>{`
//         .week-card {
//           background: linear-gradient(145deg, #fef7ff 0%, #f0f9ff 100%);
//           border-radius: 24px;
//           padding: 2rem;
//           border: 1px solid rgba(236, 72, 153, 0.1);
//           box-shadow: 
//             0 10px 25px -5px rgba(236, 72, 153, 0.15),
//             0 4px 10px -2px rgba(236, 72, 153, 0.1),
//             inset 0 1px 0 rgba(255,255,255,0.9);
//           backdrop-filter: blur(20px);
//           transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//           position: relative;
//           overflow: hidden;
//         }

//         .week-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 
//             0 20px 40px -10px rgba(236, 72, 153, 0.25),
//             0 8px 20px -4px rgba(236, 72, 153, 0.15),
//             inset 0 1px 0 rgba(255,255,255,0.95);
//         }

//         .week-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.4), transparent);
//         }

//         /* WEEK HEADER - PINK/TEAL THEME */
//         .week-header {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           margin-bottom: 1.5rem;
//         }

//         .week-number-badge {
//           background: linear-gradient(135deg, #ec4899, #06b6d4);
//           color: white;
//           padding: 0.5rem 1rem;
//           border-radius: 20px;
//           font-size: 0.875rem;
//           font-weight: 700;
//           box-shadow: 0 4px 12px rgba(236, 72, 153, 0.4);
//           min-width: 80px;
//           text-align: center;
//         }

//         .week-focus {
//           font-size: 1.5rem;
//           font-weight: 700;
//           background: linear-gradient(135deg, #ec4899, #06b6d4);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           margin: 0;
//           flex: 1;
//         }

//         /* SECTION HEADER */
//         .section-header {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           margin-bottom: 1rem;
//         }

//         .section-icon {
//           width: 24px;
//           height: 24px;
//           flex-shrink: 0;
//         }

//         .section-header h4 {
//           margin: 0;
//           font-size: 1.125rem;
//           font-weight: 700;
//           background: linear-gradient(135deg, #ec4899, #06b6d4);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }

//         /* TOPICS SECTION - Custom Checkbox Override */
//         .topics-section {
//           margin-bottom: 1.5rem;
//         }

//         .topics-list {
//           display: flex;
//           flex-direction: column;
//           gap: 0.75rem;
//         }

//         /* CUSTOM CHECKBOX STYLES - Override TopicCheckbox */
//         .topics-list input[type="checkbox"] {
//           /* Hide default checkbox */
//           appearance: none;
//           width: 22px;
//           height: 22px;
//           border: 2px solid rgba(236, 72, 153, 0.3);
//           border-radius: 6px;
//           background: linear-gradient(145deg, #fef7ff, #f0f9ff);
//           position: relative;
//           cursor: pointer;
//           transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
//           flex-shrink: 0;
//           margin-right: 12px;
//         }

//         .topics-list input[type="checkbox"]:checked {
//           background: linear-gradient(135deg, #ec4899, #06b6d4);
//           border-color: transparent;
//           box-shadow: 0 0 0 4px rgba(236, 72, 153, 0.2);
//           animation: checkPulse 0.3s ease;
//         }

//         .topics-list input[type="checkbox"]:checked::after {
//           content: '✓';
//           position: absolute;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%) scale(0.8);
//           color: white;
//           font-size: 14px;
//           font-weight: 900;
//         }

//         .topics-list input[type="checkbox"]:hover {
//           border-color: rgba(236, 72, 153, 0.5);
//           transform: scale(1.05);
//         }

//         .topics-list input[type="checkbox"]:focus {
//           outline: none;
//           box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.3);
//         }

//         .topics-list label {
//           display: flex;
//           align-items: center;
//           padding: 1rem 1.25rem;
//           background: rgba(255,255,255,0.8);
//           border-radius: 16px;
//           border: 1px solid rgba(236, 72, 153, 0.1);
//           transition: all 0.2s ease;
//           cursor: pointer;
//           font-weight: 500;
//           color: #1e293b;
//         }

//         .topics-list label:hover {
//           background: white;
//           border-color: rgba(236, 72, 153, 0.3);
//           box-shadow: 0 4px 12px rgba(236, 72, 153, 0.15);
//           transform: translateX(4px);
//         }

//         .topics-list input[type="checkbox"]:checked + label {
//           background: linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(6, 182, 212, 0.1));
//           border-color: rgba(236, 72, 153, 0.3);
//         }

//         /* RESOURCES SECTION */
//         .resources-section {
//           margin-top: 1.5rem;
//           padding-top: 1.5rem;
//           border-top: 1px solid rgba(236, 72, 153, 0.15);
//         }

//         .youtube-section {
//           border-image: linear-gradient(90deg, #ff0000, #ff6b35, #ff0000) 1;
//         }

//         .website-section {
//           border-image: linear-gradient(90deg, #3b82f6, #1e40af, #3b82f6) 1;
//         }

//         .resources-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//           gap: 1rem;
//         }

//         /* RESOURCE CARDS - Updated Colors */
//         .resource-card {
//           display: flex;
//           align-items: center;
//           gap: 0.75rem;
//           padding: 1rem 1.25rem;
//           background: rgba(255,255,255,0.9);
//           border-radius: 16px;
//           text-decoration: none;
//           color: #1e293b;
//           font-weight: 500;
//           border: 1px solid rgba(236, 72, 153, 0.15);
//           transition: all 0.2s ease;
//           position: relative;
//           overflow: hidden;
//         }

//         .resource-card::before {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.2), transparent);
//           transition: left 0.5s;
//         }

//         .resource-card:hover {
//           background: white;
//           transform: translateX(4px);
//           box-shadow: 0 8px 25px rgba(236, 72, 153, 0.2);
//           border-color: rgba(236, 72, 153, 0.4);
//         }

//         .youtube-card:hover {
//           border-color: rgba(255,0,0,0.4);
//           box-shadow: 0 8px 25px rgba(255,0,0,0.2);
//         }

//         .website-card:hover {
//           border-color: rgba(59,130,246,0.4);
//           box-shadow: 0 8px 25px rgba(59,130,246,0.2);
//         }

//         /* ANIMATIONS */
//         @keyframes checkPulse {
//           0% { transform: scale(0.9); }
//           50% { transform: scale(1.1); }
//           100% { transform: scale(1); }
//         }

//         /* RESPONSIVE */
//         @media (max-width: 768px) {
//           .week-card {
//             padding: 1.5rem;
//           }
          
//           .week-header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 0.75rem;
//           }
          
//           .resources-grid {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// // URL VALIDATORS (unchanged)
// const isValidWebsiteUrl = (url) =>
//   typeof url === "string" && url.startsWith("http");

// const isValidYouTubeUrl = (url) =>
//   typeof url === "string" &&
//   (url.includes("youtube.com/watch?v=") || url.includes("youtu.be/"));

// export default WeekCard;




import { useState } from "react";
import TopicCheckbox from "../../components/roadmap/TopicCheckbox.jsx";

const WeekCard = ({
  week,
  weekIndex,
  completedTopicsList,
  onToggleTopic,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredResource, setHoveredResource] = useState(null);

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Animated background glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
      
      {/* Main card */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border border-emerald-100/50 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl">
        
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i}s`,
              }}
            />
          ))}
        </div>

        {/* Card content */}
        <div className="relative p-6 md:p-8">
          {/* Week Header - Modern glass morphism */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            {/* Animated week badge */}
            <div className="relative group/badge">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-xl blur-md opacity-75 group-hover/badge:opacity-100 transition-opacity" />
              <div className="relative px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl text-white font-bold text-sm inline-flex items-center gap-2">
                <svg className="w-4 h-4 animate-spin-slow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                Week {week.weekNumber}
              </div>
            </div>

            {/* Week focus with animated gradient */}
            <h3 className="text-2xl md:text-3xl font-bold flex-1">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent bg-300% animate-gradient">
                {week.focus}
              </span>
            </h3>

            {/* Expand/collapse indicator */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Animated content sections */}
          <div className={`space-y-8 transition-all duration-500 ${isExpanded ? 'opacity-100' : 'md:opacity-100 opacity-100'}`}>
            
            {/* Topics Section - Modern design */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400 rounded-lg blur animate-pulse" />
                  <div className="relative w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-700">Learning Topics</h4>
                <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                  {week.topics.length} items
                </span>
              </div>

              <div className="grid gap-3">
                {week.topics.map((topic, topicIndex) => {
                  const topicId = `${weekIndex}-${topicIndex}`;
                  const completed = completedTopicsList.includes(topicId);

                  return (
                    <div
                      key={topicId}
                      className="transform transition-all duration-300 hover:translate-x-2"
                    >
                      <TopicCheckbox
                        topic={topic}
                        completed={completed}
                        onToggle={(checked) =>
                          onToggleTopic(topicId, checked)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Resources Sections - Modern card grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* YouTube Resources */}
              {week.resources?.youtube?.some((yt) => isValidYouTubeUrl(yt.url)) && (
                <div className="relative group/youtube">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl opacity-0 group-hover/youtube:opacity-100 transition-opacity duration-300 blur" />
                  
                  <div className="relative bg-red-50/80 backdrop-blur rounded-xl p-5 border border-red-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                      </div>
                      <h5 className="font-semibold text-gray-700">Video Resources</h5>
                    </div>

                    <div className="space-y-2">
                      {week.resources.youtube.map((yt, i) =>
                        isValidYouTubeUrl(yt.url) ? (
                          <a
                            key={i}
                            href={yt.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-red-50 transition-all duration-300 group/link"
                            onMouseEnter={() => setHoveredResource(`yt-${i}`)}
                            onMouseLeave={() => setHoveredResource(null)}
                          >
                            <div className="relative">
                              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-red-600 text-sm">▶</span>
                              </div>
                              {hoveredResource === `yt-${i}` && (
                                <div className="absolute -inset-1 bg-red-400 rounded-full animate-ping opacity-20" />
                              )}
                            </div>
                            <span className="flex-1 text-sm text-gray-600 truncate">
                              {yt.title || "Watch Video"}
                            </span>
                            <svg className="w-4 h-4 text-gray-400 group-hover/link:translate-x-1 group-hover/link:text-red-500 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        ) : null
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Website Resources */}
              {week.resources?.websites?.some((site) => isValidWebsiteUrl(site.url)) && (
                <div className="relative group/website">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-0 group-hover/website:opacity-100 transition-opacity duration-300 blur" />
                  
                  <div className="relative bg-blue-50/80 backdrop-blur rounded-xl p-5 border border-blue-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                      </div>
                      <h5 className="font-semibold text-gray-700">Learning Resources</h5>
                    </div>

                    <div className="space-y-2">
                      {week.resources.websites.map((site, i) =>
                        isValidWebsiteUrl(site.url) ? (
                          <a
                            key={i}
                            href={site.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-blue-50 transition-all duration-300 group/link"
                            onMouseEnter={() => setHoveredResource(`web-${i}`)}
                            onMouseLeave={() => setHoveredResource(null)}
                          >
                            <div className="relative">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-sm">🌐</span>
                              </div>
                              {hoveredResource === `web-${i}` && (
                                <div className="absolute -inset-1 bg-blue-400 rounded-full animate-ping opacity-20" />
                              )}
                            </div>
                            <span className="flex-1 text-sm text-gray-600 truncate">
                              {site.name || "Open Resource"}
                            </span>
                            <svg className="w-4 h-4 text-gray-400 group-hover/link:translate-x-1 group-hover/link:text-blue-500 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        ) : null
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Progress indicator for the week */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8">
            <div className="relative">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-emerald-100"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - week.topics.filter((_, i) => completedTopicsList.includes(`${weekIndex}-${i}`)).length / week.topics.length)}`}
                  className="text-emerald-500 transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-emerald-600">
                  {Math.round((week.topics.filter((_, i) => completedTopicsList.includes(`${weekIndex}-${i}`)).length / week.topics.length) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-5px); }
          75% { transform: translateY(5px) translateX(5px); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 300% 300%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .bg-300\\% {
          background-size: 300%;
        }
      `}</style>
    </div>
  );
};

// URL VALIDATORS (unchanged)
const isValidWebsiteUrl = (url) =>
  typeof url === "string" && url.startsWith("http");

const isValidYouTubeUrl = (url) =>
  typeof url === "string" &&
  (url.includes("youtube.com/watch?v=") || url.includes("youtu.be/"));

export default WeekCard;