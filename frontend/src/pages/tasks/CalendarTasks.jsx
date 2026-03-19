// import React, { useEffect, useState } from "react";
// import api from "../../api/api.js";
// import Navbar from "../../components/common/Navbar";
// import Footer from "../../components/common/Footer";

// export default function CalendarTasks() {
//   const [tasks, setTasks] = useState([]);

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [date, setDate] = useState(""); // yyyy-mm-dd
//   const [time, setTime] = useState(""); // hh:mm
//   const [reminderMinutes, setReminderMinutes] = useState(30);

//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");
//   const [error, setError] = useState("");

//   // ✅ Load tasks
//   const loadTasks = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/tasks");
//       setTasks(res.data.tasks || []);
//     } catch (err) {
//       setError(err?.response?.data?.message || "Failed to load tasks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadTasks();
//   }, []);

//   // ✅ Create task
//   const handleAddTask = async (e) => {
//     e.preventDefault();
//     setMsg("");
//     setError("");

//     if (!title || !date || !time) {
//       setError("Title, Date and Time are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       // ✅ Convert date+time to ISO
//       const scheduledAt = new Date(`${date}T${time}:00`).toISOString();

//       const res = await api.post("/tasks", {
//         title,
//         description,
//         scheduledAt,
//         reminderMinutes: Number(reminderMinutes),
//       });

//       setMsg(res.data.message || "Task created ✅");

//       setTitle("");
//       setDescription("");
//       setDate("");
//       setTime("");
//       setReminderMinutes(30);

//       loadTasks();
//     } catch (err) {
//       setError(err?.response?.data?.message || "Task creation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Delete task
//   const handleDelete = async (id) => {
//     try {
//       setLoading(true);
//       await api.delete(`/tasks/${id}`);
//       setMsg("Task deleted ✅");
//       loadTasks();
//     } catch (err) {
//       setError(err?.response?.data?.message || "Delete failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Mark Completed
//   const handleComplete = async (id) => {
//     try {
//       setLoading(true);
//       await api.patch(`/tasks/${id}/complete`);
//       setMsg("Task completed ✅");
//       loadTasks();
//     } catch (err) {
//       setError(err?.response?.data?.message || "Complete failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="task-page">
//         <div className="task-container">
//           <h1 className="task-title">📅 Calendar Tasks</h1>
//           <p className="task-subtitle">
//             Add tasks with date & time and get email reminder automatically ⏰📩
//           </p>

//           {/* ✅ Alerts */}
//           {msg && <p className="alert success">{msg}</p>}
//           {error && <p className="alert error">{error}</p>}

//           {/* ✅ Add Task Form */}
//           <form className="task-form" onSubmit={handleAddTask}>
//             <div className="grid-2">
//               <div>
//                 <label>Task Title</label>
//                 <input
//                   type="text"
//                   placeholder="Ex: React Revision"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   disabled={loading}
//                 />
//               </div>

//               <div>
//                 <label>Reminder (minutes before)</label>
//                 <select
//                   value={reminderMinutes}
//                   onChange={(e) => setReminderMinutes(e.target.value)}
//                   disabled={loading}
//                 >
//                   <option value={5}>5 Minutes</option>
//                   <option value={10}>10 Minutes</option>
//                   <option value={15}>15 Minutes</option>
//                   <option value={30}>30 Minutes</option>
//                   <option value={60}>60 Minutes</option>
//                 </select>
//               </div>
//             </div>

//             <div>
//               <label>Description (optional)</label>
//               <textarea
//                 placeholder="Ex: revise hooks + routing"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 disabled={loading}
//               />
//             </div>

//             <div className="grid-2">
//               <div>
//                 <label>Date</label>
//                 <input
//                   type="date"
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   disabled={loading}
//                 />
//               </div>

//               <div>
//                 <label>Time</label>
//                 <input
//                   type="time"
//                   value={time}
//                   onChange={(e) => setTime(e.target.value)}
//                   disabled={loading}
//                 />
//               </div>
//             </div>

//             <button className="btn-primary" type="submit" disabled={loading}>
//               {loading ? "Adding..." : "➕ Add Task"}
//             </button>
//           </form>

//           {/* ✅ Task List */}
//           <div className="task-list">
//             <h2 className="list-title">✅ Your Scheduled Tasks</h2>

//             {loading && <p style={{ color: "#6b7280" }}>Loading...</p>}

//             {!loading && tasks.length === 0 && (
//               <p style={{ color: "#6b7280" }}>
//                 No tasks found. Add your first schedule ✅
//               </p>
//             )}

