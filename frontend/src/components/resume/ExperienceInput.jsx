// import './ExperienceInput.css';  // Add this import

// const ExperienceInput = ({ experiences, setExperiences }) => {
//   const addExperience = () => {
//     setExperiences([
//       ...experiences,
//       { company: "", role: "", duration: "", description: "" },
//     ]);
//   };

//   const updateExperience = (index, field, value) => {
//     const updated = [...experiences];
//     updated[index][field] = value;
//     setExperiences(updated);
//   };

//   const removeExperience = (index) => {
//     setExperiences(experiences.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="experience-container">
//       {experiences.map((exp, i) => (
//         <div key={i} className="experience-card">
//           <div className="experience-header">
//             <h4 className="experience-title">Experience {i + 1}</h4>
//             <button 
//               className="remove-btn"
//               onClick={() => removeExperience(i)}
//               type="button"
//             >
//               × Remove
//             </button>
//           </div>

//           <div className="experience-form">
//             <div className="input-row">
//               <div className="input-group">
//                 <label className="input-label">Company Name</label>
//                 <input
//                   placeholder="e.g. Google, Microsoft, Amazon"
//                   value={exp.company}
//                   onChange={(e) => updateExperience(i, "company", e.target.value)}
//                   className="form-input"
//                 />
//               </div>

//               <div className="input-group">
//                 <label className="input-label">Job Role</label>
//                 <input
//                   placeholder="e.g. Software Engineer, Data Analyst"
//                   value={exp.role}
//                   onChange={(e) => updateExperience(i, "role", e.target.value)}
//                   className="form-input"
//                 />
//               </div>
//             </div>

//             <div className="input-row">
//               <div className="input-group full-width">
//                 <label className="input-label">Duration</label>
//                 <input
//                   placeholder="e.g. Jan 2023 - Present, 2022-2024"
//                   value={exp.duration}
//                   onChange={(e) => updateExperience(i, "duration", e.target.value)}
//                   className="form-input"
//                 />
//               </div>
//             </div>

//             <div className="input-group full-width">
//               <label className="input-label">Key Responsibilities</label>
//               <textarea
//                 placeholder="• Developed scalable web applications using React and Node.js
// • Led a team of 5 developers in agile sprints
// • Optimized database queries reducing load time by 40%
// • Implemented CI/CD pipelines for faster deployments"
//                 value={exp.description}
//                 onChange={(e) => updateExperience(i, "description", e.target.value)}
//                 className="form-textarea"
//                 rows="4"
//               />
//             </div>
//           </div>
//         </div>
//       ))}

//       <button className="add-experience-btn" onClick={addExperience} type="button">
//         + Add Another Experience
//       </button>
//     </div>
//   );
// };

// export default ExperienceInput;




const ExperienceInput = ({ experiences, setExperiences }) => {
  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company: "", role: "", duration: "", description: "" },
    ]);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const removeExperience = (index) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Experience</h1>
          <p className="text-gray-400 mt-2">
            Add your work experience
          </p>
        </div>

        {/* Empty State */}
        {experiences.length === 0 && (
          <div className="text-center py-20 border border-dashed border-gray-600 rounded-xl">
            <p className="text-gray-400 mb-4">
              No experience added yet
            </p>
            <button
              onClick={addExperience}
              className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg transition"
            >
              + Add Experience
            </button>
          </div>
        )}

        {/* Experience Cards */}
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="p-6 rounded-xl border border-gray-700 bg-white/5 backdrop-blur-md hover:border-gray-500 transition"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">
                Experience #{i + 1}
              </h2>

              <button
                onClick={() => removeExperience(i)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                Remove
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">

              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  placeholder="Company (Google, Amazon...)"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(i, "company", e.target.value)
                  }
                  className="input"
                />

                <input
                  placeholder="Role (Software Engineer...)"
                  value={exp.role}
                  onChange={(e) =>
                    updateExperience(i, "role", e.target.value)
                  }
                  className="input"
                />
              </div>

              {/* Row 2 */}
              <input
                placeholder="Duration (Jan 2023 - Present)"
                value={exp.duration}
                onChange={(e) =>
                  updateExperience(i, "duration", e.target.value)
                }
                className="input"
              />

              {/* Description */}
              <textarea
                placeholder={`• Built scalable apps
• Improved performance by 40%
• Worked with team`}
                value={exp.description}
                onChange={(e) =>
                  updateExperience(i, "description", e.target.value)
                }
                className="input min-h-[120px]"
              />
            </div>
          </div>
        ))}

        {/* Add Button */}
        {experiences.length > 0 && (
          <button
            onClick={addExperience}
            className="w-full py-3 border border-dashed border-gray-600 rounded-xl hover:border-indigo-500 hover:text-indigo-400 transition"
          >
            + Add Another Experience
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

export default ExperienceInput;