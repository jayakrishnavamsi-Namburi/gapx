// import ExperienceInput from "./ExperienceInput";
// import ProjectInput from "./ProjectInput";
// import EducationInput from "./EducationInput"; // You'll need to create this
// import './ResumeForm.css';

// const ResumeForm = ({
//   form,
//   handleFormChange,
//   handlePersonalChange,
//   experiences,
//   setExperiences,
//   projects,
//   setProjects,
//   education,
//   setEducation,
//   certifications,
//   setCertifications,
// }) => {
//   const handleChange = (e) =>
//     handleFormChange(e.target.name, e.target.value);

//   const handlePersonalChangeLocal = (e) =>
//     handlePersonalChange(e.target.name, e.target.value);

//   const addExperience = () => {
//     setExperiences([...experiences, { 
//       company: "", 
//       role: "", 
//       duration: "", 
//       description: "" 
//     }]);
//   };

//   const addProject = () => {
//     setProjects([...projects, { 
//       title: "", 
//       techStack: "", 
//       description: "", 
//       link: "" 
//     }]);
//   };

//   const addEducation = () => {
//     setEducation([...education, { 
//       degree: "", 
//       institution: "", 
//       year: "" 
//     }]);
//   };

//   return (
//     <div className="resume-form-container">
//       {/* FORM HEADER */}
//       <div className="form-header">
//         <h2 className="form-title">Complete Resume Information</h2>
//         <p className="form-subtitle">Fill all details for AI-powered ATS optimization</p>
//       </div>

//       {/* PERSONAL INFO SECTION */}
//       <div className="form-section">
//         <h3 className="section-title">👤 Personal Information</h3>
//         <div className="input-grid">
//           <div className="input-group">
//             <label className="input-label">Full Name *</label>
//             <input
//               name="name"
//               placeholder="Enter your full name"
//               value={form.personal.name || ""}
//               onChange={handlePersonalChangeLocal}
//               className="form-input"
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label className="input-label">Email *</label>
//             <input
//               name="email"
//               type="email"
//               placeholder="your.email@example.com"
//               value={form.personal.email || ""}
//               onChange={handlePersonalChangeLocal}
//               className="form-input"
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label className="input-label">Phone</label>
//             <input
//               name="phone"
//               type="tel"
//               placeholder="+91 98765 43210"
//               value={form.personal.phone || ""}
//               onChange={handlePersonalChangeLocal}
//               className="form-input"
//             />
//           </div>

//           <div className="input-group">
//             <label className="input-label">Location</label>
//             <input
//               name="location"
//               placeholder="Pudukkottai, Tamil Nadu, India"
//               value={form.personal.location || ""}
//               onChange={handlePersonalChangeLocal}
//               className="form-input"
//             />
//           </div>
//         </div>

//         {/* SOCIAL LINKS */}
//         <div className="input-grid social-links">
//           <div className="input-group">
//             <label className="input-label">
//               <i>💼</i> LinkedIn
//             </label>
//             <input
//               name="linkedin"
//               type="url"
//               placeholder="https://linkedin.com/in/yourprofile"
//               value={form.personal.linkedin || ""}
//               onChange={handlePersonalChangeLocal}
//               className="form-input"
//             />
//           </div>

//           <div className="input-group">
//             <label className="input-label">
//               <i>📂</i> GitHub
//             </label>
//             <input
//               name="github"
//               type="url"
//               placeholder="https://github.com/yourusername"
//               value={form.personal.github || ""}
//               onChange={handlePersonalChangeLocal}
//               className="form-input"
//             />
//           </div>

//           <div className="input-group">
//             <label className="input-label">
//               <i>🌐</i> Portfolio
//             </label>
//             <input
//               name="portfolio"
//               type="url"
//               placeholder="https://yourportfolio.com"
//               value={form.personal.portfolio || ""}
//               onChange={handlePersonalChangeLocal}
//               className="form-input"
//             />
//           </div>
//         </div>
//       </div>