//             {tasks.map((task) => (
//               <div
//                 key={task._id}
//                 className={`task-card ${
//                   task.status === "completed" ? "completed" : ""
//                 }`}
//               >
//                 <div className="task-left">
//                   <h3>{task.title}</h3>
//                   <p className="desc">{task.description || "No description"}</p>
//                   <p className="time">
//                     🕒 {new Date(task.scheduledAt).toLocaleString()}
//                   </p>
//                   <p className="rem">
//                     ⏰ Reminder: {task.reminderMinutes} mins before
//                   </p>
//                   <p className="status">
//                     Status:{" "}
//                     <b>{task.status === "completed" ? "✅ Completed" : "⏳ Pending"}</b>
//                   </p>
//                 </div>

//                 <div className="task-actions">
//                   {task.status !== "completed" && (
//                     <button
//                       className="btn-success"
//                       onClick={() => handleComplete(task._id)}
//                       disabled={loading}
//                     >
//                       ✅ Complete
//                     </button>
//                   )}

//                   <button
//                     className="btn-danger"
//                     onClick={() => handleDelete(task._id)}
//                     disabled={loading}
//                   >
//                     🗑 Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <Footer />

//       {/* ✅ CSS inside same file */}
//       <style>{`
//         .task-page{
//           min-height: 90vh;
//           padding: 20px;
//           background: linear-gradient(135deg, #f8fafc, #eef2ff);
//           font-family: Arial, sans-serif;
//         }

//         .task-container{
//           max-width: 900px;
//           margin: 0 auto;
//           background: white;
//           padding: 25px;
//           border-radius: 18px;
//           box-shadow: 0 20px 50px rgba(0,0,0,0.08);
//         }

//         .task-title{
//           margin: 0;
//           font-size: 28px;
//           font-weight: 900;
//           color: #111827;
//         }

//         .task-subtitle{
//           margin-top: 8px;
//           color: #6b7280;
//         }

//         .alert{
//           padding: 10px 12px;
//           border-radius: 10px;
//           margin-top: 12px;
//           font-size: 14px;
//           font-weight: 600;
//         }
//         .success{ background: #dcfce7; color: #166534; }
//         .error{ background: #fee2e2; color: #991b1b; }

//         .task-form{
//           margin-top: 20px;
//           padding: 18px;
//           border: 1px solid #e5e7eb;
//           border-radius: 16px;
//           background: #f9fafb;
//         }

//         label{
//           font-size: 13px;
//           font-weight: 700;
//           color: #374151;
//           display: block;
//           margin-bottom: 6px;
//         }

//         input, textarea, select{
//           width: 100%;
//           padding: 12px;
//           border: 1px solid #e5e7eb;
//           border-radius: 12px;
//           outline: none;
//           font-size: 14px;
//           margin-bottom: 14px;
//         }

//         textarea{
//           min-height: 80px;
//           resize: none;
//         }

//         input:focus, textarea:focus, select:focus{
//           border-color: #4f46e5;
//           box-shadow: 0 0 0 3px rgba(79,70,229,0.15);
//         }

//         .grid-2{
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 14px;
//         }

//         .btn-primary{
//           width: 100%;
//           padding: 12px;
//           border: none;
//           border-radius: 12px;
//           cursor: pointer;
//           font-weight: 800;
//           color: white;
//           background: linear-gradient(135deg, #4f46e5, #7c3aed);
//         }

//         .task-list{
//           margin-top: 25px;
//         }

//         .list-title{
//           margin: 0 0 12px;
//           font-weight: 900;
//           color: #111827;
//         }

//         .task-card{
//           display: flex;
//           justify-content: space-between;
//           gap: 15px;
//           padding: 16px;
//           border: 1px solid #e5e7eb;
//           border-radius: 16px;
//           margin-bottom: 14px;
//           background: white;
//         }

//         .task-card.completed{
//           background: #ecfdf5;
//           border-color: #10b981;
//         }

//         .task-left h3{
//           margin: 0;
//           font-size: 18px;
//           font-weight: 900;
//           color: #111827;
//         }

//         .desc{
//           margin: 6px 0;
//           color: #6b7280;
//         }

//         .time, .rem, .status{
//           margin: 4px 0;
//           font-size: 14px;
//           color: #374151;
//         }

//         .task-actions{
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//           justify-content: center;
//           min-width: 120px;
//         }

//         .btn-success{
//           background: #10b981;
//           border: none;
//           padding: 10px;
//           color: white;
//           font-weight: 800;
//           border-radius: 12px;
//           cursor: pointer;
//         }

