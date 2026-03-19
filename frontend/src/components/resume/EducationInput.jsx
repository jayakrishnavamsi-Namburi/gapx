// // EducationInput.jsx
// import './ResumeForm.css'; // Import your existing CSS

// const EducationInput = ({ education, setEducation }) => {
//   const updateEducation = (index, field, value) => {
//     const newEducation = [...education];
//     newEducation[index] = { ...newEducation[index], [field]: value };
//     setEducation(newEducation);
//   };

//   const addEducation = () => {
//     setEducation([...education, { degree: "", institution: "", year: "" }]);
//   };

//   const removeEducation = (index) => {
//     setEducation(education.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="dynamic-inputs">
//       {education.length === 0 ? (
//         <div className="empty-state">
//           <p className="empty-message">No education entries added yet</p>
//           <button 
//             className="add-btn primary" 
//             type="button"
//             onClick={addEducation}
//           >
//             + Add Education
//           </button>
//         </div>
//       ) : (
//         <>
//           {education.map((edu, index) => (
//             <div key={`edu-${index}`} className="input-item education-item">
//               <div className="input-grid">
//                 <div className="input-group">
//                   <label className="input-label">Degree</label>
//                   <input
//                     value={edu.degree || ""}
//                     onChange={(e) => updateEducation(index, 'degree', e.target.value)}
//                     placeholder="B.Tech Computer Science"
//                     className="form-input"
//                   />
//                 </div>
//                 <div className="input-group">
//                   <label className="input-label">Institution</label>
//                   <input
//                     value={edu.institution || ""}
//                     onChange={(e) => updateEducation(index, 'institution', e.target.value)}
//                     placeholder="Anna University, Chennai"
//                     className="form-input"
//                   />
//                 </div>
//                 <div className="input-group">
//                   <label className="input-label">Year</label>
//                   <input
//                     value={edu.year || ""}
//                     onChange={(e) => updateEducation(index, 'year', e.target.value)}
//                     placeholder="2020 - 2024"
//                     className="form-input"
//                   />
//                 </div>
//               </div>
//               <div className="item-actions">
//                 <button 
//                   type="button" 
//                   className="remove-btn"
//                   onClick={() => removeEducation(index)}
//                 >
//                   × Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//           <button 
//             className="add-btn secondary" 
//             type="button"
//             onClick={addEducation}
//           >
//             + Add Another Education
//           </button>
//         </>
//       )}
//     </div>
//   );
// };

// export default EducationInput;



import React, { useState } from "react";

const EducationInput = ({ education, setEducation }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const updateEducation = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);

    setActiveIndex(index);
    setTimeout(() => setActiveIndex(null), 400);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { degree: "", institution: "", year: "" },
    ]);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 md:p-10 text-white">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Education
        </h1>
        <p className="text-gray-400 mt-2">
          Add your academic background
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto space-y-6">
        {education.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-gray-600 rounded-xl">
            <p className="text-gray-400 mb-4">
              No education added yet
            </p>
            <button
              onClick={addEducation}
              className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg font-medium transition"
            >
              + Add Education
            </button>
          </div>
        ) : (
          education.map((edu, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border border-gray-700 bg-white/5 backdrop-blur-md transition-all ${
                activeIndex === index
                  ? "ring-2 ring-indigo-500 scale-[1.01]"
                  : "hover:border-gray-500"
              }`}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">
                  Education #{index + 1}
                </h2>

                <button
                  onClick={() => removeEducation(index)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </div>

              {/* Inputs */}
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  placeholder="Degree"
                  className="input"
                />

                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  placeholder="Institution"
                  className="input"
                />

                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) =>
                    updateEducation(index, "year", e.target.value)
                  }
                  placeholder="Year"
                  className="input"
                />
              </div>
            </div>
          ))
        )}

        {/* Add Button */}
        {education.length > 0 && (
          <button
            onClick={addEducation}
            className="w-full py-3 border border-dashed border-gray-600 rounded-xl hover:border-indigo-500 hover:text-indigo-400 transition"
          >
            + Add Another Education
          </button>
        )}
      </div>

      {/* Reusable Input Style */}
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

export default EducationInput;