//       {/* SUMMARY SECTION */}
//       <div className="form-section">
//         <h3 className="section-title">📝 Professional Summary</h3>
//         <div className="input-group full-width">
//           <label className="input-label">Career Summary (Optional)</label>
//           <textarea
//             name="summary"
//             placeholder="Write a 3-4 sentence summary of your experience, skills, and career goals..."
//             value={form.summary || ""}
//             onChange={handleChange}
//             className="form-textarea"
//             rows="4"
//           />
//           <p className="input-help">Keep it concise (50-100 words). We'll optimize keywords for ATS.</p>
//         </div>
//       </div>

//       {/* TARGET ROLE */}
//       <div className="form-section">
//         <h3 className="section-title">🎯 Target Role *</h3>
//         <div className="input-group full-width">
//           <label className="input-label">Job Title you're applying for</label>
//           <input
//             name="role"
//             placeholder="e.g. Full Stack Developer, Senior React Developer"
//             value={form.role || ""}
//             onChange={handleChange}
//             className="form-input"
//             required
//           />
//         </div>
//       </div>

//       {/* SKILLS SECTION */}
//       <div className="form-section">
//         <h3 className="section-title">🛠️ Technical Skills *</h3>
//         <div className="input-group full-width">
//           <label className="input-label">Skills (comma separated)</label>
//           <textarea
//             name="skills"
//             placeholder="React, Node.js, JavaScript, MongoDB, Express, AWS, Docker, Git, TailwindCSS..."
//             value={form.skills || ""}
//             onChange={handleChange}
//             className="form-textarea"
//             rows="3"
//             required
//           />
//           <p className="input-help">Separate skills with commas. ATS optimization will be applied.</p>
//         </div>
//       </div>

//       {/* EXPERIENCE SECTION */}
//       <div className="form-section">
//         <div className="section-header">
//           <h3 className="section-title">💼 Work Experience</h3>
//           <button className="add-btn" onClick={addExperience} type="button">
//             + Add Experience
//           </button>
//         </div>
//         <ExperienceInput
//           experiences={experiences}
//           setExperiences={setExperiences}
//         />
//       </div>

//       {/* PROJECTS SECTION */}
//       <div className="form-section">
//         <div className="section-header">
//           <h3 className="section-title">🚀 Projects</h3>
//           <button className="add-btn" onClick={addProject} type="button">
//             + Add Project
//           </button>
//         </div>
//         <ProjectInput projects={projects} setProjects={setProjects} />
//       </div>

//       {/* EDUCATION SECTION */}
//       <div className="form-section">
//         <div className="section-header">
//           <h3 className="section-title">🎓 Education</h3>
//           <button className="add-btn" onClick={addEducation} type="button">
//             + Add Education
//           </button>
//         </div>
//         <EducationInput 
//           education={education}
//           setEducation={setEducation}
//         />
//       </div>

//       {/* CERTIFICATIONS SECTION */}
//       <div className="form-section">
//         <h3 className="section-title">🏆 Certifications</h3>
//         <div className="input-group full-width">
//           <label className="input-label">Certifications (comma separated)</label>
//           <textarea
//             name="certifications"
//             placeholder="AWS Certified Developer, Google Data Analytics, React Certification..."
//             value={certifications || ""}
//             onChange={(e) => setCertifications(e.target.value)}
//             className="form-textarea"
//             rows="2"
//           />
//           <p className="input-help">Separate certifications with commas</p>
//         </div>
//       </div>

//       {/* FORM FOOTER */}
//       <div className="form-footer">
//         <div className="required-notice">
//           * Required fields for optimal resume generation
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResumeForm;



import ExperienceInput from "./ExperienceInput.jsx";
import ProjectInput from "./ProjectInput.jsx";
import EducationInput from "./EducationInput.jsx";