//         .btn-danger{
//           background: #ef4444;
//           border: none;
//           padding: 10px;
//           color: white;
//           font-weight: 800;
//           border-radius: 12px;
//           cursor: pointer;
//         }

//         @media(max-width: 768px){
//           .grid-2{ grid-template-columns: 1fr; }
//           .task-card{ flex-direction: column; }
//           .task-actions{ flex-direction: row; }
//         }
//       `}</style>
//     </>
//   );
// }



import React, { useEffect, useState } from "react";
import api from "../../api/api.js";
import Navbar from "../../components/common/Navbar.jsx";
import Footer from "../../components/common/Footer.jsx";
import { motion, AnimatePresence } from "framer-motion";

export default function CalendarTasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(""); 
  const [time, setTime] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("Failed to load agenda.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTasks(); }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title || !date || !time) return;

    try {
      setLoading(true);
      const scheduledAt = new Date(`${date}T${time}:00`).toISOString();
      await api.post("/tasks", { title, description, scheduledAt });
      
      setMsg("Task synchronized successfully ✅");
      setTimeout(() => setMsg(""), 3000);
      
      setTitle(""); setDescription(""); setDate(""); setTime("");
      loadTasks();
    } catch (err) {
      alert("Scheduling failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Permanent wipe this event?")) return;
    await api.delete(`/tasks/${id}`);
    loadTasks();
  };

  const handleComplete = async (id) => {
    await api.patch(`/tasks/${id}/complete`);
    loadTasks();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        {/* HEADER SECTION */}
        <div className="mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 block">Organization</span>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter">Smart Calendar</h1>
            <p className="text-slate-500 text-lg font-medium">Schedule your technical sprints and get real-time dashboard alerts.</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: SCHEDULER FORM */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-sm">➕</span>
                Create Event
              </h2>

              <form onSubmit={handleAddTask} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Event Title</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-50 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-bold text-slate-700"
                    placeholder="e.g., DSA: Graph Revision"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Date</label>
                    <input type="date" className="w-full bg-slate-50 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 font-bold" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Time</label>
                    <input type="time" className="w-full bg-slate-50 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 font-bold" value={time} onChange={(e) => setTime(e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 block">Notes (Optional)</label>
                  <textarea 
                    className="w-full bg-slate-50 p-4 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium min-h-[100px]"
                    placeholder="Key topics to cover..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <button 
                  className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-lg hover:shadow-2xl hover:shadow-slate-200 transition-all active:scale-95 flex items-center justify-center gap-3"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Schedule Event"}
                  <span>→</span>
                </button>

                <AnimatePresence>
                  {msg && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-xs font-black text-emerald-600 uppercase tracking-widest">
                      {msg}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>

          {/* RIGHT: AGENDA LIST */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Upcoming Agenda</h2>
              <div className="h-px flex-1 mx-6 bg-slate-100" />
              <span className="text-[10px] font-black text-slate-300 uppercase">{tasks.length} Active</span>
            </div>

            <div className="space-y-4">
              {tasks.length === 0 ? (
                <div className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                  <p className="text-slate-300 font-black uppercase tracking-widest text-sm">Your schedule is empty</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <motion.div 
                    layout
                    key={task._id} 
                    className={`group p-6 lg:p-8 rounded-[2rem] border transition-all flex items-center justify-between gap-4 ${task.status === 'completed' ? 'bg-slate-50 opacity-50 border-slate-100' : 'bg-white border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-200'}`}
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${task.status === 'completed' ? 'bg-slate-200 text-slate-400' : 'bg-indigo-50 text-indigo-600 shadow-inner'}`}>
                        {task.status === 'completed' ? '✓' : '⚡'}
                      </div>
                      <div>
                        <h3 className={`text-xl font-black text-slate-800 ${task.status === 'completed' && 'line-through text-slate-400'}`}>{task.title}</h3>
                        <div className="flex gap-4 mt-1">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            🕒 {new Date(task.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                            📅 {new Date(task.scheduledAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {task.status !== 'completed' && (
                        <button onClick={() => handleComplete(task._id)} className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                          <span className="font-black text-xs uppercase tracking-tighter">Done</span>
                        </button>
                      )}
                      <button onClick={() => handleDelete(task._id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                        <span className="font-black text-xs uppercase tracking-tighter">Wipe</span>
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />

      <style>{`
        ::-webkit-calendar-picker-indicator {
          filter: invert(0.5);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}