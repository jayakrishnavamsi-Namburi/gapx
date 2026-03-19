
// import './ProjectInput.css';  // Add this import
// const ProjectInput = ({ projects, setProjects }) => {
//   const addProject = () => {
//     setProjects([
//       ...projects,
//       { title: "", techStack: "", description: "" },
//     ]);
//   };

//   const updateProject = (index, field, value) => {
//     const updated = [...projects];
//     updated[index][field] = value;
//     setProjects(updated);
//   };

//   const removeProject = (index) => {
//     setProjects(projects.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="project-container">
//       {projects.map((project, i) => (
//         <div key={i} className="project-card">
//           <div className="project-header">
//             <h4 className="project-title">Project {i + 1}</h4>
//             <button 
//               className="remove-btn"
//               onClick={() => removeProject(i)}
//               type="button"
//             >
//               × Remove
//             </button>
//           </div>

//           <div className="project-form">
//             <div className="input-group">
//               <label className="input-label">Project Title</label>
//               <input
//                 placeholder="e.g. E-Commerce Platform, Chat Application, Portfolio Dashboard"
//                 value={project.title}
//                 onChange={(e) => updateProject(i, "title", e.target.value)}
//                 className="form-input"
//               />
//             </div>

//             <div className="input-group">
//               <label className="input-label">Tech Stack (comma separated)</label>
//               <input
//                 placeholder="React, Node.js, MongoDB, TailwindCSS, AWS"
//                 value={project.techStack}
//                 onChange={(e) => updateProject(i, "techStack", e.target.value)}
//                 className="form-input"
//               />
//             </div>

//             <div className="input-group full-width">
//               <label className="input-label">Project Description</label>
//               <textarea
//                 placeholder="Describe your project achievements, challenges solved, and impact:
// • Built responsive UI with React hooks and Context API
// • Implemented real-time chat using Socket.io and Node.js
// • Deployed on Vercel with 99.9% uptime
// • Reduced page load time by 60% through code splitting
// • GitHub: github.com/username/project-name"
//                 value={project.description}
//                 onChange={(e) => updateProject(i, "description", e.target.value)}
//                 className="form-textarea"
//                 rows="5"
//               />
//             </div>

//             <div className="project-links">
//               <div className="input-group">
//                 <label className="input-label-small">Live Demo (optional)</label>
//                 <input
//                   placeholder="https://project-demo.vercel.app"
//                   className="form-input small"
//                 />
//               </div>
//               <div className="input-group">
//                 <label className="input-label-small">GitHub Repo (optional)</label>
//                 <input
//                   placeholder="github.com/username/project-name"
//                   className="form-input small"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       <button className="add-project-btn" onClick={addProject} type="button">
//         🚀 + Add Another Project
//       </button>
//     </div>
//   );
// };

// export default ProjectInput;




const ProjectInput = ({ projects, setProjects }) => {
  const addProject = () => {
    setProjects([
      ...projects,
      {
        title: "",
        techStack: "",
        description: "",
        live: "",
        github: "",
      },
    ]);
  };

  const updateProject = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const removeProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Projects</h1>
          <p className="text-gray-400 mt-2">
            Showcase your best work
          </p>
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-600 rounded-xl">
            <p className="text-gray-400 mb-4">
              No projects added yet
            </p>
            <button
              onClick={addProject}
              className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg transition"
            >
              + Add Project
            </button>
          </div>
        )}

        {/* Project Cards */}
        {projects.map((project, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-gray-700 bg-white/5 backdrop-blur-md hover:border-indigo-500 transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">
                🚀 Project #{i + 1}
              </h2>

              <button
                onClick={() => removeProject(i)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">

              {/* Title */}
              <input
                placeholder="Project Title (E-commerce App, Chat App...)"
                value={project.title}
                onChange={(e) =>
                  updateProject(i, "title", e.target.value)
                }
                className="input"
              />

              {/* Tech Stack */}
              <input
                placeholder="Tech Stack (React, Node.js, MongoDB...)"
                value={project.techStack}
                onChange={(e) =>
                  updateProject(i, "techStack", e.target.value)
                }
                className="input"
              />

              {/* Description */}
              <textarea
                placeholder={`• Built scalable app using MERN stack
• Implemented authentication with JWT
• Improved performance by 40%
• Deployed on Vercel / Render`}
                value={project.description}
                onChange={(e) =>
                  updateProject(i, "description", e.target.value)
                }
                className="input min-h-[130px]"
              />

              {/* Links */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  placeholder="Live Demo URL"
                  value={project.live}
                  onChange={(e) =>
                    updateProject(i, "live", e.target.value)
                  }
                  className="input"
                />

                <input
                  placeholder="GitHub Repository URL"
                  value={project.github}
                  onChange={(e) =>
                    updateProject(i, "github", e.target.value)
                  }
                  className="input"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Button */}
        {projects.length > 0 && (
          <button
            onClick={addProject}
            className="w-full py-3 border border-dashed border-gray-600 rounded-xl hover:border-indigo-500 hover:text-indigo-400 transition"
          >
            + Add Another Project
          </button>
        )}
      </div>

      {/* Input Styles */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          outline: none;
          transition: 0.2s;
        }

        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.3);
        }
      `}</style>
    </div>
  );
};

export default ProjectInput;