const ResumeForm = ({
  form,
  handleFormChange,
  handlePersonalChange,
  experiences,
  setExperiences,
  projects,
  setProjects,
  education,
  setEducation,
  certifications,
  setCertifications,
}) => {
  const handleChange = (e) =>
    handleFormChange(e.target.name, e.target.value);

  const handlePersonalChangeLocal = (e) =>
    handlePersonalChange(e.target.name, e.target.value);

  const addExperience = () => {
    setExperiences([
      ...experiences,
      { company: "", role: "", duration: "", description: "" },
    ]);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", techStack: "", description: "", live: "", github: "" },
    ]);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { degree: "", institution: "", year: "" },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#3c3a37] p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-[#2d4f4c]">Resume Builder</h1>
          <p className="text-[#7d6e5e] mt-2">
            Craft your story with a gentle touch.
          </p>
        </div>

        {/* PERSONAL INFO */}
        <Section title="👤 Personal Information">
          <div className="grid md:grid-cols-2 gap-4">
            <Input name="name" value={form.personal.name} onChange={handlePersonalChangeLocal} placeholder="Full Name *" />
            <Input name="email" value={form.personal.email} onChange={handlePersonalChangeLocal} placeholder="Email *" />
            <Input name="phone" value={form.personal.phone} onChange={handlePersonalChangeLocal} placeholder="Phone" />
            <Input name="location" value={form.personal.location} onChange={handlePersonalChangeLocal} placeholder="Location" />
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <Input name="linkedin" value={form.personal.linkedin} onChange={handlePersonalChangeLocal} placeholder="LinkedIn URL" />
            <Input name="github" value={form.personal.github} onChange={handlePersonalChangeLocal} placeholder="GitHub URL" />
            <Input name="portfolio" value={form.personal.portfolio} onChange={handlePersonalChangeLocal} placeholder="Portfolio URL" />
          </div>
        </Section>

        {/* SUMMARY */}
        <Section title="📝 Summary">
          <Textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Write a short professional summary..."
          />
        </Section>

        {/* ROLE */}
        <Section title="🎯 Target Role">
          <Input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Full Stack Developer"
          />
        </Section>

        {/* SKILLS */}
        <Section title="🛠 Skills">
          <Textarea
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB..."
          />
        </Section>

        {/* EXPERIENCE */}
        <Section
          title="💼 Experience"
          action={
            <button onClick={addExperience} className="btn">
              + Add
            </button>
          }
        >
          <ExperienceInput
            experiences={experiences}
            setExperiences={setExperiences}
          />
        </Section>

        {/* PROJECTS */}
        <Section
          title="🚀 Projects"
          action={
            <button onClick={addProject} className="btn">
              + Add
            </button>
          }
        >
          <ProjectInput projects={projects} setProjects={setProjects} />
        </Section>

        {/* EDUCATION */}
        <Section
          title="🎓 Education"
          action={
            <button onClick={addEducation} className="btn">
              + Add
            </button>
          }
        >
          <EducationInput
            education={education}
            setEducation={setEducation}
          />
        </Section>

        {/* CERTIFICATIONS */}
        <Section title="🏆 Certifications">
          <Textarea
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
            placeholder="AWS, Google Cloud..."
          />
        </Section>
      </div>

      {/* Reusable Components */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid #e2dcd5;
          color: #3c3a37;
          outline: none;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .input:focus {
          border-color: #b7aa9d;
          box-shadow: 0 4px 10px rgba(183, 170, 157, 0.15);
        }

        .input::placeholder {
          color: #b7aa9d;
          font-weight: 300;
        }

        .btn {
          background: #e7e1d9;
          color: #5f6b6a;
          padding: 8px 18px;
          border-radius: 40px;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid transparent;
          transition: all 0.2s ease;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .btn:hover {
          background: #dbd2c7;
          color: #2d4f4c;
          border-color: #c9bcae;
        }
      `}</style>
    </div>
  );
};

/* Reusable Components */

const Section = ({ title, children, action }) => (
  <div className="p-8 rounded-2xl bg-white border border-[#f0eae4] shadow-sm space-y-5">
    <div className="flex justify-between items-center border-b border-[#f0eae4] pb-3">
      <h2 className="font-medium text-xl text-[#2d4f4c]">{title}</h2>
      {action}
    </div>
    {children}
  </div>
);

const Input = ({ ...props }) => (
  <input {...props} className="input" />
);

const Textarea = ({ ...props }) => (
  <textarea {...props} className="input min-h-[100px]" />
);

export default ResumeForm;